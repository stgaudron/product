import { Dimension, Kinds, Product } from "../../product";
import { isEnumValueValid } from "../../utils";
import { ProductErrors } from "./exceptions";

type ProductPayload = Product

export const validateProductEntries = (payload: unknown): ProductErrors => {
  return {
    ...validateReference(payload),
    ...validateName(payload),
    ...validateSellerId(payload),
    ...validatePrice(payload),
    ...validateKind(payload),
    ...validateStock(payload),
    ...validateWeight(payload),
    ...validateDimensions(payload),
  };
};

const validateReference = (payload: unknown): ProductErrors => {
  if (hasValidKey(payload, "reference")) {
    if (!payload.reference) {
      return { reference: "mandatory" };
    }
    if (payload.reference.includes(",") || payload.reference.includes(";")) {
      return { reference: "invalid" };
    }
    return {};
  } else return { reference: undefined };
};

const validateName = (payload: unknown): ProductErrors => {
  if (hasValidKey(payload, "name")) {
    if (!payload.name) {
      return { name: "mandatory" };
    }
    return {};
  } else return { name: undefined };
};

const validateSellerId = (payload: unknown): ProductErrors => {
  if (hasValidKey(payload, "sellerId")) {
    if (!payload.sellerId) {
      return { sellerId: "mandatory" };
    }
    return {};
  } else return { sellerId: undefined };
};

const validatePrice = (payload: unknown): ProductErrors => {
  if (hasValidKey(payload, "price")) {
    if (!payload.price) {
      return { price: "mandatory" };
    }
    if (!isStringOfNumbers(payload.price)) {
      return { price: "invalid" };
    }
    return {};
  } else return { price: undefined };
};

const validateKind = (payload: unknown): ProductErrors => {
  if (hasValidKey(payload, "kind")) {
    if (!payload.kind) {
      return { kind: "mandatory" };
    }
    if (!isEnumValueValid(Kinds, payload.kind)) {
      return { kind: "invalid" };
    }
    return {};
  } else return { kind: undefined };
};

const validateStock = (payload: unknown): ProductErrors => {
  if (hasValidKey(payload, "stock")) {
    if (!payload.stock) {
      return { stock: "mandatory" };
    }
    if (!isStringOfNumbers(payload.stock)) {
      return { stock: "invalid" };
    }
    return {};
  } else return { stock: undefined };
};

const validateWeight = (payload: unknown): ProductErrors => {
  if (hasValidKey(payload, "weight")) {
    if (!!payload.weight && !isStringOfNumbers(payload.weight)) {
      return { weight: "invalid" };
    }
    return {};
  } else return {};
};

const validateDimensions = (payload: unknown): ProductErrors => {
  if (hasValidKey(payload, "dimensions")) {
    if (!isValidDimensionsObject(payload.dimensions)) {
      return { dimensions: "invalid" };
    }
    return {};
  } else {
    return {};
  }
};

const hasValidKey = (obj: unknown, key: string): obj is ProductPayload => {
  return !!obj && typeof obj === "object" && obj.hasOwnProperty(key);
};

const isValidDimensionsObject = (obj: unknown): obj is Dimension => {
  return !obj || (typeof obj === "object" && obj.hasOwnProperty("height") && obj.hasOwnProperty("width") && obj.hasOwnProperty("length"));
};

const isStringOfNumbers = (str: unknown): boolean =>
  typeof str === "string" && /^\d+(\.\d+)?$/.test(str);
