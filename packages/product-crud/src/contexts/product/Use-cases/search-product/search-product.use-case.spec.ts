import { expect } from "chai";
import { reset, restore } from "sinon";
import { StubbedInstance, stubInterface } from "ts-sinon";
import { SearchProductUseCase, SearchParams, searchProductUseCase } from ".";
import { Kinds } from "../../../product";
import { ProductData } from "../../../utils";
import { ProductServiceRepository } from "../../infrastructure";
import { ProductDatasource } from "../../infrastructure/interfaces";

describe("UNIT | SEARCH PRODUCT", function () {
  let datasource: StubbedInstance<ProductDatasource>;

  beforeEach(function () {
    datasource = stubInterface<ProductDatasource>();
  });

  afterEach(function () {
    reset();
  });

  after(function () {
    restore();
  });

  describe("#searchProduct", function () {
    let useCase: SearchProductUseCase;
    const searchParams: SearchParams = {
      sellerId: "amazon",
      priceRange: { minPrice: 5, maxPrice: 500 },
      minimalStock: 1,
      kinds: [Kinds.starwars, Kinds.marvel],
    };
    beforeEach(function () {
      useCase = injectUseCase(datasource);
    });
    describe("quand aucun produit ne correspond aux critères de recherche", function () {
      it("doit retourner un tableau vide", async function () {
        datasource.searchProduct.resolves([]);

        const result = await useCase(searchParams);

        expect(result).to.deep.equal([]);
      });
    });
    describe("quand des produits correspondent aux critères de recherche", function () {
      it("doit retourner un tableau de produits", async function () {
        const data = ProductData.generateProductData({});

        datasource.searchProduct.resolves([data.getProduct()]);

        const result = await useCase(searchParams);

        expect(result).to.deep.equal([data.getPayload()]);
      });
    });
    describe("avec un seul critère de recherche, si des produits correspondent", function () {
      describe("avec un id vendeur", function () {
        it("appelle la datasource avec les bon paramètres", async function () {
          const data = ProductData.generateProductData({});
          datasource.searchProduct.resolves([data.getProduct()]);
          const uniqueSearchParam = { sellerId: "amazon" };

          await useCase(uniqueSearchParam);

          expect(datasource.searchProduct.firstCall.args).to.deep.equal([
            {
              sellerId: uniqueSearchParam.sellerId,
            },
          ]);
        });
      });
    });
  });
});

const injectUseCase = (datasource: StubbedInstance<ProductDatasource>) => {
  const repo = new ProductServiceRepository(datasource);
  return searchProductUseCase(repo);
};
