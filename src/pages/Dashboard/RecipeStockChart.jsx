import { Bar } from "react-chartjs-2";
import Card from "@/components/Card";
import Dropdown from "@/components/Dropdown";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useTranslation } from "react-i18next";
import Col from "@/components/Col";
import ChartGPTCard from "@/components/ChartGPTCard";

import { useWindowSize } from "react-use";
import { useRecipeMaterialStocks } from "@/store/hooks/apps";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const BarChart = () => {
  const { width } = useWindowSize();
  const { t } = useTranslation();

  const recipeMaterialStocks= useRecipeMaterialStocks()

  const stockNames= Object.entries(recipeMaterialStocks).map(([key,val])=>val.material);
  const stockDatas= Object.entries(recipeMaterialStocks).map(([key,val])=>val.stock);


  // chart data
  const barChartData = {
    labels: stockNames,
    datasets: [
      {
        label: t("stockquantity"),
        data: stockDatas,
        backgroundColor: "#8CC0DE",
        borderColor:"#8CC0DE",
        borderWidth: 1,
      },
    ],
  };

  // options
  const barChartOpts = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          display: false,
          drawBorder: false,
        },
        stacked: false,
        ticks: {
          stepSize: 20,
        },
      },
      x: {
        stacked: false,
        grid: {
          drawBorder: false,
          color: () => "rgba(0,0,0,0.01)",
        },
      },
    },
  };

  return (
    <Col variant={width > 600 ? "1/2" : "full"}>
      <Card>
        <Card.Body>
          {/* <Dropdown className="float-end" align="end">
                    <Dropdown.Toggle as="a" className="cursor-pointer card-drop">
                        <i className="mdi mdi-dots-vertical"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item>Action</Dropdown.Item>
                        <Dropdown.Item>Anothther Action</Dropdown.Item>
                        <Dropdown.Item>Something Else</Dropdown.Item>
                        <Dropdown.Item>Separated link</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown> */}
          <h4 className="header-title">{t("recipematerialstocks")}</h4>
          <ChartGPTCard />
          <div style={{ height: "350px" }} className="chartjs-chart">
            <Bar data={barChartData} options={barChartOpts} />
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default BarChart;
