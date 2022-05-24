import { expect } from "chai";
import request from "supertest";
import { generateRawProduct } from "../../../infrastructure/database/datasources/tests/factory/generate-raw-product";
import { ProductDatabaseApi } from "../../../infrastructure/database/datasources/tests/product-database.api";
import { database } from "../../../test/integration.hooks";

describe("#INTEGRATION | GET PRODUCT API", function () {
  const productDatabaseApi = new ProductDatabaseApi(database);

  describe("GET", function () {
    const product = generateRawProduct();
    const reference = product.reference;

    describe("/v1/product/reference", function () {
      const path = `/v1/product/${reference}`;
      describe(`si la référence existe en base`, function () {
        it("renvoie une 200 et le produit est retourné", async function () {
          await productDatabaseApi.createProduct(product);

          const result = (
            await request(this.server.hapiServer.listener).get(path).expect(200)
          ).body;

          expect(result.reference).to.equal(product.reference);
        });
      });
      describe(`si la référence n'existe en base`, function () {
        it("retourne une 404", async function () {
          await request(this.server.hapiServer.listener).get(path).expect(404);
        });
      });
    });
  });
});
