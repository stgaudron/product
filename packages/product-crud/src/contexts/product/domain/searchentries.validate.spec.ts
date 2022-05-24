import { expect } from "chai";
import { Kinds } from "../../product";
import { ProductData } from "../../utils";
import { SearchParams } from "../Use-cases/search-product";
import { validateSearchEntries } from "./searchentries.validate";

describe("UNIT | SEARCH PRODUCT | validate entries", function () {
  describe("#validateSearchEntries", function () {
    let data: ProductData;
    let searchParams: SearchParams;

    describe("Avec des paramètres de recherche valides", function () {
      it("retourne un objet vide", function () {
        searchParams = {
          sellerId: "amazon",
          priceRange: { minPrice: 10, maxPrice: 500 },
          minimalStock: 1,
          kinds: [Kinds.starwars, Kinds.marvel],
        };

        const result = validateSearchEntries(searchParams);

        expect(result).to.deep.equal({});
      });
    });
    describe("Avec des paramètres de recherche invalides", function () {
      describe("Pour un vendeur invalide", function () {
        it("retourne une erreur, vendeur invalide", function () {
          searchParams = {
            sellerId: 5340 as unknown as string,
          };

          const result = validateSearchEntries(searchParams);

          expect(result).to.deep.equal({ sellerId: "invalid" });
        });
      });
      describe("Pour une plage de prix invalide", function () {
        describe("Avec un prix minimum invalide", function () {
          it("retourne une erreur, plage de prix invalide", function () {
            searchParams = {
              priceRange: { minPrice: "50" } as unknown as object,
            };

            const result = validateSearchEntries(searchParams);

            expect(result).to.deep.equal({ priceRange: "invalid" });
          });
        });
        describe("Avec un prix maximum invalide", function () {
          it("retourne une erreur, plage de prix invalide", function () {
            searchParams = {
              priceRange: { maxPrice: "500" } as unknown as object,
            };

            const result = validateSearchEntries(searchParams);

            expect(result).to.deep.equal({ priceRange: "invalid" });
          });
        });
        describe("Avec un prix minimum supérieur au prix maximum", function () {
          it("retourne une erreur, plage de prix invalide", function () {
            searchParams = {
              priceRange: { minPrice: 100, maxPrice: 50 },
            };

            const result = validateSearchEntries(searchParams);

            expect(result).to.deep.equal({ priceRange: "invalid" });
          });
        });
      });
      describe("Pour un stock minimum invalide", function () {
          it("retourne une erreur, plage de prix invalide", function () {
            searchParams = {
              minimalStock: "3" as unknown as number
            };

            const result = validateSearchEntries(searchParams);

            expect(result).to.deep.equal({ minimalStock : "invalid" });
          });
      });
      describe("Pour un genre invalide", function () {
        it("retourne une erreur, genre invalide", function () {
          searchParams = {
            kinds: [Kinds.starwars, "friends"] as unknown as Kinds[]
          };

          const result = validateSearchEntries(searchParams);

          expect(result).to.deep.equal({ kinds : "invalid" });
        });
    });
    });
  });
});
