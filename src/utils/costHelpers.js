export const recipeCost = (values, recipeMaterials) => {
  let totalCost = 0;

  for (const id in values) {
    if (values.hasOwnProperty(id)) {
      const quantity = values[id];
      const material = recipeMaterials.find((mat) => mat.id === parseInt(id));

      if (material) {
        const cost = material.price * quantity; // bunker cinsi için *0.44
        totalCost += cost;
      }
    }
  }

  // 1 ton 0.4444 bunker
  // 1 bunker 2.25 ton

  return parseFloat(totalCost);
};
