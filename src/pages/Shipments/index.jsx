import Header from "./Header";
import { useState } from "react";
import Shipped from "./Shipped";
import PendingShipments from "./PendingShipments";


const Shipments = () => {
  const [page, setPage] = useState("PendingShipments");

  return (
    <>
      <Header page={page} setPage={setPage} />

      {page === "PendingShipments" ? 
        <PendingShipments page={page} setPage={setPage} /> :
        <Shipped />
      }
    </>
  );
};

export default Shipments;
