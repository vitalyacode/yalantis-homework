export const pruneObject = (obj) => {
  // eslint-disable-next-line prefer-const
  let object = { ...obj };
  Object.keys(obj).forEach((e) => {
    if (!object[e] || (Array.isArray(object[e]) && !object[e][0].length)) {
      delete object[e];
    }
  });
  return object;
};
