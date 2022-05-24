import { expect } from "chai";
import { StubbedInstance, stubInterface } from "ts-sinon";
import { ProductServiceRepository } from "../../infrastructure";
import { ProductDatasource } from "../../infrastructure/interfaces";
import { DeleteProductUseCase, deleteProductUseCase } from "./delete-product.use-case";


describe("UNIT | DELETE PRODUCT", function () {
  let datasource: StubbedInstance<ProductDatasource>;
  const reference = "43490";
  let useCase: DeleteProductUseCase;
  before(function () {
    datasource = stubInterface<ProductDatasource>();
  });

  describe("#deleteProduct", function () {
    beforeEach(function () {
      useCase = injectUseCase(datasource);
    });

    describe("A l'appel", function () {
      it(`doit supprimer l'offre si elle existe`, async function () {
        datasource.deleteProduct.resolves();

        await useCase(reference);

        expect(datasource.deleteProduct.firstCall.args).to.deep.equal([
          reference,
        ]);
      });
    });
  });
});
const injectUseCase = (datasource: ProductDatasource): DeleteProductUseCase => {
  const repo = new ProductServiceRepository(datasource);
  return deleteProductUseCase(repo);
};
