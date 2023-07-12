// 글자 찾기
export const detectSpecificTextInText = (
  specificText,
  text,
  handleTrue = () => {},
  handleFalse = () => {},
) => {
  if (new RegExp(specificText).test(text)) {
    handleTrue();
    return true;
  } else {
    handleFalse();
    return false;
  }
};
