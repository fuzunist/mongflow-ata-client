import Card from "@/components/Card";
import Col from "@/components/Col";
import { delOrderFromDB } from "@/services/order";
import { useUser } from "@/store/hooks/user";
import { delOrder } from "@/store/actions/apps";
import { TrashIcon, ClipboardEditIcon } from "lucide-react";
import Modal from "@/components/Modal";
import ChangeOrderStatus from "@/modals/ChangeOrderStatus";
import OrderStatus from "@/constants/OrderStatus";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { useExpenses, useExchangeRates } from "@/store/hooks/apps";
import { formatDigits } from "@/utils/helpers";
import { useState, useMemo } from "react";

const Order = ({ order }) => {
  const user = useUser();
  const expenses = useExpenses();
  const exchangeRates = useExchangeRates();
  console.log(exchangeRates);

  const { t } = useTranslation();

  const onDelete = async () => {
    const response = await delOrderFromDB(
      user.tokens.access_token,
      order.order_id
    );
    if (response?.error) console.log(response.error);
    delOrder(order.order_id);
  };

  const excludedCosts = [
    "domestic_market_marketing",
    "foreign_market_marketing",
    "production_manager",
  ];

  const TLtoUSD = parseFloat(
    exchangeRates?.find((exchangeRate) => exchangeRate.currency_code === "USD")
      ?.banknote_selling
  );

  const hourlyExpenseCost = expenses[0]?.hourly_cost / TLtoUSD;

  const totalProductQuantity = useMemo(() => {
    if (!order || !order.products) return 0;

    return order.products.reduce((total, product) => {
      return total + (product.quantity || 0);
    }, 0);
  }, [order]);

  return (
    <Col variant="full">
      <Card classo="min-w-[643px]">
        <Card.Body classo="min-w-[643px]">
          <div className="flex flex-col gap-2  overflow-x-scroll">
            <div className="absolute right-0 top-0 flex gap-2 justify-center items-center rounded  text-text-dark-dark cursor-pointer select-none">
              <Link
                className="bg-purple hover:bg-purple-hover rounded p-1.5"
                to={`/apps/orders/${order.order_number}`}
              >
                <ClipboardEditIcon size={18} strokeWidth={2.5} />
              </Link>
              <div
                className="bg-alert-danger-fg-dark hover:bg-alert-danger-fg-light rounded p-1.5"
                onClick={onDelete}
              >
                <TrashIcon size={18} strokeWidth={2.5} />
              </div>
            </div>
            <div className="flex flex-col gap-1 text-black dark:text-white">
              <h4 className="text-2xl font-bold">
                <span className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                  {order?.customer?.companyname}
                </span>{" "}
                -{" "}
                <span
                  className={classNames({
                    "text-red-500": order.order_status === "İş Alındı",
                    "text-green-600": order.order_status === "İş Tamamen Bitti",
                    "text-yellow-400":
                      order.order_status !== "İş Alındı" &&
                      order.order_status !== "İş Tamamen Bitti",
                  })}
                >
                  {t(order.order_status)}
                </span>
              </h4>
              <h5>({order.order_number})</h5>
              {order.status === 0 && (
                <span className="text-lg italic text-end">
                  <span className="font-semibold">{t("approver")}</span>:{" "}
                  {order.approver}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 justify-center border border-border-light dark:border-border-dark relative p-4 mt-4 mb-2">
              <span className="absolute -top-[8.1px] left-2 bg-card-bg-light dark:bg-card-bg-dark leading-none text-lg font-semibold w-min max-w-[calc(100%_-_16px)] overflow-hidden text-ellipsis whitespace-nowrap">
                {t("products")}
              </span>
              <div className="flex flex-wrap text-center font-medium">
                <span
                  className={`basis-[calc(30%_-_0.5rem)] mx-1 text-left ${
                    excludedCosts.includes(user.usertype)
                      ? "basis-[calc(52%_-_0.5rem)]"
                      : "basis-[calc(22%_-_0.5rem)]"
                  }`}
                >
                  {t("product")}
                </span>
                <span className="basis-[calc(10%_-_0.5rem)] mx-1">
                  {t("quantity")}
                </span>
                {!excludedCosts.includes(user.usertype) && (
                  <span className="basis-[calc(10%_-_0.5rem)] mx-1">
                    {t("recipeCost")}
                  </span>
                )}
                <span className="basis-[calc(10%_-_0.5rem)] mx-1">
                  {t("unitPrice")}
                </span>
                {!excludedCosts.includes(user.usertype) && (
                  <span className="basis-[calc(10%_-_0.5rem)] mx-1">
                    {t("totalRecipeCost")}
                  </span>
                )}
                <span className="basis-[calc(10%_-_0.5rem)] mx-1">
                  {t("totalPrice")}
                </span>
                <span className="basis-[calc(12%_-_0.5rem)] mx-1">
                  {t("orderStatus")}
                </span>
              </div>
              <hr className="border-border-light dark:border-border-dark" />
              {order?.products?.map((product, index) => {
                return (
                  <div className="flex flex-wrap items-start mt-2" key={index}>
                    <span
                      className={`basis-[calc(30%_-_0.5rem)] mx-1 overflow-x-auto whitespace-nowrap scroller flex flex-col gap-0.5 -mt-2 ${
                        excludedCosts.includes(user.usertype)
                          ? "basis-[calc(52%_-_0.5rem)]"
                          : "basis-[calc(22%_-_0.5rem)]"
                      }`}
                    >
                      <span>{product.product_name}</span>
                      <span className="text-sm">
                        {Object.entries(product.attributes)
                          .map(([key, value]) => `${key}: ${value}`)
                          .join(", ")}
                      </span>
                    </span>
                    <span className="basis-[calc(10%_-_0.5rem)] mx-1 text-center">
                      {product.quantity} {product.productType}
                    </span>
                    {!excludedCosts.includes(user.usertype) && (
                      <span className="basis-[calc(10%_-_0.5rem)] mx-1 text-center">
                        {/* bunker cinsinde ton cinsine çevrildi şimdilik */}
                        {formatDigits(
                          (product.totalCost * 0.4444) /
                            (product.quantity / 1000) // product.quantity kg -> ton cinsine çevirdim
                        )}{" "}
                        {/* {formatDigits(product.unitCost)} {order?.currency_code} */}
                      </span>
                    )}
                    <span className="basis-[calc(10%_-_0.5rem)] mx-1 text-center">
                      {formatDigits(product.unitPrice)} {order?.currency_code}
                    </span>
                    {!excludedCosts.includes(user.usertype) && (
                      <span className="basis-[calc(10%_-_0.5rem)] mx-1 text-center">
                        {/* //ton cinsinden maliyet -- bunker to ton */}
                        {formatDigits(product.totalCost * 0.4444)}{" "}
                        {order?.currency_code}
                      </span>
                    )}
                    <span className="basis-[calc(10%_-_0.5rem)] mx-1 text-center">
                      {formatDigits(product.totalPrice)} {order?.currency_code}
                    </span>

                    <div className="basis-[calc(12%_-_0.5rem)] mx-1 flex flex-col gap-0.5 text-sm min-h-[1rem] justify-center items-center">
                      {product?.orderStatus ? (
                        product?.orderStatus?.map((status, index) => {
                          console.log(status?.quantity);
                          if (
                            status?.quantity !== 0 &&
                            status?.quantity !== undefined
                          ) {
                            return (
                              <span key={index + 100}>
                                {status?.quantity} {product?.productType}{" "}
                                {t(status?.type)}.
                              </span>
                            );
                          } else {
                            return "";
                          }
                        })
                      ) : (
                        <span>
                          {product?.quantity} {product?.productType}{" "}
                          {t(OrderStatus[0])}.
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
              {order?.sets?.map((set, index) => (
                <div className="flex flex-wrap items-center" key={index}>
                  <span className="basis-[calc(35%_-_0.5rem)] mx-1 overflow-x-auto whitespace-nowrap scroller flex flex-col gap-0.5">
                    <span>{set.set_name}</span>
                    <div className="flex flex-col text-sm">
                      {set.products.map((product, productIndex) => (
                        <div key={productIndex}>
                          {product.product_name} x{product.quantity} (
                          {product.productType}){" ==> "}
                          {Object.entries(product.attributes)
                            .map(([key, value]) => `${key}: ${value}`)
                            .join(", ")}
                        </div>
                      ))}
                    </div>
                  </span>
                  <span className="basis-[calc(10%_-_0.5rem)] mx-1 text-center">
                    {set.quantity} ({set.productType})
                  </span>
                  <span className="basis-[calc(12%_-_0.5rem)] mx-1 text-center">
                    {set.unitPrice} {order?.currency_code}
                  </span>
                  <span className="basis-[calc(12%_-_0.5rem)] mx-1 text-center">
                    {set.totalPrice} {order?.currency_code}
                  </span>
                  {user.usertype === "stock_manager" ||
                  user.usertype === "boss" ? (
                    <Modal
                      className="basis-[calc(12%_-_0.5rem)] mx-1 flex flex-col gap-0.5 min-h-[1rem]"
                      text={
                        set?.orderStatus ? (
                          set?.orderStatus?.map((status, index) => (
                            <span key={index + 500}>
                              {status?.quantity} {t("pieces").toLowerCase()},{" "}
                              {t(status.type)}.
                            </span>
                          ))
                        ) : (
                          <span>
                            {set?.quantity} {t("pieces").toLowerCase()},{" "}
                            {t(OrderStatus[0])}.
                          </span>
                        )
                      }
                    >
                      {({ close }) => (
                        <ChangeOrderStatus
                          closeModal={close}
                          order={order}
                          set={set}
                          index={index}
                          access_token={user.tokens.access_token}
                        />
                      )}
                    </Modal>
                  ) : (
                    <div className="basis-[calc(31%_-_0.5rem)] mx-1 flex flex-col gap-0.5  min-h-[1rem] justify-center items-center">
                      {set?.orderStatus ? (
                        set?.orderStatus?.map((status, index) => (
                          <span key={index + 600}>
                            {status?.quantity} {t("pieces").toLowerCase()},{" "}
                            {t(status?.type)}.
                          </span>
                        ))
                      ) : (
                        <span>
                          {set?.quantity} {t("pieces").toLowerCase()},{" "}
                          {t(OrderStatus[0])}.
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {!excludedCosts.includes(user.usertype) && (
              <span className="text-right px-4">
                {t("totalRecipeCost")}:{" "}
                {formatDigits(parseFloat(order.total_cost))}{" "}
                {order.currency_code}
              </span>
            )}
            {!excludedCosts.includes(user.usertype) && (
              <span className="text-right px-4">
                {t("totalCost")}:
                {/* 0.6 sabit 1 ton ürün için harcanan süre, order.totalCost top reçete maliyeti */}
                {formatDigits(
                  Number(order.total_cost) !== 0
                    ? hourlyExpenseCost * 0.6 * (totalProductQuantity / 1000) + // totalProductQuantity kg -> ton cinsine çevirdim
                        Number(order.total_cost)
                    : "0"
                )}{" "}
                {order.currency_code}
              </span>
            )}
            <span className="text-right px-4">
              {t("taxed_total")}:{" "}
              {formatDigits(parseFloat(order.total_with_tax))}{" "}
              {order.currency_code}
            </span>
            {order.currency_code !== "USD" && (
              <span className="text-right px-4">
                {t("exchange_rate")}: {order.exchange_rate} USD
              </span>
            )}
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Order;
