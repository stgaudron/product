import { expect } from "chai";
import request from "supertest";
import { generateRawProduct } from "../../../infrastructure/database/datasources/tests/factory/generate-raw-product";
import { ProductDatabaseApi } from "../../../infrastructure/database/datasources/tests/product-database.api";
import { database } from "../../../test/integration.hooks";

describe("#INTEGRATION | DELETE PRODUCT API", function () {
    const productDatabaseApi = new ProductDatabaseApi(database);

    describe("#DELETE, function", function () {
        const product = generateRawProduct()
        const reference = product.reference

        describe("v1/product/reference", function () {
            const path = `/v1/product/${reference}`
            describe("si la référence existe en base", function () {
                it("renvoie une 200", async function () {
                    await productDatabaseApi.createProduct(product)

                    await request(this.server.hapiServer.listener)
                    .delete(path)
                    .expect(204)
                })
                it("le produit est effacé", async function() {
                    await productDatabaseApi.createProduct(product)

                    await request(this.server.hapiServer.listener).delete(path)
                    
                    const result = await productDatabaseApi.findDeletedProduct(product.reference)

                    expect(result[0].reference).to.deep.equal(product.reference)
                })
            })
        })
    })
})