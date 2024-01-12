import Card from "@/components/Card";
import Col from "@/components/Col";
import { useProducts } from "@/store/hooks/apps";
import { dateToIsoFormatWithTimezoneOffset } from "@/utils/helpers";
import stocksToExcel from "@/utils/stocksToExcel";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Products = ({ stocks, selected, setSelected }) => {
  const today = dateToIsoFormatWithTimezoneOffset(new Date());
  const { t } = useTranslation();

  return (
    <Col variant="full">
      <Card>
        <Card.Body>
          <div className=" max-h-[300px] h-[300px] overflow-y-auto overflow-x-scroll scroller">
            <div className="grid grid-cols-3 mb-6 p-2 top-0 sticky bg-white">
              <div className="text-text-dark-light dark:text-text-dark-dark font-medium flex-1 flex justify-center items-center gap-4">
                <span>{t("product")}</span>
              </div>
              <div className="text-text-dark-light dark:text-text-dark-dark font-medium flex-1 flex justify-center items-center gap-4">
                <span>
                  {t("totalstock")}
                  {" (kg)"}:
                </span>
              </div>
              <div className="text-text-dark-light dark:text-text-dark-dark font-medium flex-1 flex justify-center items-center gap-4">
                <span>
                  {t("unitCost")}
                  {" ($)"}:
                </span>
              </div>
              {/* <div className="text-text-dark-light dark:text-text-dark-dark font-medium flex-1 flex justify-center items-center gap-4">
                <span>{t("supplier")}:</span>
              </div>
              <div className="text-text-dark-light dark:text-text-dark-dark font-medium flex-1 flex justify-center items-center gap-4">
                <span>{t("waybill")}:</span>
              </div> */}
            </div>
            {stocks.map((stock, index) => (
              <div
                key={index}
                className="grid grid-cols-3 w-full  bg-border-light dark:bg-border-dark rounded-md p-4 select-none cursor-pointer"
                onClick={() =>
                  setSelected(selected !== stock.id ? stock.id : null)
                }
              >
                <div className="text-text-dark-light dark:text-text-dark-dark font-medium flex-1 flex justify-center items-center  gap-4 uppercase">
                  {stock.material}
                </div>
                <div className="text-text-dark-light dark:text-text-dark-dark font-medium flex-1 flex justify-center items-center gap-4">
                  <span>{stock.stock} {" kg"}</span>
                </div>
                <div className="text-text-dark-light dark:text-text-dark-dark font-medium flex-1 flex justify-center items-center gap-4">
                  <span>{"$ "}{stock.cost}</span>
                </div>
                {/* <div className="text-text-dark-light dark:text-text-dark-dark font-medium flex-1 flex justify-center items-center gap-4">
                  <span>{stock.supplier}</span>
                </div>
                <div className="text-text-dark-light dark:text-text-dark-dark font-medium flex-1 flex justify-center items-center gap-4">
                  <span>{stock.waybill}</span>
                </div> */}

                <div className="flex-1 flex justify-end items-center gap-4">
                  {/* <button
                                        className='bg-purple hover:bg-purple-hover text-white rounded-full py-2 px-4'
                                        onClick={(e) => {
                                            e.preventDefault()
                                            stocksToExcel(product, stocks, zeros[index])
                                        }}
                                    >
                                        {t('saveAsExcel')}
                                    </button> */}
                </div>
              </div>
            ))}
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Products;
