import { ApiRequest } from "../../../../../infrastructure/types/api.request";
import { Product } from "../../../../product";

export type CreateProductRequest = ApiRequest<null, null, Product>