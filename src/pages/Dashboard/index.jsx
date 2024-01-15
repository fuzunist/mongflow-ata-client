import Row from "@/components/Row";
import Col from "@/components/Col";
import Orders from "./Orders";
import StockChart from "./StockChart";
import { useTranslation } from "react-i18next";
import { useProductions, useStocks } from "@/store/hooks/apps";
import ProductionChart from "./ProductionChart";
import SalesChart from "./SalesChart";
import RecipeStockChart from "./RecipeStockChart";
import RawStockChart from "./RawStockChart";
import ExpensesChart from "./ExpensesChart";


const Dasboard = () => {
  const { t } = useTranslation();
  const stocks = useStocks();
  const productions = useProductions();

  return (
    <Row>
      <Orders />
    
      {/* <Row>
        <RecipeStockChart />
        <RawStockChart />
        <SalesChart />
        <ExpensesChart />

      </Row> */}


      <StockChart title={t("stocks")} stocks={stocks} t={t} />
      <ProductionChart
        title={t("productions")}
        productions={productions}
        t={t}
      />
    </Row>
  );
};

export default Dasboard;
