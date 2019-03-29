/**
 * https://stackoverflow.com/questions/38750705/filter-object-properties-by-key-in-es6
 * @param obj object to be filtered
 * @param callbackFn filter function which determines if the key gets filtered or not
 */
export function filter(obj: any, callbackFn: (value: string, index: number, array: string[]) => boolean) {
  return Object.keys(obj)
    .filter(callbackFn)
    .reduce((filtered, key) => {
      filtered[key] = obj[key];
      return filtered;
    }, {});
}
