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

export const makeYo = arr => {
  console.log('fhfhfh');

  console.log(arr);

  const result = Object.entries(arr[0]).map(v => {
    return {
      id: v[0],
      text: v[1],
    };
  });

  // const result =

  console.log('고고고고고ㅗㄱ고');
  console.log(result);

  return result;
};
