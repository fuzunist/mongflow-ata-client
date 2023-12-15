import Card from "@/components/Card";
import Col from "@/components/Col";
import { useUser } from "@/store/hooks/user";
import { useTranslation } from "react-i18next";
import { editOrder } from "@/store/actions/apps";
import { updateStatusInDB } from "@/services/order";
import { useRecipes } from "@/store/hooks/apps";
import Modal from "@/components/Modal";
import CreateRecipe from "@/modals/CreateRecipe";
import { useEffect, useState } from "react";

const Order = ({ order }) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const user = useUser();
  const { t } = useTranslation();
  const recipes = useRecipes();
  console.log("Order Page: ", recipes);

  const onClick = async () => {
    const response = await updateStatusInDB(
      user.tokens.access_token,
      order.order_id,
      0
    );
    if (response?.error) console.log(response.error);
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

              <button
                className="py-2 px-4 transition-all outline-none bg-green-600 hover:bg-green-500 text-white rounded disabled:bg-gray-400"
                onClick={onClick}
                disabled={isDisabled}
              >
                {t("approve")}
              </button>
            </div>
            <div className="flex flex-col gap-2 border border-border-light dark:border-border-dark relative p-4 mt-4 mb-2">
              <span className="absolute -top-4 left-2 py-2 px-2 bg-card-bg-light dark:bg-card-bg-dark leading-none text-lg font-semibold w-min max-w-[calc(100%_-_16px)] overflow-hidden text-ellipsis whitespace-nowrap">
                {t("products")}
              </span>
              <div className="flex flex-wrap text-center font-medium">
                <span className="basis-[calc(45%_-_0.5rem)] mx-1 text-left">
                  {t("product")}
                </span>
                <span className="basis-[calc(15%_-_0.5rem)] mx-1">
                  {t("quantity")}
                </span>
                {/* <span className="basis-[calc(12%_-_0.5rem)] mx-1">
                  {t("unitPrice")}
                </span>
                <span className="basis-[calc(12%_-_0.5rem)] mx-1">
                  {t("totalPrice")}
                </span> */}
                <span className="basis-[calc(15%_-_0.5rem)] mx-1">
                  {t("orderStatus")}
                </span>
                <span className="basis-[calc(15%_-_0.5rem)] mx-1">
                  {t("recipe")}
                </span>
              </div>
              <hr className="border-border-light dark:border-border-dark" />
              {order?.products?.map((product, index) => {
                let isFilled = recipes.find(
                  (recipe) => recipe.id === product.recipe_id
                );

                let recipeCost = isFilled?.cost ?? 0;
                let totalRecipeCost = recipeCost * product?.quantity ?? 0;
                return (
                  <div className="flex flex-wrap items-center" key={index}>
                    <span className="basis-[calc(45%_-_0.5rem)] mx-1 overflow-x-auto whitespace-nowrap scroller flex flex-col gap-0.5">
                      <span>{product.product_name}</span>
                      <span className="text-sm">
                        {Object.entries(product.attributes)
                          .map(([key, value]) => `${key}: ${value}`)
                          .join(", ")}
                      </span>
                    </span>
                    <span className="basis-[calc(15%_-_0.5rem)] mx-1 text-center">
                      {product.quantity} ton
                    </span>
                    {/* <span className="basis-[calc(12%_-_0.5rem)] mx-1 text-center">
                      {recipeCost} {order?.currency_code}
                    </span>
                    <span className="basis-[calc(12%_-_0.5rem)] mx-1 text-center">
                      {totalRecipeCost} {order?.currency_code}
                    </span> */}
                    <div className="basis-[calc(15%_-_0.5rem)] mx-1 flex flex-col justify-center items-center gap-0.5 text-sm min-h-[1rem]">
                      {product?.orderStatus ? (
                        product.orderStatus.map((status, index) => (
                          <span key={index}>
                            {status.quantity} {t("pieces").toLowerCase()},{" "}
                            {status.type}.
                          </span>
                        ))
                      ) : (
                        <span>
                          {product.quantity} {t("pieces").toLowerCase()},{" "}
                          {OrderStatus[0]}.
                        </span>
                      )}
                    </div>

                    <div className="basis-[calc(15%_-_0.5rem)] mx-1 flex flex-col justify-center items-center gap-0.5 text-sm min-h-[1rem]">
                      <span className="flex justify-center items-center">
                        <Modal
                          className={`text-white text-xs md:text-sm rounded-full py-2 px-2 flex justify-center items-center gap-2 ${
                            isFilled
                              ? "bg-yellow-500 hover:bg-yellow-700"
                              : "bg-red-600 hover:bg-red-700"
                          } `}
                          text={isFilled ? "Reçete Düzenle" : " Reçete Oluştur"}
                        >
                          {({ close }) => (
                            <CreateRecipe
                              order_id={order.order_id}
                              recipe_id={product.recipe_id}
                              closeModal={close}
                              isFilled={isFilled}
                              totalRecipeCost={totalRecipeCost}
                            />
                          )}
                        </Modal>
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
            <span className="text-right px-4">
              {t("taxed_total")}: {order?.total_with_tax} {order?.currency_code}
            </span>
            {order.currency_code !== "TL" && (
              <span className="text-right px-4">
                {t("exchange_rate")}: {order.exchange_rate} TL
              </span>
            )}
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Order;
