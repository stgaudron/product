import { ProductDomainException } from './product-domain.exception'

export class ProductNotFoundDomainException extends ProductDomainException{
    constructor(){
        super('Product not found')
    }
}