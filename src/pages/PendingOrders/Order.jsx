import Card from "@/components/Card";
import Col from "@/components/Col";
import { useUser } from "@/store/hooks/user";
import { useTranslation } from "react-i18next";
import { editOrder, editRecipeMaterial } from "@/store/actions/apps";
import { updateStatusInDB } from "@/services/order";
import { useRecipes } from "@/store/hooks/apps";
import Modal from "@/components/Modal";
import CreateRecipe from "@/modals/CreateRecipe";
import { useEffect, useState, useMemo } from "react";
import { formatDigits } from "@/utils/helpers";
import OrderRecipeDetails from "@/modals/OrderRecipeDetails";
import { useExpenses, useExchangeRates } from "@/store/hooks/apps";
import { updateRecipeMaterialStocksToDB } from "@/services/recipematerial";
import getProductionTime from "@/utils/getProductionTime";

const Order = ({ order }) => {
  const exchangeRates = useExchangeRates();
  const [isDisabled, setIsDisabled] = useState(true);
  const [error, setError] = useState("");

  const user = useUser();
  const { t } = useTranslation();
  const recipes = useRecipes();
  const expenses = useExpenses();
  const prodtime = getProductionTime();
  console.log("prodtime::::", prodtime);

  const sendToApprove = async () => {
    let status;
    let currentStatus = order.status;

    if (user.usertype === "production_manager") {
      status = currentStatus.concat(currentStatus[0]);
    } else if (user.usertype === "boss" || user.usertype === "stock_manager") {
      // burada stoktan düşme işlemi yapılacak
      const response = await updateRecipeMaterialStocksToDB(
        user.tokens.access_token,
        order.order_id
      );
      console.log("response of updateRecipeMaterialStocksToDB::", response);
      if (response?.error) {
        console.log(response.error);
        return setError(t(response.error));
      }
    }
    status = currentStatus.concat(currentStatus[0]);
    const response = await updateStatusInDB(
      user.tokens.access_token,
      order.order_id,
      status
    );
    if (response?.error) {
      console.log(response.error);
      return setError(response.error);
    }
    editOrder(response);
  };

  const handleDenyRecipe = async () => {
    console.log("cancelApprove");
    let status;
    let currentStatus = order.status;

    if (user.usertype === "boss" || user.usertype === "stock_manager") {
      status = currentStatus.slice(0, -1);
    }
    const response = await updateStatusInDB(
      user.tokens.access_token,
      order.order_id,
      status
    );
    if (response?.error) {
      console.log(response.error);
      return setError(response.error);
    }
    editOrder(response);
  };

  const handleDenyOrder = async () => {
    console.log("handleDenyOrder");
    let status;
    let currentStatus = order.status;

    if (user.usertype === "boss" || user.usertype === "stock_manager") {
      status = currentStatus.slice(0, -2);
    }
    const response = await updateStatusInDB(
      user.tokens.access_token,
      order.order_id,
      status
    );
    if (response?.error) {
      console.log(response.error);
      return setError(response.error);
    }
    editOrder(response);
  };

  const productLength = order.products.length;
  const recipeEntryLength = recipes.filter(
    (recipe) => recipe.order_id === order.order_id
  ).length;

  useEffect(() => {
    if (productLength === recipeEntryLength) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [productLength, recipeEntryLength]);

  const totalProductQuantity = useMemo(() => {
    if (!order || !order.products) return 0;

    return order.products.reduce((total, product) => {
      return total + (product.quantity || 0);
    }, 0);
  }, [order]);

  const TLtoUSD = parseFloat(
    exchangeRates?.find((exchangeRate) => exchangeRate.currency_code === "USD")
      ?.banknote_selling
  );

  const hourlyExpenseCost = expenses[0]?.hourly_cost / TLtoUSD;

  const excludedCosts = [
    "domestic_market_marketing",
    "foreign_market_marketing",
    "production_manager",
  ];
  return (
    <Col variant="full">
      <Card>
        <Card.Body>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <div className="flex-1 flex flex-col gap-1 text-black dark:text-white">
                <h4 className="text-2xl font-bold max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                  {order.customer.companyname}
                </h4>
                <h5>({order.order_number})</h5>
              </div>
              <div className="text-red-700">{error}</div>

              {user.usertype === "boss" ||
              user.usertype === "production_manager" ? (
                <div>
                  <button
                    className="py-2 px-4 ml-2 transition-all outline-none bg-green-600 hover:bg-green-500 text-white rounded disabled:bg-gray-400"
                    onClick={sendToApprove}
                    disabled={user.usertype === "boss" ? false : isDisabled}
                  >
                    {user.usertype === "boss"
                      ? t("approve")
                      : t("approvetoboss")}
                  </button>

                  {user.usertype === "boss" && (
                    <>
                      <button
                        className="py-2 px-4 ml-2 transition-all outline-none bg-red-600 hover:bg-red-500 text-white rounded disabled:bg-gray-400"
                        onClick={handleDenyOrder}
                      >
                        Siparişi Reddet
                      </button>
                      <button
                        className="py-2 px-4 ml-2 transition-all outline-none bg-red-600 hover:bg-red-500 text-white rounded disabled:bg-gray-400"
                        onClick={handleDenyRecipe}
                      >
                        Reçeteyi Reddet
                      </button>
                    </>
                  )}
                </div>
              ) : (
                "Reçete bekleniyor"
              )}
            </div>
            <div className="flex flex-col gap-2 border border-border-light dark:border-border-dark relative p-4 mt-4 mb-2">
              <span className="absolute -top-4 left-2 py-2 px-2 bg-card-bg-light dark:bg-card-bg-dark leading-none text-lg font-semibold w-min max-w-[calc(100%_-_16px)] overflow-hidden text-ellipsis whitespace-nowrap">
                {t("products")}
              </span>
              <div className="flex flex-wrap text-center font-medium">
                <span
                  className={` mx-1 text-left ${
                    user.usertype === "production_manager"
                      ? "basis-[calc(52%_-_0.5rem)]"
                      : "basis-[calc(22%_-_0.5rem)]"
                  }`}
                >
                  {t("product")}
                </span>
                <span className="basis-[calc(10%_-_0.5rem)] mx-1">
                  {t("quantity")}
                </span>

                {user.usertype !== "production_manager" && (
                  <>
                    <span className="basis-[calc(10%_-_0.5rem)] mx-1">
                      {/* {t("bunkerCost")} */}
                      {t("recipeCost")}
                    </span>
                    <span className="basis-[calc(10%_-_0.5rem)] mx-1">
                      {t("unitPrice")}
                    </span>
                    <span className="basis-[calc(10%_-_0.5rem)] mx-1">
                      {/* {t("totalBunkerCost")} */}
                      {t("totalRecipeCost")}
                    </span>
                    <span className="basis-[calc(10%_-_0.5rem)] mx-1">
                      {t("totalPrice")}
                    </span>
                  </>
                )}
                <span className="basis-[calc(10%_-_0.5rem)] mx-1">
                  {t("orderStatus")}
                </span>
                <span className="basis-[calc(10%_-_0.5rem)] mx-1">
                  {t("recipe")}
                </span>
              </div>
              <hr className="border-border-light dark:border-border-dark" />
              {order?.products?.map((product, index) => {
                let recipe = recipes.find(
                  (recipe) => recipe.id === product.recipe_id
                );

                return (
                  <div className="flex flex-wrap items-center" key={index}>
                    <span
                      className={`mx-1 overflow-x-auto whitespace-nowrap scroller flex flex-col gap-0.5 -mt-2 ${
                        user.usertype === "production_manager"
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
                      {product.quantity} ton
                      {/* {"( "}{recipe.total_bunker} bunker {" )"} */}
                    </span>
                    {user.usertype !== "production_manager" && (
                      <>
                        {" "}
                        <span className="basis-[calc(10%_-_0.5rem)] mx-1 text-center">
                          {/* bunker cinsinde ton cinsine çevrildi şimdilik */}
                          {formatDigits((product.totalCost * 0.4444)/product.quantity)}{" "}
                          {order?.currency_code}
                        </span>
                        <span className="basis-[calc(10%_-_0.5rem)] mx-1 text-center">
                          {formatDigits(product.unitPrice)}{" "}
                          {order?.currency_code}
                        </span>
                        {user.usertype !== "production_manager" && (
                          <span className="basis-[calc(10%_-_0.5rem)] mx-1 text-center">
                            {/* {formatDigits(product.totalCost)}{" "} */}
                            {/* bunker cinsinde ton cinsine çevrildi şimdilik */}
                            {formatDigits(
                              product.totalCost
                            )}{" "}
                            {order?.currency_code}
                          </span>
                        )}
                        <span className="basis-[calc(10%_-_0.5rem)] mx-1 text-center">
                          {formatDigits(product.totalPrice)}{" "}
                          {order?.currency_code}
                        </span>
                      </>
                    )}

                    <div className="basis-[calc(10%_-_0.5rem)] mx-1 flex flex-col justify-center items-center gap-0.5 text-sm min-h-[1rem]">
                      {product?.orderStatus ? (
                        product.orderStatus.map((status, index) => (
                          <span key={index}>
                            {status.quantity} {t("ton").toLowerCase()},{" "}
                            {status.type}.
                          </span>
                        ))
                      ) : (
                        <span>
                          {product.quantity} {t("ton").toLowerCase()},{" "}
                          {OrderStatus[0]}.
                        </span>
                      )}
                    </div>

                    <div className="basis-[calc(10%_-_0.5rem)] mx-1 flex flex-col justify-center items-center gap-0.5 text-sm min-h-[1rem]">
                      <span className="flex justify-center items-center">
                        {user.usertype === "production_manager" ? (
                          <Modal
                            className={`text-white text-xs md:text-sm rounded-full py-2 px-2 flex justify-center items-center gap-2 ${
                              recipe
                                ? "bg-yellow-500 hover:bg-yellow-700"
                                : "bg-red-600 hover:bg-red-700"
                            } `}
                            text={recipe ? "Reçete Düzenle" : " Reçete Oluştur"}
                          >
                            {({ close }) => (
                              <CreateRecipe
                                order_id={order.order_id}
                                recipe_id={product.recipe_id}
                                product={product}
                                closeModal={close}
                                isFilled={recipe}
                              />
                            )}
                          </Modal>
                        ) : (
                          user.usertype === "boss" && (
                            <Modal
                              className={`text-white max-w-5xl 5xl text-xs md:text-sm rounded-full py-2 px-2 flex justify-center items-center gap-2 bg-purple `}
                              text={"Reçete Detayları"}
                              width="40"
                            >
                              <OrderRecipeDetails
                                order_id={order.order_id}
                                recipe_id={product.recipe_id}
                              />
                            </Modal>
                          )
                        )}
                      </span>
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
                  <div className="basis-[calc(31%_-_0.5rem)] mx-1 flex flex-col justify-center items-center gap-0.5 text-sm min-h-[1rem]">
                    {set?.orderStatus ? (
                      set.orderStatus.map((status, index) => (
                        <span key={index}>
                          {status.quantity} {t("pieces").toLowerCase()},{" "}
                          {t(status.type)}.
                        </span>
                      ))
                    ) : (
                      <span>
                        {set.quantity} {t("pieces").toLowerCase()},{" "}
                        {t(OrderStatus[0])}.
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {user.usertype === "boss" && (
              <>
                {" "}
                <span className="text-right px-4">
                  {t("totalRecipeCost")}:{" "}
                  {formatDigits(order.total_cost)}{" "}
                  {order.currency_code}
                </span>
                <span className="text-right px-4">
                  {t("totalCost")}:
                  {/* 0.6 sabit 1 ton ürün için harcanan süre, order.totalCost top reçete maliyeti */}
                  {formatDigits(
                    (Number(order.total_cost) !== 0
                      ? ((hourlyExpenseCost * 0.6 * totalProductQuantity) + Number(order.total_cost)) : "0")
                  )}{" "}
                  {order.currency_code}
                </span>
                <span className="text-right px-4">
                  {t("taxed_total")}: {formatDigits(order?.total_with_tax)}{" "}
                  {order?.currency_code}
                </span>
                {order.currency_code !== "USD" && (
                  <span className="text-right px-4">
                    {t("exchange_rate")}: {order.exchange_rate} USD
                  </span>
                )}
              </>
            )}
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Order;
