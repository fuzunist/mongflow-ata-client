import { useTranslation } from "react-i18next";
import { formatFloat, formatDigits } from "@/utils/helpers";
import Card from "@/components/Card";
import Col from "@/components/Col";

const Order = ({ closeModal, order }) => {
  const { t } = useTranslation();
  return (
    <Col variant="full">
      <Card>
        <Card.Body>
          <div className="flex flex-col gap-4 mb-4 overflow-x-scroll ">
            <input className="w-0 h-0 absolute top-0 left-0" />
            <div className="flex justify-between">
              <div className="flex-1 flex flex-col gap-2">
                <span>
                  <span className="font-semibold">{t("customername")}:</span>{" "}
                  {order.customer.customername}
                </span>
                <span>
                  <span className="font-semibold">{t("companyname")}:</span>{" "}
                  {order.customer.companyname}
                </span>
                <span>
                  <span className="font-semibold">{t("phone")}:</span>{" "}
                  {order.customer.phone}
                </span>
                <span>
                  <span className="font-semibold">{t("email")}:</span>{" "}
                  {order.customer.email}
                </span>
              </div>
              <div className="flex-1 flex flex-col gap-2 items-end">
                <span>
                  <span className="font-semibold">{t("constituent")}:</span>{" "}
                  {order.username}
                </span>
                <span>
                  <span className="font-semibold">
                    {t("order_creation_date")}:
                  </span>{" "}
                  {order.order_date.split("T")[0]}
                </span>
                <span>
                  <span className="font-semibold">{t("order_status")}:</span>{" "}
                  {t(order.order_status)}
                </span>
                <span>
                  <span className="font-semibold">{t("order_number")}:</span>{" "}
                  {order.order_number}
                </span>
              </div>
            </div>
            <hr className="w-full border-border-light dark:border-border-dark" />
            <div className="flex flex-wrap text-center font-semibold">
              <span className="basis-[calc(20%_-_0.5rem)] mx-1 px-2">
                {t("product")}
              </span>
              <span className="basis-[calc(15%_-_0.5rem)] mx-1 px-2">
                {t("attributes")}
              </span>
              <span className="basis-[calc(10%_-_0.5rem)] mx-1 px-2">
                {t("unit")}
              </span>
              <span className="basis-[calc(10%_-_0.5rem)] mx-1 px-2">
                {t("unitCost")}
              </span>
              <span className="basis-[calc(10%_-_0.5rem)] mx-1 px-2">
                {t("unitPrice")}
              </span>
              <span className="basis-[calc(15%_-_0.5rem)] mx-1 px-2">
                {t("totalCost")}
              </span>
              <span className="basis-[calc(20%_-_0.5rem)] mx-1 px-2">
                {t("total")}
              </span>
            </div>
            <hr className="w-full border-border-light dark:border-border-dark" />
            <div className="flex flex-col gap-2">
              {order.products.map((product, index) => (
                <div
                  className="flex flex-wrap text-center items-center"
                  key={index}
                >
                  <span className="basis-[calc(20%_-_0.5rem)] mx-1 px-2">
                    {product.product_name}
                  </span>
                  <span className="basis-[calc(15%_-_0.5rem)] mx-1 px-2 flex flex-col text-sm">
                    {Object.entries(product.attributes).map(
                      ([attrName, attrValue], index) => (
                        <span key={index}>
                          {attrName}: {attrValue}
                        </span>
                      )
                    )}
                  </span>
                  <span className="basis-[calc(10%_-_0.5rem)] mx-1 px-2">
                    {product.quantity} {t(product.productType)}
                  </span>
                  <span className="basis-[calc(10%_-_0.5rem)] mx-1 px-2">
                    {formatDigits(product.unitCost)}
                  </span>
                  <span className="basis-[calc(10%_-_0.5rem)] mx-1 px-2">
                    {formatDigits(product.unitPrice)}
                  </span>
                  <span className="basis-[calc(15%_-_0.5rem)] mx-1 px-2">
                    {formatDigits(product.totalCost)}
                  </span>
                  <span className="basis-[calc(20%_-_0.5rem)] mx-1 px-2">
                    {formatDigits(product.totalPrice)}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              <div className="flex flex-wrap justify-end text-center">
                <div className="basis-[calc(24%_-_0.5rem)] mx-1 px-2">
                  <span>
                    <span className="font-semibold">{t("amount")}:</span>{" "}
                    {order.subtotal}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap justify-end text-center">
                <div className="basis-[calc(24%_-_0.5rem)] mx-1 px-2">
                  <span>
                    <span className="font-semibold">{t("vat")}:</span> %20
                  </span>
                </div>
              </div>
            </div>
            <hr className="w-full border-border-light dark:border-border-dark" />
            <div className="flex flex-wrap justify-end text-center">
              <div className="basis-[calc(24%_-_0.5rem)] mx-1 px-2">
                <span className="font-semibold text-2xl">
                  {order.currency_code} {formatDigits(order.total_with_tax)}
                </span>
              </div>
            </div>
            {order.currency_code !== "TL" && (
              <div className="flex flex-wrap justify-end text-center">
                <div className="basis-[calc(24%_-_0.5rem)] mx-1 px-2">
                  <span className="font-semibold text-lg leading-none">
                    {t("exchange_rate")}: {order.exchange_rate}
                  </span>
                </div>
              </div>
            )}
            <hr className="w-full border-border-light dark:border-border-dark" />
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Order;
