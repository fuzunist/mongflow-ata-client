import React from "react";
import { useRecipeMaterialStocks } from "@/store/hooks/apps";

const useExceededStocks = ({ values }) => {
  const recipeMaterials = useRecipeMaterialStocks();

  const exceedsStock = {};

  Object.keys(values).forEach((key) => {
    const id = parseInt(key);
    const value = values[key];
    const stock = recipeMaterials.find((stockItem) => {
      return stockItem.id === id;
    });

    if (stock) {
      if (value !== "" && parseInt(value) > parseInt(stock.stock)) {
        exceedsStock[id] = true;
      }
    }
  });

  console.log("Exceeds stock:", exceedsStock);
  return { exceedsStock };
};

export default useExceededStocks;
