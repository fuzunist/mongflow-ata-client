import Row from "@/components/Row";
import Header from "./Header";
import Products from "./Products";
import { useState } from "react";
import Selected from "./Selected";

const Stocks = () => {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <Header />
      <Row align="center">
        <Products
          stocks={stocks}
          selected={selected}
          setSelected={setSelected}
        />
        <Selected selected={selected} stocks={stocks} />
      </Row>
    </>
  );
};

export default Stocks;
