import { ApiRequest } from "../../../../../infrastructure/types/api.request";

export type GetProductRequest = ApiRequest<GetProductQueryParameters, null, null>
export type GetProductQueryParameters = { reference: string }