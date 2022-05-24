import { Kinds } from "../../product";
import { isEnumValueValid } from "../../utils";
import { SearchParams } from "../Use-cases/search-product";
import { SearchErrors } from "./exceptions";

export const validateSearchEntries = (
  searchParams: SearchParams
): SearchErrors => {
  return {
    ...validateSellerId(searchParams),
    ...validatePriceRange(searchParams),
    ...validateMinimalStock(searchParams),
    ...validateKinds(searchParams),
  };
};

export const validateSellerId = (searchParams: SearchParams): SearchErrors => {
  if (searchParams.sellerId && typeof searchParams.sellerId !== "string") {
    return { sellerId: "invalid" };
  } else {
    return {};
  }
};

export const validatePriceRange = (
  searchParams: SearchParams
): SearchErrors => {
  if (
    (searchParams.priceRange?.minPrice &&
      typeof searchParams.priceRange.minPrice !== "number") ||
    (searchParams.priceRange?.maxPrice &&
      typeof searchParams.priceRange?.maxPrice !== "number") ||
    (searchParams.priceRange?.minPrice &&
      searchParams.priceRange.maxPrice &&
      searchParams.priceRange.minPrice > searchParams.priceRange.maxPrice)
  ) {
    return { priceRange: "invalid" };
  } else {
    return {};
  }
};

export const validateMinimalStock = (
  searchParams: SearchParams
): SearchErrors => {
  if (
    searchParams.minimalStock &&
    typeof searchParams.minimalStock !== "number"
  ) {
    return { minimalStock: "invalid" };
  } else {
    return {};
  }
};

export const validateKinds = (searchParams: SearchParams): SearchErrors => {
    if(searchParams.kinds && !isArrayEnumValid(searchParams.kinds)){
        return { kinds : "invalid"}
    } else return {}
}

const isArrayEnumValid = (arr: Array<string>): boolean => {
    return arr.every(curr => isEnumValueValid(Kinds,curr))
}
