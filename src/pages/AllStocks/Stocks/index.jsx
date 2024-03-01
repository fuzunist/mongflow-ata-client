import Header from "./Header";
import {
  useLastProductStocks,
  useRawMaterialStocks,
  useRecipeMaterialStocks,
} from "@/store/hooks/apps";
import { useEffect, useState } from "react";
import Items from "./Items";

const Stocks = ({ page }) => {
  const [stocks, setStocks] = useState([]);

  const lastProductStocks = useLastProductStocks();
  const rawMaterialStocks = useRawMaterialStocks();
  const recipeMaterialStocks = useRecipeMaterialStocks();

  console.log("useLastProductStocks", lastProductStocks);
  console.log("useRawMaterialStocks", rawMaterialStocks);
  console.log("useRecipeMaterialStocks", recipeMaterialStocks);

  useEffect(() => {
    if (page === "lastProductStocks") {
      setStocks([...lastProductStocks]);
    } else if (page === "rawMaterialStocks") {
      setStocks([...rawMaterialStocks]);
    } else if (page === "recipeMaterialStocks") {
      setStocks([...recipeMaterialStocks]);
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
