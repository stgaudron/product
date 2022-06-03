import { expect } from "chai";
import { Kinds } from "../../../../contexts";
import { ProductDatasource } from "../../../../contexts/product/infrastructure/interfaces/product.datasource";
import { SearchParams } from "../../../../contexts/product/Use-cases/search-product";
import { database } from "../../../../test/integration.hooks";
import { PrismaProductDatasource } from "../prisma-product.datasource";
import { generateRawProduct } from "./factory/generate-raw-product";
import { convertPrismaProductToProductRaw } from "./factory";
import { ProductDatabaseApi } from "./product-database.api";

describe("INTEGRATION | PRODUCT DATASOURCE", function () {
  const productDatasource: ProductDatasource = new PrismaProductDatasource(
    database
  );
  const productDatabaseApi = new ProductDatabaseApi(database);

  describe("#createProduct", function () {
    describe("A la création d un produit", function () {
      it("Le produit est créé en base", async function () {
        const product = generateRawProduct();

        await productDatasource.createProduct(product);

        expect(
          convertPrismaProductToProductRaw(
            await database.client.product.findUnique({
              where: {
                reference: product.reference,
              },
            })
          )
        ).to.deep.equal(product);
      });

      it("Le produit est retourné", async function () {
        const product = generateRawProduct();

        const createdProduct = await productDatasource.createProduct(product);

        expect(createdProduct).to.deep.equal(product);
      });
    });
    describe("A la création d un produit avec toutes les clés", function () {
      it("Le produit est créé en base", async function () {
        const product = generateRawProduct({
          weight: "5",
          height: "100",
          width: "300",
          length: "100",
        });

        await productDatasource.createProduct(product);

        expect(
          convertPrismaProductToProductRaw(
            await database.client.product.findUnique({
              where: {
                reference: product.reference,
              },
            })
          )
        ).to.deep.equal(product);
      });
      it("Le produit est retourné", async function () {
        const product = generateRawProduct({
          weight: "5",
          height: "100",
          width: "300",
          length: "100",
        });

        const createdProduct = await productDatasource.createProduct(product);

        expect(createdProduct).to.deep.equal(product);
      });
    });
  });
  describe("#getProduct", function () {
    const reference = "reference";
    describe("Quand la base ne trouve aucune correspondence", function () {
      it("retourne null", async function () {
        const productRaw = await productDatasource.getProduct(reference);

        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        expect(productRaw).to.be.null;
      });
    });
    describe("Quand la base contient la référence du produit", function () {
      it("retourne le produit", async function () {
        const product = generateRawProduct({
          reference,
        });

        await productDatabaseApi.createProduct(product);

        const productRaw = await productDatasource.getProduct(reference);

        expect(productRaw?.reference).to.equal(reference);
      });
      it("ne retourne pas le produit s'il est soft delete", async function () {
        const product = generateRawProduct({ reference, isDeleted: true });

        await productDatabaseApi.createProduct(product);

        const productRaw = await productDatasource.getProduct(reference);

        expect(productRaw).to.deep.equal(null);
      });
    });
  });
  describe("#updateProduct", function () {
    describe("A la modification d un produit", function () {
      it("Le produit est modifié en base", async function () {
        const product = generateRawProduct({ name: "BOUZIN DE L'ESPACE" });
        await productDatasource.createProduct(product);
        
        //plutot que de la réaffectation, génère un nouveau produit ==> const productToUpdate = {...product, name: "MILLENIUM FALCON"}
        const productToUpdate = generateRawProduct({ name: "MILLENIUM FALCON"});

        await productDatasource.updateProduct(product.reference, productToUpdate);

        expect(
          convertPrismaProductToProductRaw(
            await database.client.product.findUnique({
              where: {
                reference: productToUpdate.reference,
              },
            })
          )
        ).to.deep.equal(productToUpdate);
      });

      it("Le produit est retourné", async function () {
        const product = generateRawProduct();
        await productDatasource.createProduct(product);
        //idem
        product.name = "X WING";

        const updatedProduct = await productDatasource.updateProduct(
          product.reference,
          product
        );

        expect(updatedProduct).to.deep.equal(product);
      });
    });
    describe("A la modification d un produit avec toutes les clés", function () {
      it("Le produit est modifié en base", async function () {
        const product = generateRawProduct({
          weight: "5",
          height: "100",
          width: "300",
          length: "100",
        });

        await productDatasource.createProduct(product);
        //idem
        product.name = "B WING";

        await productDatasource.updateProduct(product.reference, product);

        expect(
          convertPrismaProductToProductRaw(
            await database.client.product.findUnique({
              where: {
                reference: product.reference,
              },
            })
          )
        ).to.deep.equal(product);
      });
      it("Le produit est retourné", async function () {
        const product = generateRawProduct({
          weight: "5",
          height: "100",
          width: "300",
          length: "100",
        });

        await productDatasource.createProduct(product);

        const updatedProduct = await productDatasource.updateProduct(
          product.reference,
          product
        );

        expect(updatedProduct).to.deep.equal(product);
      });
    });
  });
  describe("#deleteProduct", function () {
    describe("A la suppression d un produit", function () {
      it("Le produit est supprimé", async function () {
        const product = generateRawProduct();
        await productDatasource.createProduct(product);

        await productDatasource.deleteProduct(product.reference);

        const deletedProduct = await database.client.product.findUnique({
          where: {
            reference: product.reference,
          },
        });

        expect(deletedProduct?.isDeleted).to.deep.equal(true);
      });
    });
  });
  describe("#searchProduct", function () {
    const reference = "reference";
    const searchParams: SearchParams = {
      sellerId: "amazon",
      priceRange: { minPrice: 5, maxPrice: 500 },
      minimalStock: 1,
      kinds: [Kinds.starwars, Kinds.marvel],
    };
    describe("Quand la base ne trouve aucune correspondence", function () {
      it("retourne null", async function () {
        const productRaw = await productDatasource.searchProduct(searchParams);

        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        expect(productRaw).to.deep.equal([]);
      });
    });
    describe("Quand la base contient des produits correspondant aux critères de recherche", function () {
      it("retourne les produits", async function () {
        const product1 = generateRawProduct({});
        const product2 = generateRawProduct({ reference: "48100" });
        const product3 = generateRawProduct({ reference: "48200", price: 800 });

        await productDatabaseApi.createProducts([product1, product2, product3]);
        const result = await productDatasource.searchProduct(searchParams);

        expect(result.length).to.equal(2);
      });
      it("ne retourne pas le produit s'il est soft delete", async function () {
        const product = generateRawProduct({ reference, isDeleted: true });

        await productDatabaseApi.createProduct(product);

        const productRaw = await productDatasource.getProduct(reference);

        expect(productRaw).to.deep.equal(null);
      });
      describe("Avec des paramètres de recherche partiels", function () {
        const product1 = generateRawProduct({});
        const product2 = generateRawProduct({
          reference: "3204",
          name: "AVENGER HQ",
          sellerId: "fnac.com",
          price: 100,
          kind: Kinds.marvel,
          stock: 10,
        });

        it("retourne des produits avec un paramètre unique de recherche sur le vendeur", async function () {
          const uniqueSearchParam = { sellerId: "amazon" };
          await productDatabaseApi.createProducts([product1, product2]);

          const result = await productDatasource.searchProduct(
            uniqueSearchParam
          );

          expect(result.length).to.deep.equal(1);
        });
        it("retourne des produits avec un paramètre unique de recherche sur le prix minimum", async function () {
          const uniqueSearchParam = { priceRange: { minPrice: 90 } };
          await productDatabaseApi.createProducts([product1, product2]);

          const result = await productDatasource.searchProduct(
            uniqueSearchParam
          );

          expect(result.length).to.deep.equal(1);
        });
        it("retourne des produits avec un paramètre unique de recherche sur le prix maximum", async function () {
          const uniqueSearchParam = { priceRange: { maxPrice: 85 } };
          await productDatabaseApi.createProducts([product1, product2]);

          const result = await productDatasource.searchProduct(
            uniqueSearchParam
          );

          expect(result.length).to.deep.equal(1);
        });
        it("retourne des produits avec un paramètre unique de recherche sur le stock minimum", async function () {
          const uniqueSearchParam = { minimalStock: 8 };
          await productDatabaseApi.createProducts([product1, product2]);

          const result = await productDatasource.searchProduct(
            uniqueSearchParam
          );

          expect(result.length).to.deep.equal(1);
        });
        it("retourne des produits avec un paramètre unique de recherche sur le stock minimum", async function () {
          const uniqueSearchParam = { kinds: [Kinds.starwars] };
          await productDatabaseApi.createProducts([product1, product2]);

          const result = await productDatasource.searchProduct(
            uniqueSearchParam
          );

          expect(result.length).to.deep.equal(1);
        });
      });
    });
  });
});
