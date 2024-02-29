import Row from "@/components/Row";
// No need for Header as you mentioned you don't want it for orders.
import Order from "./Order"; // Importing the Order component instead of Product
import { useFilter, useOrders, useSearch, useSorter } from "@/store/hooks/apps"; // Assuming you have a similar hook for orders
import { useMemo } from "react";
import { useUser } from "@/store/hooks/user";
import { useEffect, useState } from "react";
import { setFilter, setSearch, setSorter } from "@/store/actions/apps";
import { useTranslation } from "react-i18next";
import Card from "@/components/Card";
import Col from "@/components/Col";
import SendToMergedProduction from "@/modals/SendToMergedProduction";
import Modal from "@/components/Modal";

const UpComingProductions = ({ page, setPage }) => {
  const user = useUser();
  const orders = useOrders();
  const search = useSearch();
  const sorter = useSorter();
  const { t } = useTranslation();
  const [checkedRecipes, setCheckedRecipes] = useState([]);

  //Henüz üretilmemiş ürünü olanlar ve sadece üretilmemiş ürünü içerecek
  //ve ürünün ne kadarı Alındı durumundaysa o miktar order.quantity yerine yazıldı
  const nonProducedProductsOrders = useMemo(() => {
    if (!user.userid || !orders.length) return [];

    const updatedOrders = orders
      .filter((order) => order.status.length === 4)
      .map((order) => {
        const updatedProducts = order.products
          .map((product) => {
            const receivedStatus = product.orderStatus.find(
              (status) => status.type === "Alındı"
            );
            console.log("receivedStatus.....", receivedStatus);
            if (receivedStatus && receivedStatus.quantity !== 0) {
              return { ...product, quantity: receivedStatus.quantity };
            }
            return null;
          })
          .filter(Boolean);

        return { ...order, products: updatedProducts };
      });

    return updatedOrders;
  }, [user, orders]);

  console.log("nonProducedProductsOrders::", nonProducedProductsOrders);

  const searchedOrders = useMemo(() => {
    if (!search) return [...nonProducedProductsOrders];
    return [
      ...nonProducedProductsOrders?.filter(
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
      ),
    ];
  }, [nonProducedProductsOrders, search]);

  const sortedOrders = useMemo(() => {
    const _searchOrders = [...searchedOrders];

    switch (sorter) {
      case "date_old_to_new":
        return [..._searchOrders.sort((a, b) => a.order_id - b.order_id)];
      case "date_new_to_old":
        return [..._searchOrders.sort((a, b) => b.order_id - a.order_id)];
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
      {page === "upcomingProductions" && sortedOrders.length > 0 ? (
        <>
          <Row>
            {sortedOrders.map((order, index) => (
              <Order
                key={index}
                order={order}
                setCheckedRecipes={setCheckedRecipes}
                checkedRecipes={checkedRecipes}
              />
            ))}
          </Row>
          {checkedRecipes.length > 1 && (
            <Row>
              <Col variant="full">
                <Card>
                  <Card.Body>
                    <div className="flex justify-between px-8 items-center">
                      <div>
                        Seçilen Siparişlerin Üretimini Birleştirmek için
                        Tıklayın {">>"}
                      </div>
                      <div>
                        <Modal
                          className={`text-white text-xs md:text-sm rounded-full py-2 px-2  gap-2 bg-orange-500 hover:bg-yellow-700 `}
                          text={t("moveToProduction")}
                        >
                          {({ close }) => (
                            <SendToMergedProduction
                              closeModal={close}
                              checkedRecipes={checkedRecipes}
                            />
                          )}
                        </Modal>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}
        </>
      ) : (
        <>
          <Col variant="full" className={"flex justify-center items-center"}>
            Üretilecek Sipariş Bulunamadı.
          </Col>
        </>
      )}
    </>
  );
};

export default UpComingProductions;
