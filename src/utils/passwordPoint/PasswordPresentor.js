export default class PasswordPresentor {
  // input onChange
  handleInputChange(e, state, update) {
    const name = e.target._internalFiberInstanceHandleDEV.memoizedProps.name;
    const value = e.nativeEvent.text.trim();
    const modifiedValue = value.substring(0, 1); // input maxlength: 1 지정
    update({
      ...state,
      [name]: modifiedValue,
    });
  }

  // value 입력 시, 다음 Index로 focus 이동
  handleNextFocus(ref) {
    for (let i = 0; i < ref.current.length - 1; i++) {
      if (ref.current[i].value) {
        ref.current[i + 1].focus();
      }
    }
  }

  // value 삭제
  handleDeleteEvent(e, ref, state, update) {
    const name = e.name;

    if (e.keyCode === 8) {
      const CURRENT_INDEX = name.slice(-1) - 1;

      ref.current[CURRENT_INDEX].value = ''; // value값 초기화

      update({
        ...state,
        [name]: '',
      });

      if (CURRENT_INDEX === 0) return; // index가 0 일 때는 이전의 value로 이동하면 안 된다.

      // 이전의 value로 이동
      setTimeout(() => {
        ref.current[CURRENT_INDEX - 1].focus();
      });
    }
  }

  // 랜덤한 value 클릭 시, 비어있는 index에 focus 지정
  emptyIndexFocus(ref) {
    for (let i = 0; i < ref.current.length - 1; i++) {
      if (ref.current[i].value === '') {
        ref.current[i].focus();
        break;
      }
    }
  }
}
