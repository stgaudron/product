export type Errors = { [key: string]: MandatoryError | InvalidError | undefined}

export type MandatoryError = 'mandatory'
export type InvalidError = 'invalid'