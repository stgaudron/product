import { ProductDatabaseApi } from "../../../infrastructure/database/datasources/tests/product-database.api";
import { database } from "../../../test/integration.hooks";
import { Kinds } from "../../product";
import { ProductRaw } from "../infrastructure/types/database.types";
import request from "supertest";
import { generateRawProduct } from "../../../infrastructure/database/datasources/tests/factory/generate-raw-product";
import { createEntityFromProductRaw } from "../infrastructure/mappers";
import { ProductEntity } from "../domain";

describe("INTEGRATION | PRODUCT API", function () {
  const productDatabaseApi = new ProductDatabaseApi(database);

  describe("CREATE", function () {
    //en REST une ressource est au pluriel ==> /v1/products :)
    describe("/v1/products", function () {
      let path: string;
      let product: ProductEntity
      let productRaw: ProductRaw

      before(function () {
        productRaw = generateRawProduct()
        path = `/v1/product`;
        product = {
          reference: "48374",
          name: "Tie Fighter",
          sellerId: "amazon",
          price: "80",
          kind: Kinds.starwars,
          stock: "5",
        }
      });
      describe("si la référence produit n'existe pas", function () {
        it("renvoie une 201 et le produit est retourné", async function () {
          
          await request(this.server.hapiServer.listener)
            .post(path)
            .send(product)
            .expect(201, product);
        });
      });
      describe("si la référence produit existe", function () {
        it("renvoie une 400", async function () {
          await productDatabaseApi.createProduct(productRaw)

          await request(this.server.hapiServer.listener)
            .post(path)
            .send(product)
            .expect(400);
        });
      });
    });
  });
});
