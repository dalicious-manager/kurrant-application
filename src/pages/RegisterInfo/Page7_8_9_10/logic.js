export const getUnselectedFoodIdList = (selectedIdList, foodImageList) => {
  let unselected = [];

  foodImageList.forEach(v => {
    if (!selectedIdList.includes(v.foodId)) {
      unselected.push(v.foodId);
    }
  });

  return unselected;
};
