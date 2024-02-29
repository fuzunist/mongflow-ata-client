import Row from "@/components/Row";
// No need for Header as you mentioned you don't want it for orders.
import Order from "./Order"; // Importing the Order component instead of Product
import {
  useFilter,
  useOrders,
  useProductionRecipes,
  useSearch,
  useSorter,
} from "@/store/hooks/apps"; // Assuming you have a similar hook for orders
import { useMemo } from "react";
import { useUser } from "@/store/hooks/user";
import { useEffect, useState } from "react";
import { setFilter, setSearch, setSorter } from "@/store/actions/apps";
import { useTranslation } from "react-i18next";
import Card from "@/components/Card";
import Col from "@/components/Col";
import SendToMergedProduction from "@/modals/SendToMergedProduction";
import Modal from "@/components/Modal";

const CurrentlyProducings = ({ page, setPage }) => {
  const user = useUser();
  const orders = useOrders();
  const productionRecipes = useProductionRecipes();
  const search = useSearch();
  const sorter = useSorter();
  const { t } = useTranslation();

  const producingProducts = useMemo(() => {
    if (!user.userid || !orders.length) return [];
  
    const updatedOrders = orders
      .filter((order) => order.status.length === 4)
      .map((order) => {
        const updatedProducts = order.products.flatMap((product) => {
          return product.orderStatus
            .map((status) => {
              if (status && status?.type === "Üretiliyor") {
                return { ...product, production: status };
              }
              return null;
            })
            .filter(Boolean);
        });
  
        return {
          ...order,
          products: updatedProducts,
        };
      }).filter((order) => order.products.length !== 0);
  
    return updatedOrders;
  }, [user, orders]);
  

  console.log("producingProducts", producingProducts);

  const searchedOrders = useMemo(() => {
    if (!search) return [...producingProducts];
    return [
      ...producingProducts?.filter(
        (order) =>
          order?.product_name
            .toLocaleLowerCase("tr")
            .startsWith(search.toLocaleLowerCase("tr")) ||
          order?.order_number.startsWith(search) ||
          order?.customer?.companyname
            .toLocaleLowerCase("tr")
            .startsWith(search.toLocaleLowerCase("tr"))
      ),
    ];
  }, [producingProducts, search]);

  const sortedOrders = useMemo(() => {
    const _searchOrders = [...searchedOrders];

    switch (sorter) {
      case "date_old_to_new":
        return [..._searchOrders.sort((a, b) => a.order_id - b.order_id)];
      case "date_new_to_old":
        return [..._searchOrders.sort((a, b) => b.order_id - a.order_id)];
      default:
        return [..._searchOrders];
    }
  }, [searchedOrders, sorter]);

  useEffect(() => {
    setSearch("");
    setSorter("suggested");

    return () => {
      setSearch("");
      setSorter("suggested");
    };
  }, []);
   console.log("sortedOrders",sortedOrders)

  return (
    <>
      {page === "currentlyProducings" && sortedOrders.length > 0 ? (
        <>
          <Row>
            {sortedOrders.map((order, index) => (
              <Order key={index} order={order} />
            ))}
          </Row>
        </>
      ) : (
        <>
          <Col variant="full" className={"flex justify-center items-center"}>
            Üretimde henüz ürün yok
          </Col>
        </>
      )}
    </>
  );
};

export default CurrentlyProducings;
