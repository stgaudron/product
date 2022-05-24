import { expect } from "chai";
import { StubbedInstance, stubInterface } from "ts-sinon";
import { Dimension } from "../../../product";
import { ProductData } from "../../../utils";
import { ProductNotFoundDomainException, ProductDomainException } from "../../domain/exceptions";
import { ProductServiceRepository } from "../../infrastructure";
import { ProductDatasource } from "../../infrastructure/interfaces";
import { UpdateProductUseCase, updateProductUseCase } from "./update-product.use-case";


describe("UNIT | UPDATE PRODUCT", function () {
  let datasource: StubbedInstance<ProductDatasource>;

  before(function () {
    datasource = stubInterface<ProductDatasource>();
  });

  describe("#updateProduct", function () {
    let data: ProductData;
    let useCase: UpdateProductUseCase;
    describe("Etant donné un payload valide", function () {
      beforeEach(function () {
        data = ProductData.generateProductData();

        datasource.updateProduct.resolves(data.getProduct());

        useCase = injectUseCase(datasource);
      });
      describe("si un produit avec cette référence existe", function () {
        beforeEach(function () {
          datasource.getProduct.resolves(data.getProduct());
        });
        it("modifie le produit", async function () {
          const payload = data.getPayload();

          await useCase(payload.reference, payload);

          expect(datasource.updateProduct.firstCall.args).to.deep.equal([
            payload.reference,
            data.getProduct(),
          ]);
        });
        it("retourne le produit modifié", async function () {
          const payload = data.getPayload();

          const updatedProduct = await useCase(payload.reference, payload);

          expect(updatedProduct).to.deep.equal(data.getEntity());
        });
      });
      describe("si un produit avec cette référence n'existe pas", function () {
        it("retourne une erreur produit introuvable", async function () {
          const payload = data.getPayload();
          datasource.getProduct.resolves(null);

          const updatedProduct = await useCase(payload.reference, payload);

          expect(updatedProduct).to.deep.equal(
            new ProductNotFoundDomainException()
          );
        });
      });
    });
    describe("Etant donné un payload invalide", function () {
      beforeEach(function () {
        useCase = injectUseCase(datasource);
      });
      describe("Avec une clé obligatoire manquante", function () {
        it("retourne une erreur", async function () {
          data = ProductData.generateProductData({ reference: undefined });
          const result = await useCase(
            data.getPayload().reference,
            data.getPayload()
          );

          expect(result).to.deep.equal(
            new ProductDomainException("reference: mandatory")
          );
        });
      });
      describe("Avec une clé optionnelle vide", function () {
        it("retourne une erreur", async function () {
          data = ProductData.generateProductData({
            dimensions: {} as Dimension,
          });

          const result = await useCase(
            data.getPayload().reference,
            data.getPayload()
          );

          expect(result).to.deep.equal(
            new ProductDomainException("dimensions: invalid")
          );
        });
      });
    });
  });
});
const injectUseCase = (datasource: ProductDatasource): UpdateProductUseCase => {
  const repo = new ProductServiceRepository(datasource);
  return updateProductUseCase(repo);
};
