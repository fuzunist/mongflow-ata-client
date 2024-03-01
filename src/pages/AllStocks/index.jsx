import Header from "./Header";
import { useState } from "react";
import Stocks from "./Stocks";

const AllStocks = () => {
  const [page, setPage] = useState("lastProductStocks");
  return (
    <>
      <Header page={page} setPage={setPage} />
      <Stocks page={page} />
    </>
  );
};

export default AllStocks;
