import { expect } from "chai";
import { reset, restore } from "sinon";
import { StubbedInstance, stubInterface } from "ts-sinon";
import { ProductData } from "../../../utils";
import { ProductDomainException } from "../../domain/exceptions";
import { ProductDatasource } from "../../infrastructure/interfaces";
import { ProductServiceRepository } from "../../infrastructure";
import { Dimension } from "../../..";
import {
  createProductUseCase,
  CreateProductUseCase,
} from "./create-product.use-case";

describe("UNIT | CREATE PRODUCT", function () {
  let datasource: StubbedInstance<ProductDatasource>;

  before(function () {
    datasource = stubInterface<ProductDatasource>();
  });

  afterEach(function () {
    reset();
  });

  after(function () {
    restore();
  });

  describe("#createProduct", function () {
    let data: ProductData;
    let useCase: CreateProductUseCase;
    describe("Etant donné un payload valide", function () {
      beforeEach(function () {
        data = ProductData.generateProductData();

        datasource.createProduct.resolves(data.getProduct());

        useCase = injectUseCase(datasource);
      });
      describe("si aucun produit avec cette référence n'existe", function () {
        beforeEach(function () {
          datasource.getProduct.resolves(null);
        });
        it("sauvegarde un produit", async function () {
          const payload = data.getPayload();

          await useCase(payload);

          expect(datasource.createProduct.firstCall.args).to.deep.equal([
            data.getProduct(),
          ]);
        });
        it("retourne une entité valide", async function () {
          const payload = data.getPayload();

          const createdProduct = await useCase(payload);

          expect(createdProduct).to.deep.equal(data.getEntity());
        });
      });
      describe("si un produit avec cette référence existe", function () {
        it("retourne une erreur produit déjà existant", async function () {
          const payload = data.getPayload();
          datasource.getProduct.resolves(data.getProduct());

          const result = await useCase(payload);

          expect(result).to.deep.equal(
            new ProductDomainException("Product already exists")
          );
        });
      });
    });
    describe("Etant donné un payload invalide", function () {
      describe("Avec une clé obligatoire manquante", function () {
        it("retourne une erreur", async function () {
          data = ProductData.generateProductData({ reference: undefined });

          const result = await useCase(data.getPayload());

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

          const result = await useCase(data.getPayload());

          expect(result).to.deep.equal(
            new ProductDomainException("dimensions: invalid")
          );
        });
      });
    });
  });

  const injectUseCase = (
    datasource: ProductDatasource
  ): CreateProductUseCase => {
    const repo = new ProductServiceRepository(datasource);
    return createProductUseCase(repo);
  };
});
