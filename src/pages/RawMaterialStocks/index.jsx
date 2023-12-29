import Row from "@/components/Row";
import Header from "./Header";
import Products from "./Products";

import { useState } from "react";
import Selected from "./Selected";
import { useRawMaterials } from "@/store/hooks/apps";

const Stocks = () => {
  const [selected, setSelected] = useState(null);
  const rawMaterialStocks = useRawMaterials();

  return (
    <div className='flex flex-col w-full m-6 '>
      <Header stocks={rawMaterialStocks} />
      <Row align="center">
        <Products
          stocks={rawMaterialStocks}
          selected={selected}
          setSelected={setSelected}
        />
        <Selected selected={selected} />
      </Row>
    </div>
  );
};

export default Stocks;
