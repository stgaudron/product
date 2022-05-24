import { haveError } from "../../../../utils";
import { Kinds } from "../../../product";
import { SearchDomainException, SearchDomainExceptionBuilder } from "../../domain/exceptions";
import { ProductRepository } from "../../domain/interface";
import { ProductEntity } from "../../domain/product.entity";
import { validateSearchEntries } from "../../domain/searchentries.validate";

export interface SearchParams {
    sellerId? : string
    priceRange?:  {minPrice?: number, maxPrice?: number}
    minimalStock?: number
    kinds?: Kinds[]
}
export type SearchProductUseCase = (searchParams: SearchParams)=> Promise<ProductEntity[] | SearchDomainException>

export const searchProductUseCase = (repo: ProductRepository): SearchProductUseCase =>{
    return async (searchParams: SearchParams) => {
        let errors = validateSearchEntries(searchParams)
        if(haveError(errors)) return SearchDomainExceptionBuilder.build(errors)
        
        return repo.searchProduct(searchParams)
    }
}