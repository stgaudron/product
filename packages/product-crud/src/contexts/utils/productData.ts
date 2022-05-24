import { Dimension, Kinds } from "../product";
import { ProductEntity } from "../product/domain/product.entity";
import { ProductRaw } from "../product/infrastructure/types/database.types";

export class ProductData {
  constructor(
    private reference: string,
    private name: string,
    private sellerId: string,
    private price: string,
    private kind: Kinds,
    private stock: string,
    private weight?: string,
    private dimensions?: {
      height: string;
      width: string;
      length: string;
    }
  ) {}

  getPayload(): ProductEntity {
    return {
      reference: this.reference, 
      name: this.name,
      sellerId: this.sellerId,
      price: this.price,
      kind: this.kind,
      stock: this.stock,
      weight: this.weight,
      dimensions: this.dimensions
    };
  }

  getEntity(): ProductEntity{
    return {
      reference: this.reference,
      name: this.name,
      sellerId: this.sellerId,
      price: this.price,
      kind: this.kind,
      stock: this.stock,
      weight: this.weight,
      dimensions: this.dimensions
    }
  }

  getProduct(): ProductRaw {
    return {
      reference: this.reference,
      name: this.name,
      sellerId: this.sellerId,
      price: Number(this.price),
      kind: this.kind,
      stock: Number(this.stock),
      weight: this.weight,
      height: this.dimensions?.height,
      width: this.dimensions?.width,
      length: this.dimensions?.length
    }
  }

  static generateProductData(
    givenFields: Partial<ProductEntity> = {}
  ): ProductData {
    const defaultFields = {
      reference: "064394",
      name: "Tie Fighter",
      sellerId: "amazon",
      price: "80",
      kind: Kinds.starwars,
      stock: "5",
    };
    const fields = { 
      ...defaultFields,
      ...givenFields };
    return new this(
      fields.reference,
      fields.name,
      fields.sellerId,
      fields.price,
      fields.kind as Kinds,
      fields.stock,
      fields.weight,
      fields.dimensions as Dimension
    );
  }
}
