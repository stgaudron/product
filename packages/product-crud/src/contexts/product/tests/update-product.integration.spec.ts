import { ProductDatabaseApi } from "../../../infrastructure/database/datasources/tests/product-database.api";
import { database } from "../../../test/integration.hooks";
import { Kinds } from "../../product";
import { ProductRaw } from "../infrastructure/types/database.types";
import request from "supertest";
import { generateRawProduct } from "../../../infrastructure/database/datasources/tests/factory/generate-raw-product";

describe("INTEGRATION | UPDATE PRODUCT API", function () {
  const productDatabaseApi = new ProductDatabaseApi(database);

  describe("PUT", function () {
          
          const productRaw = generateRawProduct();
          const product = {
            reference: "48374",
            name: "Tie Fighter",
            sellerId: "amazon",
            price: "80",
            kind: Kinds.starwars,
            stock: "5",
          }
          const reference = product.reference;
      describe("/v1/product/reference", function () {
          const path = `/v1/product/${reference}`
        describe("si la référence produit existe", function () {
          it("renvoie une 201 et le produit est retourné", async function () {
            await productDatabaseApi.createProduct(productRaw)
            product.name = "LAND SPEEDER"
            await request(this.server.hapiServer.listener)
              .put(path)
              .send(product)
              .expect(201, product);
          });
        });
        describe("si la référence produit n'existe pas existe", function () {
          it("renvoie une 400", async function () {

            await request(this.server.hapiServer.listener)
              .put(path)
              .send(product)
              .expect(400);
          });
        });
      });
    });
  });
