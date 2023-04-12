export const makeArrayOfIdAndName = arr => {
  const result = arr.map(v => {
    return {
      id: v,
      name: v,
    };
  });

  return result;
};
export const makeArrayOfIdAndText = arr => {
  const result = arr.map(v => {
    return {
      id: v,
      text: v,
    };
  });

  return result;
};
