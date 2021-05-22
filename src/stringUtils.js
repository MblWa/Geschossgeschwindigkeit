const findErrors = (sample, input) => {
  let errorCount = 0;
  let errorIndexes = [];

  [...input].forEach((char, i) => {
    if (sample[i] !== char) {
      errorCount += 1;
      errorIndexes.push(i);
    }
  });

  return {errorCount, errorIndexes}
};

export { findErrors };
