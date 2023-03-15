export const SseLogics = {};

export const applyDebouncing = (millisecond, callback) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(callback());
    }, millisecond);
  });
};
