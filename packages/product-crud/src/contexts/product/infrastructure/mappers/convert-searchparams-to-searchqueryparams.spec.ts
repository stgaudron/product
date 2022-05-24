import { expect } from "chai"
import { SearchProductQueryParameters } from "../types/requests/search-product.request"
import { convertSearchQueryParamsToSearchParams } from "./convert-searchparams-to-searchqueryparams"

describe("UNIT | SEARCH PARAMS CONVERTER", function () {
    describe("#converSearchQueryParamsToSearchParams", function () {
        describe("Avec un paramètre sellerId non défini", function () {
            it("ne retourne pas de sellerId", async function () {
                const searchQueryParams: SearchProductQueryParameters = { minimalStock : "4"}

                const result = Object.keys(convertSearchQueryParamsToSearchParams(searchQueryParams))
                
                expect(result).to.not.include("sellerId")
            })
        })
        describe("Avec un paramètre prix minimum non défini ", function () {
            it("ne retourne pas de prix minimum dans la plage de prix", async function () {
                const searchQueryParams: SearchProductQueryParameters = { minimalStock : "4"}

                const result = Object.keys(convertSearchQueryParamsToSearchParams(searchQueryParams))
                
                expect(result).to.not.include("priceRange.minPrice")
            })
        })
        
        describe("Avec un paramètre prix maximum non défini ", function () {
            it("ne retourne pas de prix maximum dans la plage de prix", async function () {
                const searchQueryParams: SearchProductQueryParameters = { minimalStock : "4"}

                const result = Object.keys(convertSearchQueryParamsToSearchParams(searchQueryParams))
                
                expect(result).to.not.include("priceRange.maxPrice")
            })
        })
        describe("Avec un paramètre stock minimum non défini ", function () {
            it("ne retourne pas de stock minimum", async function () {
                const searchQueryParams: SearchProductQueryParameters = { minPrice : "40"}

                const result = Object.keys(convertSearchQueryParamsToSearchParams(searchQueryParams))
                
                expect(result).to.not.include("priceRange.minPrice")
            })
        })
        describe("Avec un paramètre genre non défini ", function () {
            it("ne retourne pas de genre", async function () {
                const searchQueryParams: SearchProductQueryParameters = { minPrice : "40"}

                const result = Object.keys(convertSearchQueryParamsToSearchParams(searchQueryParams))
                
                expect(result).to.not.include("priceRange.minPrice")
            })
        })
    })
})