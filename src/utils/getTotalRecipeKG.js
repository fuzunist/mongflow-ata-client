const getTotalRecipeKG = (values) => {
  const filteredValues = Object.values(values)
    .filter((val) => val !== "") // Remove empty strings
    .map((val) => Number(val)); // Convert values to numbers

  const accumulatedSum = filteredValues.reduce((acc, val) => acc + val, 0); // Calculate the sum

  return parseInt(accumulatedSum);
};


export default getTotalRecipeKG