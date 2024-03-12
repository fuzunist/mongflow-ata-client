import Row from "@/components/Row";
import Col from "@/components/Col";

// No need for Header as you mentioned you don't want it for orders.
import Order from "./Order"; // Importing the Order component instead of Product
import { useFilter, useOrders, useSearch, useSorter } from "@/store/hooks/apps"; // Assuming you have a similar hook for orders
import { useMemo } from "react";
import { useUser } from "@/store/hooks/user";
import { useEffect } from "react";
import { setFilter, setSearch, setSorter } from "@/store/actions/apps";
import { useTranslation } from "react-i18next";

import { useState } from "react";

const AllOrders = ({page,setPage}) => {
  const user = useUser();
  const orders = useOrders();
  const search = useSearch();

  const sorter = useSorter();
  const { t } = useTranslation();



  //Siparişlerden onaylı olanlar
  const allApprovedOrders = useMemo(() => {
    if (!user.userid || !orders.length) return [];
  
    const filteredOrders = orders
      .filter(order => order.status.length >= 4)
      .map(order => {
        const updatedProducts = order.products.map(product => {
          const mergedProducts = {};
  
          product.orderStatus.forEach(status => {
            if (status === null) return;
  
            const { type, quantity } = status;
  
            if (mergedProducts[type]) {
              mergedProducts[type] += quantity;
            } else {
              mergedProducts[type] = quantity;
            }
          });
  
          const mergedArray = Object.keys(mergedProducts).map(type => ({
            type,
            quantity: mergedProducts[type]
          }));
  
          return { ...product, orderStatus: mergedArray };
        });
  
        return { ...order, products: updatedProducts };
      });
  
    console.log("filteredOrders", filteredOrders);
  
    return filteredOrders;
  }, [user, orders]);
  

  const searchedOrders = useMemo(() => {
    if (!search) return [...allApprovedOrders];
    return [
      ...allApprovedOrders?.filter(
        (order) =>
          order?.products.some((product) =>
            product?.product_name
              .toLocaleLowerCase("tr")
              .startsWith(search.toLocaleLowerCase("tr"))
          ) ||
          order?.order_number.startsWith(search) ||
          order?.customer?.companyname
            .toLocaleLowerCase("tr")
            .startsWith(search.toLocaleLowerCase("tr"))
      )
   
    ];
  }, [allApprovedOrders, search]);

  const sortedOrders = useMemo(() => {
    const _searchOrders = [...searchedOrders];

    switch (sorter) {
      case "date_old_to_new":
        return [
         ... _searchOrders.sort((a, b) => a.order_id - b.order_id),

        ];
      case "date_new_to_old":
        return [
          ..._searchOrders.sort((a, b) => b.order_id - a.order_id),
    
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


  return (
    <>
      {/* <Header />
      <Navigation
        usertype={user.usertype}
        page={page}
        setPage={setPage}
        t={t}
        myOrders={[...allApprovedOrders[0]]}
      /> */}
      {page === "allOrders" && sortedOrders?.length > 0 ? (
        <Row>
         
            {sortedOrders.map((order, index) => (
              <Order key={index} order={order} />
            ))}
        
        </Row>
      ): (
        <>
          <Col variant="full" className={"flex justify-center items-center"}>
            Sipariş Bulunamadı!
          </Col>
        </>
      )}
    
   
    </>
  );
};

export default AllOrders;
