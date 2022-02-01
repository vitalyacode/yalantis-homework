export const mapReverse = (array) => {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(array[array.length - i - 1]);
  }
  return result;
};
