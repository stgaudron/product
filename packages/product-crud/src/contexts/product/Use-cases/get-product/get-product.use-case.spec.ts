import { expect } from "chai";
import { reset, restore } from "sinon";
import { StubbedInstance, stubInterface } from "ts-sinon"
import { ProductData } from "../../../utils";
import { ProductServiceRepository } from "../../infrastructure";
import { ProductDatasource } from "../../infrastructure/interfaces";
import { GetProductUseCase, getProductUseCase } from "./get-product.use-case";


describe("UNIT | GET PRODUCT", function () {
    let datasource: StubbedInstance<ProductDatasource>

  before(function () {
    datasource = stubInterface<ProductDatasource>();
  });

  afterEach(function () {
    reset();
  });

  after(function () {
    restore();
  });

  describe("#getProduct", function () {
      let useCase: GetProductUseCase;
      const reference = 'reference'

      beforeEach(function () {
          useCase = injectUseCase(datasource)
      })
      describe(`quand le produit n'existe pas`, function () {
          it("ne doit rien retourner", async function () {
              datasource.getProduct.resolves(null)

              const result = await useCase(reference)

              expect(result).to.deep.equal(null)
          })
      })
      describe(`quand le produit existe`, function () {
        it("doit retouner ce produit", async function () {
            const data = ProductData.generateProductData({ 
                weight : "100" ,
                dimensions: { height: "50", width: "40", length: "300"}
            })
            datasource.getProduct.resolves(data.getProduct())

            const result = await useCase(reference)

            expect(result).to.deep.equal(data.getPayload())
        })
    })
  })

})

const injectUseCase = (datasource: StubbedInstance<ProductDatasource>) => {
    const repo = new ProductServiceRepository(datasource)
    return getProductUseCase(repo)
}