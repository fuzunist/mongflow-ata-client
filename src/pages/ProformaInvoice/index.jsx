import { useEffect } from "react";
import { useCustomer, useOrders, useProduct, useSet } from "@/store/hooks/apps";
import {
  addSelectProduct,
  addSelectSet,
  setCustomer,
  setProduct,
  setSelectProducts,
  setSelectSets,
  setSet,
} from "@/store/actions/apps";

import Row from "@/components/Row";
import Customers from "./Customers";
import Products from "./Products";
import Invoice from "./Invoice";
import SelectProductFromList from "@/modals/SelectProductFromList";
import OrderStatus from "@/constants/OrderStatus";
import { useParams } from "react-router-dom";
import { useMemo } from "react";
import SelectSetFromList from "@/modals/SelectSetFromList";


const ProformaInvoice = () => {
  const selectedProduct = useProduct();
  const selectedSet = useSet();
  const selectedCustomer = useCustomer();
  const orders = useOrders();
  const { editingOrderNumber } = useParams();

  const handleContinueOrder = (
    attributes,
    attributesIds,
    quantity,
    productType,
    closeModal,
    setQuantity,
    setProductType
  ) => {
    addSelectProduct(attributes, attributesIds, quantity, productType, OrderStatus[0]);
    setProduct(null);
    setQuantity(1);
    setProductType("kg");
    closeModal();
  };

  const handleContinueOrderSet = (
    attributes,
    quantity,
    productType,
    closeModal,
    setQuantity,
    setProductType
  ) => {
    addSelectSet("order", attributes, quantity, productType, OrderStatus[0]);
    setSet(null);
    setQuantity(1);
    setProductType("kg");
    closeModal();
  };

  const editingOrder = useMemo(() => {
    if (!editingOrderNumber) return null;
    return orders.find((order) => order.order_number === editingOrderNumber);
  }, [editingOrderNumber]);

  useEffect(() => {
    setProduct(null);
    setSet(null);
    setCustomer(editingOrder?.customer_id);

    if (editingOrder) {
      setSelectProducts(editingOrder.products ?? []);
      setSelectSets(editingOrder.sets ?? []);
    } else {
      setSelectProducts([]);
      setSelectSets([]);
    }

    return () => {
      setProduct(null);
      setSet(null);
      setCustomer(null);
    };
  }, [editingOrderNumber]);

   console.log("editing orde::::", editingOrder)
  return (
    <>
      <Row>
        <Customers />
        <Products />
      </Row>

      <SelectProductFromList
        selectedProduct={selectedProduct}
        selectedCustomer={selectedCustomer}
        onContinueOrder={handleContinueOrder}
      />

      <SelectSetFromList
        selectedSet={selectedSet}
        selectedCustomer={selectedCustomer}
        onContinueOrder={handleContinueOrderSet}
      />

      <Invoice
        selectedCustomer={selectedCustomer}
        editingOrder={editingOrder}
      />
    </>
  );
};

export default ProformaInvoice;
