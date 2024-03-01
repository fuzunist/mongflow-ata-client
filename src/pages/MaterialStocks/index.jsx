import Row from "@/components/Row";
import Header from "./Header";

import { useState } from "react";


import RawMaterialStocks from "@/pages/RawMaterialStocks";
import RecipeMaterialStocks from "@/pages/RecipeMaterialStocks";

const MaterialStocks = () => {
  const [page, setPage] = useState("recipeMaterial");

  return (
    <>
      <Header page={page} setPage={setPage} />

      <Row>
        {page === "recipeMaterial" ? (
          <RecipeMaterialStocks />
        ) : (
          <RawMaterialStocks />
        )}
      </Row>
    </>
  );
};

export default MaterialStocks;
