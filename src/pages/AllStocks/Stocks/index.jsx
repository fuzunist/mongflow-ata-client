import Header from "./Header";
import {
  useConsumableProductStocks,
  useLastProductStocks,
  useRawMaterialStocks,
  useRecipeMaterialStocks,
  useSecondQualityProductStocks,
} from "@/store/hooks/apps";
import { useEffect, useState } from "react";
import Items from "./Items";

const Stocks = ({ page }) => {
  const [stocks, setStocks] = useState([]);

  const lastProductStocks = useLastProductStocks();
  const rawMaterialStocks = useRawMaterialStocks();
  const recipeMaterialStocks = useRecipeMaterialStocks();
  const secondQualityProductStocks= useSecondQualityProductStocks();
  const consumableProductStocks = useConsumableProductStocks();

  console.log("useLastProductStocks", lastProductStocks);
  console.log("useRawMaterialStocks", rawMaterialStocks);
  console.log("useRecipeMaterialStocks", recipeMaterialStocks);
  console.log("secondQualityProductStocks", secondQualityProductStocks);
  console.log("consumableProductStocks", consumableProductStocks);

  useEffect(() => {
    if (page === "lastProductStocks") {
      setStocks([...lastProductStocks]);
    } else if (page === "rawMaterialStocks") {
      setStocks([...rawMaterialStocks]);
    } else if (page === "recipeMaterialStocks") {
      setStocks([...recipeMaterialStocks]); 
    } else if (page === "secondQualityProductStocks") {
      setStocks([...secondQualityProductStocks]); 
    } else if (page === "consumableProductStocks") {
      setStocks([...consumableProductStocks]); 
    }
  }, [page, lastProductStocks, rawMaterialStocks, recipeMaterialStocks]);

  return (
    <>
      <Header page={page} />
      {<Items stocks={stocks} page={page} />}
    </>
  );
};

export default Stocks;
