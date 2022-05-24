import { expect } from "chai";
import request from "supertest";
import { Kinds } from "../..";
import { ProductDatabaseApi } from "../../../infrastructure/database/datasources/tests";
import { generateRawProduct } from "../../../infrastructure/database/datasources/tests/factory";
import { database } from "../../../test";
import { SearchProductQueryParameters } from "../infrastructure/types/requests/search-product.request";

describe("#INTEGRATION | SEARCH PRODUCT API", function () {
  const productDatabaseApi = new ProductDatabaseApi(database);

  describe("GET", function () {
    const productRaw = generateRawProduct();

    describe("/v1/products", function () {
      const searchParams: SearchProductQueryParameters = {
        sellerId: "amazon",
        minPrice: "5",
        maxPrice: "500",
        minimalStock: "1",
        kinds: [Kinds.starwars, Kinds.marvel].join(","),
      };
      const path = "/v1/products";
      const product1 = generateRawProduct({});
      const product2 = generateRawProduct({ reference: "48100" });
      const product3 = generateRawProduct({ reference: "48200", price: 800 });

      describe("si des produits correspondent aux critères de recherche", function () {
        it("renvoie une 200", async function () {
          const products = await productDatabaseApi.createProducts([
            product1,
            product2,
            product3,
          ]);
       
          await request(this.server.hapiServer.listener)
            .get(path)
            .query(searchParams)
            .expect(200)
            
        });
        it("retourne les produits", async function () {
          const products = await productDatabaseApi.createProducts([
            product1,
            product2,
            product3,
          ]);

          const result = (
            await request(this.server.hapiServer.listener)
              .get(path)
              .query(searchParams)
              .expect(200)
          ).body;
          
          expect(result.length).to.deep.equal(2);
        });
      });
      describe("avec un seul critère de recherche, si des produits correspondent", function () {
        it("renvoie une 200 et retourne les produits", async function () {
          const products = await productDatabaseApi.createProducts([
            product1,
            product2,
            product3
          ])
          const uniqueSearchParam: SearchProductQueryParameters = { sellerId: "amazon" }

          const result = (
            await request(this.server.hapiServer.listener)
            .get(path)
            .query(uniqueSearchParam)
            .expect(200)
          ).body

          expect(result.length).to.deep.equal(3)
        })
      })
    });
  });
});
