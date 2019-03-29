/**
 * https://stackoverflow.com/questions/14446511/most-efficient-method-to-groupby-on-a-array-of-objects
 * @param array array to be grouped - will be split by '.' to search for embedded key values
 * @param key property key to be used for group by
 */
export function groupBy<T>(array: T[], key: string): { [key: string]: T[] } {
  return array.reduce((obj, arrayItem) => {
    const keys = key.split('.');
    const keyValue = getKeyValue(arrayItem, keys);

    const group = obj[keyValue] || [];

    return {
      ...obj,
      [keyValue]: [ ...group, arrayItem ],
    };
  }, {});
}

function getKeyValue(obj, keys) {
  return keys.reduce((value, key) => {
    return !!value ? value[key] : null;
  }, obj);
}

/**
 * https://stackoverflow.com/questions/10865025/merge-flatten-an-array-of-arrays-in-javascript
 * @param array to be flat-mapped
 * @param callbackFn Function that produces an element of the new Array
 */
export function flatMap<T, U>(array: T[], callbackFn: (value: T, index: number, array: T[]) => U[]): U[] {
  const array2 = array.map(callbackFn);
  return [].concat.apply([], array2);
}
