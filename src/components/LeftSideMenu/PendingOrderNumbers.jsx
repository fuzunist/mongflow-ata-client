import { useOrders } from "@/store/hooks/apps";
import { useUser } from "@/store/hooks/user";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

const PendingOrderNumbers = () => {
  const user = useUser();
  const orders = useOrders();
  const { t } = useTranslation();

  const myRecipePendingOrders = useMemo(() => {
    if (!user.userid) return [];
    if (!orders.length) return [];
    return orders.filter(
      (order) => order.userid === user.userid && order.status.length === 2
    );
  }, [user, orders]);

  const myBossPendingOrders = useMemo(() => {
    if (!user.userid) return [];
    if (!orders.length) return [];
    return orders.filter(
      (order) => order.userid === user.userid && order.status.length === 3
    );
  }, [user, orders]);

  const myProductionPendingOrders = useMemo(() => {
    if (!user.userid) return [];
    if (!orders.length) return [];
    return orders.filter(
      (order) => order.userid === user.userid && order.status.length === 5
    );
  }, [user, orders]);

  if (
    myRecipePendingOrders.length === 0 &&
    myBossPendingOrders.length === 0 &&
    myProductionPendingOrders.length === 0
  )
    return null;

  return (
    <div className="mt-4 -mb-4 flex flex-col justify-center items-center">
      <div className= "flex flex-col justify-start text-alert-danger-fg-light dark:text-alert-danger-fg-dark text-sm font-semibold text-center px-4">
        <span>{t("recipePendingOrderNumber", {
          number: myRecipePendingOrders.length,
        })}</span>
       <span> {t("bossPendingOrderNumber", { number: myBossPendingOrders.length })}</span>
        <span>{t("productionPendingOrderNumber", {
          number: myBossPendingOrders.length,
        })}</span>
      </div>
    </div>
  );
};

export default PendingOrderNumbers;
