import { Kinds } from "../../..";
import { SearchProductQueryParameters } from "../types/requests/search-product.request";
import { SearchParams } from "../../Use-cases/search-product";

export const convertSearchQueryParamsToSearchParams = (searchQueryParams: SearchProductQueryParameters): SearchParams => {
    let result: SearchParams = {}
    if(!!searchQueryParams.sellerId) {
        result.sellerId = searchQueryParams.sellerId
    }
    if(!!searchQueryParams.minPrice) {
        result = {...result, priceRange: { minPrice : Number(searchQueryParams.minPrice)}}
    }
    if(!!searchQueryParams.maxPrice) {
        result= {...result, priceRange: { maxPrice: Number(searchQueryParams.maxPrice)}}
    }
    if(!!searchQueryParams.minimalStock) {
        result= {...result, minimalStock: Number(searchQueryParams.minimalStock)}
    }
    if(!!searchQueryParams.kinds) {
        result = {...result, kinds: searchQueryParams.kinds.split(',') as unknown as Kinds[]}
    }
   return result
}