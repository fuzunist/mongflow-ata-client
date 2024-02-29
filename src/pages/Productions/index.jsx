import Header from "./Header";
import { useState } from "react";
import AllOrders from "./AllOrders";
import UpComingProductions from "./UpComingProductions";
import CurrentlyProducings from "./CurrentlyProducings";
import CompletedProductions from "./CompletedProductions";
import ShippedOrders from "./ShippedOrders";

const MaterialStocks = () => {
  const [page, setPage] = useState("allOrders");

  return (
    <>
      <Header page={page} setPage={setPage} />

      {page === "allOrders" ? (
        <AllOrders page={page} setPage={setPage} />
      ) : page === "upcomingProductions" ? (
        <UpComingProductions page={page} setPage={setPage} />
      ) : page === "currentlyProducings" ? (
        <CurrentlyProducings page={page} setPage={setPage} />
      ) : page === "completedProductions" ? (
        <CompletedProductions page={page} setPage={setPage} />
      ) : (
        <ShippedOrders />
      )}
    </>
  );
};

export default MaterialStocks;
