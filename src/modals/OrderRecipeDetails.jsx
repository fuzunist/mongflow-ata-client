import { useEffect, useState } from "react";
import { useRecipeMaterials, useRecipes } from "@/store/hooks/apps";

const OrderRecipeDetails = ({ order_id, recipe_id }) => {
  const recipes = useRecipes();
  const recipeMaterials = useRecipeMaterials();
  const [recipeDetails, setRecipeDetails] = useState();

  const foundRecipe = recipes?.find((recipe) => recipe.id === recipe_id);

useEffect(()=>{
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
        };
      })
      .filter(Boolean);
    setRecipeDetails(recipeDetails);
  }

},[foundRecipe])
  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="font-semibold mb-2 text-lg">
        Reçete Detayı{" "}
        <span className="font-extralight text-sm ml-2">{" (1 ton)"}</span>
      </h2>
      <span className="w-full p-[0.5px] bg-gray-300 lg:w-2/3"></span>
      <div className="flex flex-col  mt-2">
        {recipeDetails?.map((item, key) => (
          <span className="p-2" key={key}>
            {key + 1}. {item.material}:{" "}
            <span className="font-semibold">{item.value} kg</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default OrderRecipeDetails;
