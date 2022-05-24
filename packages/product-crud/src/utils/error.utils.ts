import { Errors } from "../types/errors.types";


export const haveError = (errors: Errors): boolean => Object.keys(errors).length > 0
