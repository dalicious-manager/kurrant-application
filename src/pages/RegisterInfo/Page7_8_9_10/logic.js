export const getUnselectedFoodIdList = (selectedIdList, foodImageList) => {
  let unselected = [];
  console.log('뇸뇸뇸');
  console.log(selectedIdList);
  console.log(foodImageList);

  foodImageList.forEach(v => {
    if (!selectedIdList.includes(v.foodId)) {
      unselected.push(v.foodId);
    }
  });

  return unselected;
};
