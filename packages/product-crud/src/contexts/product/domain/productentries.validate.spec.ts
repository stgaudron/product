import { expect } from "chai";
import { Dimension, Kinds } from "../../product";
import { ProductData } from "../../utils";
import { validateProductEntries } from "./productentries.validate";

describe("UNIT | CREATE PRODUCT | validate entries", function () {
  describe("#validateProductEntries", function () {
    let data: ProductData;
    describe("Avec un payload valide", function () {
      describe("Avec les clés obligatoires", function () {
        it("retourne un objet vide", async function () {
          data = ProductData.generateProductData();

          const result = validateProductEntries(data.getPayload());

          expect(result).to.deep.equal({});
        });
      });
      describe("Avec toutes les clés", function () {
        it("retourne un objet vide", async function () {
          data = ProductData.generateProductData({
            weight: "200",
            dimensions: { height: "200", width: "100", length: "300" },
          });

          const result = validateProductEntries(data.getPayload());

          expect(result).to.deep.equal({});
        });
      });
    });
    describe("Avec un payload invalide", function () {
      describe("Avec une référence non définie", function () {
        it("retourne une erreur reference obligatoire", async function () {
          data = ProductData.generateProductData({ reference: undefined });

          const result = validateProductEntries(data.getPayload());

          expect(result).to.deep.equal({ reference: "mandatory" });
        });
      });
      describe("Avec une référence non valide", function () {
        it('une "," retourne une erreur, référence invalide', async function () {
          data = ProductData.generateProductData({ reference: ",virgule" });

          const result = validateProductEntries(data.getPayload());

          expect(result).to.deep.equal({ reference: "invalid" });
        });
        it('un ";" retourne une erreur, référence invalide', async function () {
          data = ProductData.generateProductData({
            reference: ";pointvirgule",
          });

          const result = validateProductEntries(data.getPayload());

          expect(result).to.deep.equal({ reference: "invalid" });
        });
      });
      describe("Avec un nom non défini", function () {
        it("retourne une erreur, nom obligatoire", async function () {
          data = ProductData.generateProductData({ name: undefined });

          const result = validateProductEntries(data.getPayload());

          expect(result).to.deep.equal({ name: "mandatory" });
        });
      });
      describe("Avec un identifiant vendeur non défini", function () {
        it("retourne une erreur, identifiant vendeur obligatoire", async function () {
          data = ProductData.generateProductData({ sellerId: undefined });

          const result = validateProductEntries(data.getPayload());

          expect(result).to.deep.equal({ sellerId: "mandatory" });
        });
      });
      describe("Avec un prix non défini", function () {
        it("retourne une erreur, identifiant vendeur obligatoire", async function () {
          data = ProductData.generateProductData({ price: undefined });

          const result = validateProductEntries(data.getPayload());

          expect(result).to.deep.equal({ price: "mandatory" });
        });
      });
      describe("Avec un prix comportant autre chose que des nombres", function () {
        it("retourne une erreur, prix invalide", async function () {
          data = ProductData.generateProductData({ price: "prix50" });

          const result = validateProductEntries(data.getPayload());

          expect(result).to.deep.equal({ price: "invalid" });
        });
      });
      describe("Avec un genre non défini", function () {
        it("retourne une erreur, genre obligatoire", async function () {
          data = ProductData.generateProductData({ kind: undefined });

          const result = validateProductEntries(data.getPayload());

          expect(result).to.deep.equal({ kind: "mandatory" });
        });
      });
      describe("Avec un genre invalide", function () {
        it("retourne une erreur, genre invalide", async function () {
          data = ProductData.generateProductData({
            kind: "princess" as unknown as Kinds,
          });

          const result = validateProductEntries(data.getPayload());

          expect(result).to.deep.equal({ kind: "invalid" });
        });
      });
      describe("Avec un stock non défini", function () {
        it("retourne une erreur, stock obligatoire", async function () {
          data = ProductData.generateProductData({ stock: undefined });

          const result = validateProductEntries(data.getPayload());

          expect(result).to.deep.equal({ stock: "mandatory" });
        });
      });
      describe("Avec un stock comportant autre chose que des nombres", function () {
        it("retourne une erreur, stock invalide", async function () {
          data = ProductData.generateProductData({ stock: "stock50" });

          const result = validateProductEntries(data.getPayload());

          expect(result).to.deep.equal({ stock: "invalid" });
        });
      });
      describe("Avec un poids comportant autre chose que des nombres", function () {
        it("retourne une erreur, poids invalide", async function () {
          data = ProductData.generateProductData({ weight: "2poids9" });

          const result = validateProductEntries(data.getPayload());

          expect(result).to.deep.equal({ weight: "invalid" });
        });
      });
      describe("Avec des dimensions invalides", function () {
        describe("Avec une hauteur non définie", function () {
          it("retourne une erreur, dimensions invalide", async function () {
            data = ProductData.generateProductData({
              dimensions: { width: "200", length: "300" } as Dimension,
            });

            const result = validateProductEntries(data.getPayload());
            expect(result).to.deep.equal({ dimensions: "invalid" });
          });
        });
        describe("Avec une profondeur non définie", function () {
            it("retourne une erreur, dimensions invalide", async function () {
              data = ProductData.generateProductData({
                dimensions: { height: "200", length: "300" } as Dimension,
              });
  
              const result = validateProductEntries(data.getPayload());
              expect(result).to.deep.equal({ dimensions: "invalid" });
            });
          });
          describe("Avec une longueur non définie", function () {
            it("retourne une erreur, dimensions invalide", async function () {
              data = ProductData.generateProductData({
                dimensions: { height: "200", width: "300" } as Dimension,
              });
  
              const result = validateProductEntries(data.getPayload());
              expect(result).to.deep.equal({ dimensions: "invalid" });
            });
          });
      });
    });
  });
});
