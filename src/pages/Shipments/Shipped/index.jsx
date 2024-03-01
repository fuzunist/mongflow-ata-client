import { useOrders, useSearch } from "@/store/hooks/apps";
import { useUser } from "@/store/hooks/user";
import React, { useMemo } from "react";
import Products from "../PendingShipments/Products";

const Shipped = () => {
  const orders = useOrders();
  const search = useSearch();
  const user = useUser();

  const productsToShip = useMemo(() => {
    if (!user.userid || !orders.length) return [];

    const updatedOrders = orders
      .filter((order) => order.status.length === 5)
      .map((order) => {
        const updatedProducts = order.products.flatMap((product) => {
          return product.orderStatus
            .map((status) => {
              if (
                status &&
                status?.type === "Sevk Edildi" &&
                status.quantity !== 0
              ) {
                return { ...product, shipped: status.quantity };
              }
              return null;
            })
            .filter(Boolean);
        });

        return {
          ...order,
          products: updatedProducts,
        };
      })
      .filter((order) => order.products.length !== 0);

    return updatedOrders;
  }, [user, orders]);

  const searchedOrders = useMemo(() => {
    if (!search) return [...productsToShip];
    return [
      ...productsToShip?.filter(
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
  }, [productsToShip, search]);

  console.log("searchedOrders shipments", searchedOrders);
  return (
    <>
      <Products products={searchedOrders} />
    </>
  );
};

export default Shipped;
