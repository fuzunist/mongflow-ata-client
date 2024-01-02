import React from "react";
import Expenses from "./Expenses";
import Header from "./Header";
import Row from "@/components/Row";

const Expense = () => {
  return (
    <div className="flex flex-col w-full m-6 ">
      <Header />
      <Row align="center">
        <Expenses />
      </Row>
    </div>
  );
};

export default Expense;
