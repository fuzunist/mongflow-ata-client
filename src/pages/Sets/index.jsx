import Row from "@/components/Row";
import Header from "./Header";
import Products from "./Products";
import SelectProductFromList from "@/modals/SelectProductFromList";
import { useProduct, useSets } from "@/store/hooks/apps";
import {
  addSelectSet,
  clearSelectSets,
  setProduct,
  setSelectSets,
} from "@/store/actions/apps";
import { useEffect } from "react";
import Set from "./Set";
import { useParams } from "react-router-dom";
import { useMemo } from "react";

const Sets = () => {
  const selectedProduct = useProduct();
  const sets = useSets();
  const { editingSetID } = useParams();

  const handleContinueOrder = (
    attributes,
    quantity,
    productType,
    closeModal,
    setQuantity,
    setProductType
  ) => {
    addSelectSet("create", attributes, quantity, productType);
    setProduct(null);
    setQuantity(1);
    setProductType("ton");
    closeModal();
  };

  const editingSet = useMemo(() => {
    if (!editingSetID) return null;
    return sets.find((set) => set.set_id === parseInt(editingSetID));
  }, [editingSetID]);

  useEffect(() => {
    setProduct(null);

    if (editingSet) {
      setSelectSets(editingSet.products);
    } else {
      setSelectSets([]);
    }

    return () => {
      setProduct(null);
      clearSelectSets();
    };
  }, []);

  return (
    <>
      <Header />

      <Row>
        <Products type={0} />
        <Products type={1} />
      </Row>

      <SelectProductFromList
        selectedProduct={selectedProduct}
        selectedCustomer={{ customerid: -1 }}
        onContinueOrder={handleContinueOrder}
      />

      <Set editingSet={editingSet} />
    </>
  );
};

export default Sets;
