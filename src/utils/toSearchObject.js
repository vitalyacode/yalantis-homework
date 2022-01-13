export const toSearchObject = (params) => {
  // eslint-disable-next-line prefer-const
  let object = {};
  const pairs = [...params];
  pairs.forEach((pair) => {
    if (pair[1]) {
      Object.defineProperty(object, pair[0], {
        value: pair[1],
        writable: true,
        enumerable: true,
      });
    }
  });
  return object;
};
