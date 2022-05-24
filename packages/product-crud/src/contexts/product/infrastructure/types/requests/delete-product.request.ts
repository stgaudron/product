import { ApiRequest } from "../../../../../infrastructure/types/api.request";

export type DeleteProductRequest = ApiRequest<DeleteProductQueryParameters, null, null>
export type DeleteProductQueryParameters = { reference: string }