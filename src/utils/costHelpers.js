export const recipeCost = (values, recipeMaterials) => {
  let totalCost = 0;

  for (const id in values) {
    if (values.hasOwnProperty(id)) {
      const quantity = values[id];
      const material = recipeMaterials.find((mat) => mat.id === parseInt(id));

      if (material) {
        const cost = material.cost * quantity;
        totalCost += cost;
      }
    }
  }

  return totalCost;
};
