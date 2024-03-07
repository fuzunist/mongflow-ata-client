const getExceededStock = (values, recipeMaterials, totalBunker) => {
  const exceedsStock = {};

  Object.keys(values).forEach((key) => {
    const id = parseInt(key);
    const value = values[key];
    const stock = recipeMaterials.find((stockItem) => {
      return stockItem.id === id;
    });

    if (stock) {
      if (value !== "" && (parseInt(value)* parseInt(totalBunker)) > parseInt(stock.quantity)) {
        exceedsStock[id] = true;
      }
    }
  });

  console.log("Exceeds stock:", exceedsStock);
  return exceedsStock;
};

export default getExceededStock