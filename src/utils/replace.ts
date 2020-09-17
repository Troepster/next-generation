export const replaceItemAtIndex = (arr: [number], index: number, newValue: number): [number] => {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)] as [number];
};
