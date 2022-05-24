/* eslint-disable security/detect-object-injection */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getEnumValue = <T>(enumList: any, value: string | number): T => {
    const keyFound = Object.keys(enumList).find(key => enumList[key] === value)
    return keyFound ? enumList[keyFound] : enumList[0]
  }
  
  export const isEnumValueValid = (enumList: Enum, value: string | number) => Object.values(enumList).includes(value)
  
  type Enum = { [key: string]: string | number }
