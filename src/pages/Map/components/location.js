export const findClosestCoordinate = (coordinates, targetCoordinate) => {
  let minLongitudeDiff = null;
  let closestCoordinate = null;

  coordinates.forEach(coord => {
    const longitudeDiff = Math.abs(
      targetCoordinate.longitude - coord.longitude,
    );

    if (minLongitudeDiff === null || longitudeDiff < minLongitudeDiff) {
      minLongitudeDiff = longitudeDiff;
      closestCoordinate = coord;
    }
  });

  return closestCoordinate;
};
