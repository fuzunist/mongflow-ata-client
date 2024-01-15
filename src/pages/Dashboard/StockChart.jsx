import { useMemo, useState } from "react";
import {
  dateToIsoFormatWithTimezoneOffset,
  turnIntoOneForObjectInArray,
  zipArray,
} from "@/utils/helpers";

import Card from "@/components/Card";
import Col from "@/components/Col";
import Select from "@/components/Select";
import { useWindowSize } from "react-use";
import LineChart from "@/components/Charts/LineChart";
import ChatBox from "@/gpt/ChatBox";

const StockChart = ({ title, stocks, t }) => {
  const [selected, setSelected] = useState(t("choose"));
  const { width } = useWindowSize();

  console.log("stocks", stocks);
  const options = useMemo(() => {
    const _options = [t("choose")];
    if (!stocks.length) return _options;
    return turnIntoOneForObjectInArray(
      stocks.map((stock) => ({
        key: stock.product_id,
        value: stock.product_name,
      })),
      "key"
    );
  }, [stocks]);
  console.log("options", options);

  const [categories, datas] = useMemo(() => {
    const _categories = [],
      _datas = [];
    if (selected === t("choose"))
      return [_categories.concat(["-"]), _datas.concat([0])];
    const filteredStocks = stocks.filter(
      (stock) => stock.product_id === selected
    );

    return [
      _categories.concat([
        ...new Set(
          filteredStocks.map((stock) =>
            dateToIsoFormatWithTimezoneOffset(new Date(stock.date))
          )
        ),
      ]),
      _datas.concat(
        Object.entries(zipArray(filteredStocks, "date")).map(([key, value]) =>
          value.map((val) => val.stock).reduce((a, b) => a + b)
        )
      ),
    ];
  }, [selected, stocks]);

  console.log("cat:", categories, "data:", datas);
  return (
    <>
      <Col variant={width > 600 ? "1/2" : "full"}>
        <Card>
          <Card.Body>
            <Select
              className="absolute top-0 right-0 mt-4 mr-6 min-w-[10rem] text-sm"
              value={selected}
              onChange={setSelected}
              options={options}
            />
            <h4 className="text-text-dark-light dark:text-text-dark-dark text-base mb-9">
              {title}
            </h4>
            <div>
              <LineChart
                name={t("stock")}
                categories={categories?.slice(-10)}
                datas={datas?.slice(-10)}
                colors={["#188ae2", "#3cc469"]}
                theme="dark"
              />
            </div>
          </Card.Body>
          {/* <hr className="h-1 w-full text-slate-800 -mt-4" />
          <Card.Body>
            <div className="flex flex-col w-full justify-center items-center ">
              <div className="flex flex-col w-full">
                <h4 className="mb-2">Grafik Yorumu</h4>
                <div className="bg-slate-50  h-auto p-4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae,
                  magni totam dolor sit quasi illo eaque, exercitationem nemo
                  quo quia tempore nobis? Ipsam placeat excepturi nobis
                  necessitatibus dolorum quos porro?
                </div>
              </div>
              <div className="flex flex-col w-full mt-6">
                {/* <h4 className="mb-2">{title} hakkında bilgi al.</h4> */}
          {/* <div className="bg-slate-50  h-auto p-4">
                  <ChatBox
                    assistantId="asst_PWvz9aOOmNVH7eDFpS4sckOY"
                    threadId="thread_ayDLTRbIB0hyzObnbTNh6wyk"
                  />
                </div>
              </div>
            </div>
          </Card.Body> */}
        </Card>
      </Col>
    </>
  );
};

export default StockChart;
