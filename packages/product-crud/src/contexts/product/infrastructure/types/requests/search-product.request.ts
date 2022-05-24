import { ApiRequest } from "../../../../../infrastructure/types/api.request";
import { Kinds } from "../../../../product";
import { SearchParams } from "../../../Use-cases/search-product";

export type SearchProductRequest = ApiRequest<
  null,
  SearchProductQueryParameters,
  null
>;
export type SearchProductQueryParameters = {
  sellerId?: string;
  minPrice?: string;
  maxPrice?: string;
  minimalStock?: string;
  kinds?: string;
};
