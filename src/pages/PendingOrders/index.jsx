import Row from "@/components/Row";
import Order from "./Order";
import { useOrders, useSearch } from "@/store/hooks/apps";
import { useMemo } from "react";
import Header from "./Header";
import { useEffect } from "react";
import { setSearch } from "@/store/actions/apps";
import { useTranslation } from "react-i18next";
import { useUser } from "@/store/hooks/user";

const PendingOrders = () => {
  const { t } = useTranslation();
  const orders = useOrders();
  const search = useSearch();
  const user = useUser();

  const filteredOrders = useMemo(() => {
    if (user.usertype === "admin" || user.usertype === "boss" || user.usertype === "stock_manager")
      return orders.filter((order) => order.status === 5); // patron sadece 1leri görecek onaylayınca sıfır olacak
    if (user.usertype === "domestic_market_manager")
      return orders.filter((order) => order.status === 2); // üretim müdürü 2 ve 3 leri görecek, onaylayınca 1 olacak
    if (user.usertype === "foreign_market_manager")
      return orders.filter((order) => order.status === 3);
      if (user.usertype === "production_manager")
      return orders.filter((order) => order.status !== (5 || 0));
  }, [orders, user]);

  const searchedOrders = useMemo(() => {
    if (!search) return filteredOrders;
    return filteredOrders.filter(
      (order) =>
        order.order_number.startsWith(search) ||
        order.customer.companyname
          .toLocaleLowerCase("tr")
          .startsWith(search.toLocaleLowerCase("tr"))
    );
  }, [filteredOrders, search]);

  useEffect(() => {
    setSearch("");

    return () => {
      setSearch("");
    };
  }, []);

  return (
    <>
      <Header />
      <Row>
        {searchedOrders.length === 0 && (
          <div className="py-2 text-center rounded bg-red-400 text-white w-full text-lg font-semibold">
            {t("order not found.")}
          </div>
        )}
        {searchedOrders.map((order, index) => (
          <Order key={index} order={order} />
        ))}
      </Row>
    </>
  );
};

export default PendingOrders;
