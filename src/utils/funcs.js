export const getArray = (maxNumber) => {
  let result = [];
  for(let i = 0; i < maxNumber; i++) {
    result.push(i+1);
  }
  return result;
}