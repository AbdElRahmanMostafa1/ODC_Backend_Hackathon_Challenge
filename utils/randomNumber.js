function randomNumber(factor) {
  var result = (factor * factor).toString().padStart(4, "0").slice(1, 3);
  // pad with zero when necessary and extract the middle value.

  factor = parseInt(result);

  return parseInt(result);
}

function randomArrayShuffle(array, factor) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(factor * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

module.exports = { randomNumber, randomArrayShuffle };
