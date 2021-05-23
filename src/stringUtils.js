const findErrors = (sample, input) => {
  const errorIndexes = [];

  [...input].forEach((char, i) => {
    if (sample[i] !== char) {
      errorIndexes.push(i);
    }
  });

  return errorIndexes;
};

export { findErrors as default };
