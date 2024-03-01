import Header from "./Header";
import {useState } from "react";
import StockLogs from "./StockLogs";

const MaterialStocks = () => {
  const [page, setPage] = useState("lastProductStocks");
  return (
    <>
      <Header page={page} setPage={setPage} />
      <StockLogs page={page} />
    </>
  );
};

export default MaterialStocks;
