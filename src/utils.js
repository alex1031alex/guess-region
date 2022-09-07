export const getRandomElement = (array) => {
  const maxIndex = array.length - 1;
  const index = Math.floor(Math.random() * (maxIndex + 1));

  return array[index];
};