import { SearchProductQueryParameters } from "../contexts/product/infrastructure/types/requests/search-product.request";
import { SearchParams } from "../contexts/product/Use-cases/search-product";

export const pathBuilder = (searchQueryParams: SearchProductQueryParameters): string => {
    const prefix = `/v1/products`
    console.log(searchQueryParams)
    // const stringParams = {
    //     sellerId: searchQueryParams.sellerId,
    //     minPrice: searchQueryParams.minPrice,
    //     maxPrice: searchQueryParams.maxPrice,
    //     minimalStock: searchQueryParams.minimalStock
    // }
    // let params = new URLSearchParams(stringParams)
    
    return prefix + new URLSearchParams(searchQueryParams).toString()
}