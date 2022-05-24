import { execSync } from "child_process";
import { Config } from "../config";
import RelationalDatabase from "../infrastructure/database/database";
import { Server } from "../server";

export const testConfig: Config = new Config({
  ...process.env,
  DATABASE_URL_WITH_SCHEMA: process.env.DATABASE_SCHEMANAME
    ? `${process.env.DATABASE_URL}?schema=${process.env.DATABASE_SCHEMANAME}`
    : process.env.DATABASE_URL,
});

const schemaName = process.env.DATABASE_SCHEMANAME || "public";
export const database = new RelationalDatabase(testConfig);

export function mochaGlobalSetup() {
  execSync(
    `DATABASE_URL=${testConfig.datasource.url} npm run db:migrate:test &> /dev/null`
  );
}

export const mochaHooks = {
  async beforeEach() {
    //@ts-ignore
    this.server = new Server(testConfig)
    //@ts-ignore
    await this.server.init(database)
  },
  async afterEach() {
    await resetData();
  },
};

async function resetData() {
  try {
    const promises = [];
    for (const { tablename } of await database.client.$queryRaw<
      {
        tablename: string;
      }[]
      
    >`SELECT tablename FROM pg_tables WHERE schemaname=${schemaName};`) {
        promises.push(
        database.client.$executeRawUnsafe(
          `TRUNCATE TABLE ${schemaName}.${tablename} CASCADE;`
        )
      );
    }

    await Promise.all(promises);
  } catch (e) {
    console.log(e);
    throw new Error("After hook failed");
  }
}
