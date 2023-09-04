type MyObject = { [key: string]: any };

/**
 * This function replaces empty fields in an object with corresponding values from another
 * object.
 * @param {MyObject} obj - MyObject is a TypeScript type that represents an object with any number of
 * properties and values. It is the object that needs to be checked for empty fields.
 * @param {MyObject} replacementObj - The `replacementObj` parameter is an object that contains the
 * values that will replace any empty fields in the `obj` parameter. If a key in `obj` has a null,
 * undefined, or empty string value, the corresponding key in `replacementObj` will be used to replace
 * it. If
 * @returns The function `replaceEmptyFields` is returning a new object with the same properties as the
 * input object `obj`, but with any null, undefined, or empty string values replaced with the
 * corresponding values from the `replacementObj`. If there is no corresponding value in the
 * `replacementObj`, the empty string is used as the replacement value.
 */
export const replaceEmptyFields = (obj: MyObject, replacementObj: MyObject): MyObject => {
  const resultObj = { ...obj };
  for (let key in obj) {
    if (obj[key] === null || obj[key] === undefined || obj[key] === '') {
      resultObj[key] = replacementObj[key] || '';
    }
  }
  return resultObj;
}