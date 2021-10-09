export default function computeExpensiveValue(returnValue) {
  const randomNumbers = Array(10000000).map(() => Math.random());
  randomNumbers.sort((a, b) => a - b);
  return returnValue;
}
