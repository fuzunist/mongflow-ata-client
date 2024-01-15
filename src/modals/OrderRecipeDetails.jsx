import { useEffect, useState } from "react";
import { useRecipeMaterials, useRecipes } from "@/store/hooks/apps";

const OrderRecipeDetails = ({ order_id, recipe_id }) => {
  const recipes = useRecipes();
  const recipeMaterials = useRecipeMaterials();
  const [recipeDetails, setRecipeDetails] = useState();

  const foundRecipe = recipes?.find((recipe) => recipe.id === recipe_id);

  useEffect(() => {
    if (foundRecipe) {
      let recipeDetails = Object.entries(foundRecipe?.details)
        ?.map(([key, value]) => {
          if (value === "") return;
          const material = Object.values(recipeMaterials)?.find(
            (item) => parseInt(item.id) === parseInt(key)
          );
          return {
            material: material.material,
            value: value,
            cost: material.cost,
            stock: material.stock,
            total_bunker: foundRecipe?.total_bunker,
            unit_bunker_cost: foundRecipe?.unit_bunker_cost,
            total_bunker_cost: foundRecipe?.total_bunker_cost,
          };
        })
        .filter(Boolean);
      setRecipeDetails(recipeDetails);
    }
  }, [foundRecipe, recipes, recipe_id]);
  return (
    foundRecipe &&
    <div className="flex flex-col  justify-center items-center max-w-5xl 5xl">
      <h2 className="font-semibold mb-2 text-lg">
        Reçete Detayı{" "}
        <span className="font-extralight text-sm ml-2">{" (1 bunker)"}</span>
      </h2>
      <span className="w-full p-[0.5px] bg-gray-300 lg:w-2/3"></span>
      <div className="flex flex-col mt-2">
        {recipeDetails?.map((item, key) => {
          if (item.value === 0) {
            return null;
          }
          return (
            <div
              className="flex p-2 gap-x-4 gap-y-2 mt-2 bg-slate-50"
              key={key}
            >
              <span>
                {key + 1}. {item?.material.toUpperCase()}:{" "}
              </span>
              <span className="font-semibold">{item?.value} kg</span>
              <span className="font-extralight">|</span>
              <span>
                {" "}
                Maliyet: {" $"}
                {(item?.value * item?.cost).toFixed(2)} USD{" "}
              </span>
              <span className="font-extralight">|</span>

              <span>
                {" "}
                Mevcut Stok: {item?.stock}
                {" kg "}
              </span>
            </div>
          );
        })}
      </div>
      <hr className="text-gray-500 h-1 w-full p-2 mt-2" />
      <div className="flex flex-col gap-y-2  mt-4">
        <span className="flex gap-x-2 items-center">
          Bu reçete için Gereken Bunker:{" "}
          <span className="font-medium text-lg">
            {foundRecipe?.total_bunker} adet
          </span>
        </span>
        <span className="flex gap-x-2 items-center">
          1 bunker maliyeti:{" "}
          <span className="font-medium text-lg">
            {foundRecipe?.unit_bunker_cost} USD
          </span>
        </span>
        <span className="flex gap-x-2 items-center">
          Toplam bunker maliyeti:{" "}
          <span className="font-medium text-lg">
            {foundRecipe?.total_bunker_cost} USD
          </span>
        </span>
      </div>
    </div>
  );
};

export default OrderRecipeDetails;
