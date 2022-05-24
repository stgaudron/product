import { InvalidError } from "../../../../types"

export class SearchDomainExceptionBuilder {

    private static buildMessage(errors: SearchErrors): string {
        //@ts-ignore
    return Object.keys(errors).map((error) => `${error}: ${errors[error]}`).join(', ')
    }

    static build(errors: SearchErrors) {
        return new SearchDomainException(
            this.buildMessage(errors)
        )
    }
}

export class SearchDomainException {
    constructor(public readonly message: string) {}
}

export type SearchErrors = {
    sellerId?: InvalidError | undefined
    priceRange?: InvalidError | undefined
    minimalStock?: InvalidError | undefined
    kinds?: InvalidError | undefined
}