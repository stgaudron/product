import { ApiRequest } from "../../../../../infrastructure/types/api.request"
import { Product } from "../../../../product"

export type UpdateProductRequest = ApiRequest<PutProductQueryParameters, null, Product>
export type PutProductQueryParameters = { reference: string }