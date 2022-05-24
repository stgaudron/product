export enum Envs {
  production = "production",
  development = "development",
  test = "test",
}

function getDatabaseUrl(
  databaseURL?: string,
  databaseURLWithSchema?: string,
  poolSize?: string
): string {
  if (databaseURLWithSchema) return databaseURLWithSchema;
  if (!databaseURL) throw new Error("Database url is mandatory");
  if (poolSize) return `${databaseURL}?connection_limit=${poolSize}`;
  return databaseURL;
}

export class Config {
  public readonly env: Envs = Envs.development;

  public readonly datasource: {
    url: string;
  };

  public readonly api: {
      title: string
      version: string
      description: string
      termsOfService: string
      contact: {
          name: string
          email: string
          url: string
      }
      license: {
          name: string
          email: string
          url: string
      }
      server: {
          host: string
          port: number
      }
  }

  constructor(environmentVariables = process.env) {
    switch (environmentVariables.NODE_ENV) {
      case "test":
        this.env = Envs.test;
        break;
      case "production":
        this.env = Envs.production;
        break;
    }
    this.datasource = {
      url: getDatabaseUrl(
        environmentVariables.DATABASE_URL,
        environmentVariables.DATABASE_URL_WITH_SCHEMA,
        environmentVariables.DATABASE_POOL_SIZE
      ),
    }
    this.api = {
        title: String(environmentVariables.API_TITLE),
        version: String(environmentVariables.API_VERSION),
        description: String(environmentVariables.API_DESCRIPTION),
        termsOfService: String(environmentVariables.API_TERMS_OF_SERVICE),
        contact: {
          name: String(environmentVariables.API_CONTACT_NAME),
          email: String(environmentVariables.API_CONTACT_EMAIL),
          url: String(environmentVariables.API_CONTACT_URL)
        },
        license: {
          name: String(environmentVariables.API_LICENSE_NAME),
          email: String(environmentVariables.API_LICENSE_EMAIL),
          url: String(environmentVariables.API_LICENSE_URL)
        },
        server: {
          host: String(environmentVariables.API_SERVER_HOST || '0.0.0.0'),
          port: parseInt(String(environmentVariables.API_SERVER_PORT || '8080'))
        }
      }
  }
}
