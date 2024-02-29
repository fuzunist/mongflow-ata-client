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

import OrderRecipeDetails from "@/modals/OrderRecipeDetails";
import SendToProduction from "@/modals/SendToProduction";

const Order = ({ order, checkedRecipes, setCheckedRecipes }) => {
  const user = useUser();
  const expenses = useExpenses();
  const exchangeRates = useExchangeRates();
  const { t } = useTranslation();

  //   const [checkedRecipes, setCheckedRecipes] = useState([]);

  const handleCheckboxChange = (recipeId) => {
    if (checkedRecipes.includes(recipeId)) {
      setCheckedRecipes(checkedRecipes.filter((id) => id !== recipeId));
    } else {
      setCheckedRecipes([...checkedRecipes, recipeId]);
    }
  };

  console.log("checkedRecipes", checkedRecipes);

  //   const onDelete = async () => {
  //     const response = await delOrderFromDB(
  //       user.tokens.access_token,
  //       order.order_id
  //     );
  //     if (response?.error) console.log(response.error);
  //     delOrder(order.order_id);
  //   };

  //   const excludedCosts = [
  //     "domestic_market_marketing",
  //     "foreign_market_marketing",
  //     "production_manager",
  //   ];

  //   const totalProductQuantity = useMemo(() => {
  //     if (!order || !order.products) return 0;

  //     return order.products.reduce((total, product) => {
  //       return total + (product.quantity || 0);
  //     }, 0);
  //   }, [order]);

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
              <span className="absolute -top-4 left-2 py-2 px-2 bg-card-bg-light dark:bg-card-bg-dark leading-none text-lg font-semibold w-min max-w-[calc(100%_-_16px)] overflow-hidden text-ellipsis whitespace-nowrap">
                {t("products")}
              </span>
              <div className="flex flex-wrap text-center font-medium">
                <span className={` mx-1 text-left basis-[calc(25%_-_0.5rem)]`}>
                  {t("product")}
                </span>
                <span className="basis-[calc(18%_-_0.5rem)] mx-1">
                  {t("producedQuantity")}
                </span>

                {/* <span className="basis-[calc(15%_-_0.5rem)] mx-1">
                  {t("orderStatus")}
                </span> */}
                <span className="basis-[calc(18%_-_0.5rem)] mx-1">
                  {t("recipe")}
                </span>
                <span className="basis-[calc(18%_-_0.5rem)] mx-1">
                  {t("sendToProduction")}
                </span>
                <span className="basis-[calc(18%_-_0.5rem)] mx-1">
                  {t("mergeProduction")}
                </span>
              </div>
              <hr className="border-border-light dark:border-border-dark" />
              {order?.products?.map((product, index) => {
                return (
                  <div className="flex flex-wrap items-start mt-2" key={index}>
                    <span
                      className={`basis-[calc(25%_-_0.5rem)] mx-1 overflow-x-auto whitespace-nowrap scroller flex flex-col gap-0.5 -mt-2`}
                      // ${
                      //     excludedCosts.includes(user.usertype)
                      //       ? "basis-[calc(52%_-_0.5rem)]"
                      //       : "basis-[calc(22%_-_0.5rem)]"
                      //   }`}
                    >
                      <span>{product.product_name}</span>
                      <span className="text-sm">
                        {Object.entries(product.attributes)
                          .map(([key, value]) => `${key}: ${value}`)
                          .join(", ")}
                      </span>
                    </span>
                    <span className="basis-[calc(18%_-_0.5rem)] mx-1 text-center">
                      {product.quantity} {product.productType}
                    </span>
{/*  */}
                    <span className="basis-[calc(18%_-_0.5rem)] mx-1 text-center">
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
                    <span className="basis-[calc(18%_-_0.5rem)] mx-1 text-center">
                        { console.log("incc::",checkedRecipes.includes(product.recipe_id))}
                      <Modal
                        className={`text-white text-xs md:text-sm rounded-full py-2 px-2  gap-2 bg-yellow-500 hover:bg-yellow-700 `}
                        //  ${
                        //   checkedRecipes?.length < 2
                        //     ? "bg-yellow-500 hover:bg-yellow-700"
                        //     : checkedRecipes.includes(product.recipe_id) ?
                        //       "bg-orange-500" : "bg-yellow-500 hover:bg-yellow-700"
                        // } 
                        
                        
                        text={
                        //   checkedRecipes?.length < 2
                        //     ? t("moveToProduction")
                        //     : checkedRecipes.includes(product.recipe_id) ?
                        //       t("sendSelectedToProduction") : 
                              t("moveToProduction")
                        }
                      >
                        {({ close }) => (
                          <SendToProduction
                            order_id={order.order_id}
                            recipe_id={product.recipe_id}
                            product={product}
                            closeModal={close}
                            checkedRecipes={checkedRecipes}
                            // isFilled={recipe}
                          />
                        )}
                      </Modal>
                    </span>
                    <span className="basis-[calc(18%_-_0.5rem)] mx-1 text-center">
                      <input
                        type="checkbox"
                        name={product.recipe_id}
                        id={product.recipe_id}
                        value={product.recipe_id}
                        onChange={() => handleCheckboxChange(product.recipe_id)}
                      />
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
