import Row from "@/components/Row";
import Header from "./Header";
import Product from "./Product";
import {
  useProduct,
  useProducts,
  useSearch,
  useSets,
} from "@/store/hooks/apps";
import { useMemo, useState } from "react";
import Modal from "@/components/Modal";
import CreateProduct from "@/modals/CreateProduct";
import { setProduct } from "@/store/actions/apps";
import { useUser } from "@/store/hooks/user";
import Set from "./Set";

const Products = () => {
  const products = useProducts();
  const sets = useSets();
  const selectedProduct = useProduct();
  const searchValue = useSearch();
  const user = useUser();
  const [page, setPage] = useState("products");

  const type =
    page === "products"
      ? 0
      : page === "recipeMaterialProducts"
      ? 1
      : page === "rawMaterialProducts"
      ? 2
      : page === "secondProducts"
      ? 3
      : page === "filters"
      ? 4
      : 0;

  const authenticate = useMemo(
    () => ["boss", "stock_manager"].includes(user.usertype),
    [user]
  );

  const closeModal = () => setProduct(null);

  const filteredProducts = useMemo(() => {
    const normal_products = products.filter(
      (product) => product.product_type === type
    );

    if (!searchValue) return normal_products;

    return normal_products.filter((product) =>
      product.product_name.toLowerCase().startsWith(searchValue.toLowerCase())
    );
  }, [searchValue, products, page]);

  return (
    <>
      <Header
        authenticate={authenticate}
        page={page}
        setPage={setPage}
        type={type}
      />

      <Row>
        {filteredProducts.map((product, index) => (
          <Product key={index} product={product} authenticate={authenticate} />
        ))}
      </Row>
      <Modal directRender={!!selectedProduct} closeModal={closeModal}>
        <CreateProduct
          closeModal={closeModal}
          selectedProduct={selectedProduct}
          type={type}
        />
      </Modal>
    </>
  );
};

export default Products;
