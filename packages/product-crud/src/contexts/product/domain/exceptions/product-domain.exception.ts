import { InvalidError, MandatoryError } from "../../../../types";

export class ProductDomainExceptionBuilder {

  private static buildMessage(errors: ProductErrors): string {
    //@ts-ignore
    return Object.keys(errors).map((error) => `${error}: ${errors[error]}`).join(', ')
  }

  static build(errors: ProductErrors) {
    return new ProductDomainException(
      this.buildMessage(errors)
    );
  }
}

export class ProductDomainException{
  constructor(public readonly message: string){}
}

export type ProductErrors = {
  reference?: MandatoryError | InvalidError | undefined;
  name?: MandatoryError | InvalidError | undefined;
  sellerId?: MandatoryError | InvalidError | undefined;
  price?: MandatoryError | InvalidError | undefined;
  kind?: MandatoryError | InvalidError | undefined;
  stock?: MandatoryError | InvalidError | undefined;
  weight?: InvalidError | undefined;
  dimensions?: InvalidError | undefined;
};

