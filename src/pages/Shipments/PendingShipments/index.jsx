import { useOrders, useSearch, useSorter } from "@/store/hooks/apps";
import { useUser } from "@/store/hooks/user";
import React, { useMemo, useEffect } from "react";
import Products from "./Products";
import { setFilter, setSearch, setSorter } from "@/store/actions/apps";

const PendingShipments = () => {
  const orders = useOrders();
  const search = useSearch();
  const sorter = useSorter();
  const user = useUser();

  const productsToShip = useMemo(() => {
    if (!user.userid || !orders.length) return [];

    const updatedOrders = orders
      .filter((order) => order.status.length === 4)
      .flatMap((order) => {
        const updatedProducts = order.products.flatMap((product) => {
          return product.orderStatus
            .map((status) => {

              if (status && status.type === "Sevk Bekliyor" && status.ship_quantity !== 0) {
                // Merge product properties with order properties and omit 'products'
                const { products, ...merged } = order;
                return { ...merged, ...product, shipment: status.ship_quantity };
              }
              return null;
            })
            .filter(Boolean);
        });

        return updatedProducts.length === 0 ? [] : updatedProducts;
      });

    return updatedOrders;
  }, [user, orders]);

  const searchedOrders = useMemo(() => {
    if (!search) return [...productsToShip];
    return [
      ...productsToShip?.filter(
        (order) =>
          order?.product_name
            .toLocaleLowerCase("TR")
            .includes(search.toLocaleLowerCase("TR")) ||
          order?.order_number.includes(search) ||
          order?.customer?.companyname
            .toLocaleLowerCase("TR")
            .includes(search.toLocaleLowerCase("TR"))
      ),
    ];
  }, [productsToShip, search]);

  const sortedOrders = useMemo(() => {
    const _searchOrders = [...searchedOrders];

    switch (sorter) {
      case "date_old_to_new":
        return [
          ..._searchOrders.sort((a, b) => {
            // Convert DD/MM/YYYY to YYYY/MM/DD for comparison
            const dateA = a.delivery_date.split("/").reverse().join("/");
            const dateB = b.delivery_date.split("/").reverse().join("/");
            return new Date(dateA) - new Date(dateB);
          }),
        ];
      case "date_new_to_old":
        return [
          ..._searchOrders.sort((a, b) => {
            // Convert DD/MM/YYYY to YYYY/MM/DD for comparison
            const dateA = a.delivery_date.split("/").reverse().join("/");
            const dateB = b.delivery_date.split("/").reverse().join("/");
            return new Date(dateB) - new Date(dateA);
          }),
        ];
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

  console.log("searchedOrders shipments", searchedOrders);
  return (
    <>
      <div className="mb-2 ml-2">
        <button className="bg-purple hover:bg-purple-hover text-white rounded-full py-1 px-4">
          Sevke başla
        </button>
      </div>

      <Products products={sortedOrders} />
    </>
  );
};

export default PendingShipments;
