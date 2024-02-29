import { useOrders } from "@/store/hooks/apps";
import { useUser } from "@/store/hooks/user";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

const PendingOrderNumbers = () => {
  const user = useUser();
  const orders = useOrders();
  const { t } = useTranslation();

  const allRecipePendingOrders = useMemo(() => {
    if (!user.userid) return [];
    if (!orders.length) return [];
    return orders.filter(
      (order) => order.status.length === 2
    );
  }, [user, orders]);

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
      (order) => order.userid === user.userid &&  order.status.length === 5
    );
  }, [user, orders]);

  if (
    myRecipePendingOrders.length === 0 &&
    myBossPendingOrders.length === 0 &&
    myProductionPendingOrders.length === 0 &&
    allRecipePendingOrders.length === 0
  )
    return null;

  return (
    <div className="mt-4 -mb-4 flex flex-col justify-center items-center">
      <div className="flex flex-col justify-start text-alert-danger-fg-light dark:text-alert-danger-fg-dark text-sm font-semibold text-center px-4">
        {myRecipePendingOrders.length!==0 && (
          <span>
            {t("recipePendingOrderNumber", {
              number: myRecipePendingOrders.length,
            })}
          </span>
        )}

        {myBossPendingOrders.length!==0 && (
          <span>
            {" "}
            {t("bossPendingOrderNumber", {
              number: myBossPendingOrders.length,
            })}
          </span>
        )}
        {myProductionPendingOrders.length!==0 && (
          <span>
            {t("productionPendingOrderNumber", {
              number: myProductionPendingOrders.length,
            })}
          </span>
        )} 
        
         {allRecipePendingOrders.length!==0 && user.usertype==="production_manager" && (
          <span>
     {t("allRecipePendingOrders", {
              number: allRecipePendingOrders.length,
            })}
          </span>
        )}
      </div>
    </div>
  );
};

export default PendingOrderNumbers;
