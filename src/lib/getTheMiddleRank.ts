const findIndexToChange = (itemRankAbove: string, itemRankBelow: string) => {
  let indexToChange = 0;

  while (itemRankAbove[indexToChange] === itemRankBelow[indexToChange]) {
    indexToChange++;
  }

  return indexToChange;
};

const getNextChar = (char: string) => {
  return String.fromCharCode(char.charCodeAt(0) + 1);
};

const getPreviousChar = (char: string) => {
  return String.fromCharCode(char.charCodeAt(0) - 1);
};

export const getTheMiddleRank = (
  itemRankAbove?: string,
  itemRankBelow?: string
): string => {
  if (!itemRankAbove && itemRankBelow) {
    return getPreviousChar(itemRankBelow[0]) + itemRankBelow.slice(1);
  }

  if (itemRankAbove && !itemRankBelow) {
    return getNextChar(itemRankAbove[0]) + itemRankAbove.slice(1);
  }

  if (!itemRankAbove || !itemRankBelow) {
    return "aaabaaa";
  }

  let indexToChange = findIndexToChange(itemRankAbove, itemRankBelow);

  if (
    getNextChar(itemRankAbove[indexToChange]) === itemRankBelow[indexToChange]
  ) {
    indexToChange++;
  }

  if (indexToChange + 1 > itemRankAbove.length) {
    return itemRankAbove + "a";
  }

  const nextChar = getNextChar(itemRankAbove[indexToChange]);

  return (
    itemRankAbove.slice(0, indexToChange) +
    nextChar +
    itemRankAbove.slice(indexToChange + 1).replace(/./g, "a")
  );
};
