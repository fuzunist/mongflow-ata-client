import Card from "@/components/Card";
import Col from "@/components/Col";
import Modal from "@/components/Modal";
import CreateRawMaterialStock from "@/modals/CreateRawMaterialStock";
import {
  dateToIsoFormatWithTimezoneOffset,
  filterOlderThan10Days,
  zipArray,
} from "@/utils/helpers";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useRawMaterialLogs, useRawMaterials } from "@/store/hooks/apps";

const Selected = ({ selected }) => {
  const rawMaterialLogs = useRawMaterialLogs();
  const rawMaterialStocks = useRawMaterials();

  const { t } = useTranslation();

  const filteredStocks = useMemo(() => {
    if (!rawMaterialLogs || !rawMaterialLogs.length) return [];
    const filtered = rawMaterialLogs?.filter((log) => log.item_id === selected);
    const zipped = zipArray(filtered, "date");
    filterOlderThan10Days(zipped, new Date());
    return zipped;
  }, [rawMaterialLogs, selected]);

  if (!selected) return null;

  return (
    <Col variant="full">
      <Card>
        <Card.Body>
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold text-text-dark-light dark:text-text-dark-dark mb-6">
              {rawMaterialStocks.find((item) => item.id === selected).material}{" "}
              {t("buyinghistory")}
            </h2>

            <div className="flex flex-col w-full min-h-[225px] max-h-[225px] overflow-y-auto scroller ">
              {Object.entries(filteredStocks).map(([key, stocks], index) => {
                return (
                  <div
                    className="flex flex-col gap-2 bg-border-light dark:bg-border-dark rounded-md p-4 select-none min-w-[500px] overflow-x-scroll"
                    key={index}
                  >
                   
                    <hr className="border-body-fg-dark dark:border-body-fg-light" />
                    <div className="flex max-h-[160px] overflow-y-auto scroller">
                      {stocks.map((stock, _indx) => {
                        return (
                          <Modal
                     
                            key={_indx}
                            text={
                              <div  className="grid grid-cols-5 gap-x-4 " >
                                <span className="justify-self-start grid-cols-5">
                                  {t("price")}: {stock.price}
                                </span>
                                <span className="justify-self-start grid-cols-5">
                                  {t("stock")}: {stock.quantity}
                                </span>
                                <span className="justify-self-start grid-cols-5">
                                  {t("totalPrice")}:{" "}
                                  {stock.quantity * stock.price}
                                  {" $"}
                                </span>
                                <span className="justify-self-start grid-cols-5">
                                  {t("supplier")}: {stock.supplier}
                                </span>
                                <span className="justify-self-start grid-cols-5">
                                  {t("waybill")}: {stock.waybill}
                                </span>
                              </div>
                            }
                            className="grid w-full p-2 rounded border border-body-fg-dark dark:border-body-fg-light select-none cursor-pointer"
                          >
                            {({ close }) => (
                              <CreateRawMaterialStock
                                closeModal={close}
                                editing={true}
                                selected={stock}
                              />
                            )}
                          </Modal>
                        );
                      })}
                    </div>
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

export default Selected;
