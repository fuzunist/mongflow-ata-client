import Card from "@/components/Card";
import Col from "@/components/Col";
import { useUser } from "@/store/hooks/user";
import Modal from "@/components/Modal";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { useExpenses, useExchangeRates } from "@/store/hooks/apps";

import OrderRecipeDetails from "@/modals/OrderRecipeDetails";
import SendToProduction from "@/modals/SendToProduction";
import CompleteProduction from "@/modals/CompleteProduction";
import ShipProduction from "@/modals/ShipProduction";

const Order = ({ order }) => {
  const { t } = useTranslation();
  console.log("order", order);

  return (
    <Col variant="full">
      <Card>
        <Card.Body>
          <div className="flex flex-col gap-2 overflow-x-scroll">
            <div className="flex flex-col gap-1 text-black dark:text-white">
              <h4 className="text-2xl font-bold">
                <span className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                  {order?.customer?.companyname}
                </span>{" "}
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
              <span className="absolute -top-4 left-2 py-2 px-2 bg-card-bg-light dark:bg-card-bg-dark leading-none text-lg font-semibold w-min max-w-[calc(100%_-_16px)] overflow-hidden text-ellipsis whitespace-nowrap">
                {t("products")}
              </span>
              <div className="flex flex-wrap text-center font-medium">
                <span className={` mx-1 text-left basis-[calc(25%_-_0.5rem)]`}>
                  {t("product")}
                </span>
                <span className="basis-[calc(16%_-_0.5rem)] mx-1">
                  {t("completeProducedQuantity")}
                </span>

                <span className="basis-[calc(16%_-_0.5rem)] mx-1">
                  {t("primaryrecipe")}
                </span>
                <span className="basis-[calc(16%_-_0.5rem)] mx-1">
                  {t("productionrecipe")}
                </span>
                <span className="basis-[calc(16%_-_0.5rem)] mx-1">
                  {"Sevk Et"}
                </span>
              </div>
              <hr className="border-border-light dark:border-border-dark" />
              {order?.products?.map((product, index) => {
                return (
                  <div className="flex flex-wrap items-start mt-2" key={index}>
                    <span
                      className={`basis-[calc(25%_-_0.5rem)] mx-1 overflow-x-auto whitespace-nowrap scroller flex flex-col gap-0.5 -mt-2`}
                    >
                      <span>{product.product_name}</span>
                      <span className="text-sm">
                        {Object.entries(product?.attributes)
                          .map(([key, value]) => `${key}: ${value}`)
                          .join(", ")}
                      </span>
                    </span>
                    <span className="basis-[calc(16%_-_0.5rem)] mx-1 text-center">
                      {product.production.quantity} {product.productType}
                    </span>
                    {/*  */}
                    <span className="basis-[calc(16%_-_0.5rem)] mx-1 text-center">
                      <Modal
                        className={`text-white text-xs md:text-sm rounded-full py-2 px-2  bg-purple `}
                        text={"Reçete Detayı"}
                        width="40"
                      >
                        <OrderRecipeDetails
                          order_id={order.order_id}
                          recipe_id={product.recipe_id}
                        />
                      </Modal>
                    </span>
                    <span className="basis-[calc(16%_-_0.5rem)] mx-1 text-center">
                      <Modal
                        className={`text-white text-xs md:text-sm rounded-full py-2 px-2  bg-purple `}
                        text={"Reçete Detayı"}
                        width="40"
                      >
                        {console.log(
                          "recipe_id={product.production.recipe_id}",
                          product.production.recipe_id
                        )}
                        <OrderRecipeDetails
                          order_id={order.order_id}
                          recipe_id={product?.production?.recipe_id}
                          production={true}
                        />
                      </Modal>
                    </span>
                    <span className="basis-[calc(16%_-_0.5rem)] mx-1 text-center">
                      <Modal
                        className={`text-white text-xs md:text-sm rounded-full py-2 px-2  gap-2 bg-yellow-500 hover:bg-yellow-700 `}
                        text={"Sevk Başlat"}
                      >
                        {({ close }) => (
                          <ShipProduction
                            order_id={order.order_id}
                            production_recipe_id={product.production.recipe_id}
                            product={product}
                            closeModal={close}
                          />
                        )}
                      </Modal>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Order;
