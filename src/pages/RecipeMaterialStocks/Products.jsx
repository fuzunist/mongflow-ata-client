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
          <div className="flex flex-col gap-4 max-h-[300px] h-[300px] overflow-y-auto scroller">
            {stocks.map((stock, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-border-light dark:bg-border-dark rounded-md p-4 select-none cursor-pointer"
                onClick={() =>
                  setSelected(selected !== stock.id ? stock.id : null)
                }
              >
                <h5 className="text-text-dark-light dark:text-text-dark-dark font-medium flex-1">
                  {stock.material}
                </h5>
                <div className="text-text-dark-light dark:text-text-dark-dark font-medium flex-1 flex justify-center items-center gap-4">
                <span>{t("totalstock")}{" (kg)"}:</span>
                  <span>{stock.stock}</span>
                </div>
                <div className="text-text-dark-light dark:text-text-dark-dark font-medium flex-1 flex justify-center items-center gap-4">
                <span>{t("unitCost")}{" ($)"}:</span>
                  <span>{stock.cost}</span>
                </div>
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
