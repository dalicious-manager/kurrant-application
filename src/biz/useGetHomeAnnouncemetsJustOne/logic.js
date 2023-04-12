function leftPad(value) {
  if (value >= 10) {
    return value;
  }

  return `0${value}`;
}

export const toStringByFormatting = (source, delimiter = '-') => {
  const year = source.getFullYear();
  const month = leftPad(source.getMonth() + 1);
  const day = leftPad(source.getDate());

  return [year, month, day].join(delimiter);
};

toStringByFormatting(new Date(2021, 0, 1));
