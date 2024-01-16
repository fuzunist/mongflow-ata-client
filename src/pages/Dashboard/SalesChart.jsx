import { Line } from "react-chartjs-2";
import Card from "@/components/Card";
import Dropdown from "@/components/Dropdown";
import Col from "@/components/Col";
import _ from "lodash";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useTranslation } from "react-i18next";
import ChartGPTCard from "@/components/ChartGPTCard";
import { useWindowSize } from "react-use";
import { useOrders } from "@/store/hooks/apps";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
  const { t } = useTranslation();
  const { width } = useWindowSize();
  const orders = useOrders();
  console.log(orders);
  // chart data
  const ordersData = [
    { 0: { id: 1, price: 5000, date: "2024-01-24 19:17:05.820" } },
    { 1: { id: 2, price: 7000, date: "2023-11-15 19:17:05.820" } },
    { 3: { id: 3, price: 4000, date: "2023-08-15 19:17:05.820" } },
    { 4: { id: 4, price: 1000, date: "2023-07-15 19:17:05.820" } },
    { 5: { id: 5, price: 7200, date: "2023-06-15 19:17:05.820" } },
    { 6: { id: 6, price: 2500, date: "2023-06-15 19:17:05.820" } },
    { 7: { id: 7, price: 1800, date: "2023-05-15 19:17:05.820" } },
    { 8: { id: 8, price: 9000, date: "2023-04-15 19:17:05.820" } },
    { 8: { id: 8, price: 9000, date: "2023-04-15 19:17:05.820" } },
    { 8: { id: 8, price: 9000, date: "2023-04-15 19:17:05.820" } },
    { 8: { id: 8, price: 9000, date: "2023-02-15 19:17:05.820" } },
    { 8: { id: 8, price: 9000, date: "2023-03-15 19:17:05.820" } },
    { 8: { id: 8, price: 9000, date: "2023-02-15 19:17:05.820" } },
    { 8: { id: 8, price: 9000, date: "2023-01-15 19:17:05.820" } },
    { 8: { id: 8, price: 9000, date: "2022-12-15 19:17:05.820" } },
  ];

  const flattenedOrders = ordersData.map(
    (orderObj) => Object.values(orderObj)[0]
  );

  // Group orders by year and month
  const groupedOrders = _.groupBy(flattenedOrders, (order) =>
    new Date(order.date).toLocaleString("tr-TR", {
      year: "numeric",
      month: "long",
    })
  );

  // Calculate total price for each year and month
  const formattedResult = _.chain(groupedOrders)
    .mapValues((orders) =>
      orders.reduce((total, order) => total + order.price, 0)
    )
    .toPairs()
    .sortBy((pair) => new Date(pair[0]).getTime())
    .fromPairs()
    .value();

  console.log(formattedResult, formattedResult?.length);
  const lineChartData = {
    labels: Object.keys(formattedResult),
    datasets: [
      {
        label: t("salesQuantity"),
        data: Object.values(formattedResult),
        fill: false,
        borderColor: "#10c469",
        tension: 0.1,
      },
    ],
  };

  const lineChartOpts = {
    bezierCurve: false,
    maintainAspectRatio: false,
    hover: {
      intersect: false,
    },
    plugins: {
      filler: {
        propagate: false,
      },
      legend: {
        display: true,
      },
      tooltip: {
        intersect: false,
      },
    },
    zeroLineColor: () => "rgba(150, 150, 150, 0.9)",
    scales: {
      x: {
        display: true,
        grid: {
          color: () => "rgba(150, 150, 150, 0.1)",
          drawBorder: false,
        },
      },
      y: {
        ticks: {
          // stepSize: 20,
        },
        display: true,
        borderDash: [5, 5],
        grid: {
          color: () => "rgba(0,0,0,0)",
          drawBorder: false,
          fontColor: "#fff",
        },
      },
    },
  };

  return (
    <Col variant={width > 600 ? "1/2" : "full"}>
      <Card>
        <Card.Body>
          {/* <Dropdown className="float-end" align="end"> */}
          {/* <Dropdown.Toggle as="a" className="cursor-pointer card-drop">
                        <i className="mdi mdi-dots-vertical"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item>Action</Dropdown.Item>
                        <Dropdown.Item>Anothther Action</Dropdown.Item>
                        <Dropdown.Item>Something Else</Dropdown.Item>
                        <Dropdown.Item>Separated link</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown> */}
          <h4 className="header-title">{t("salesGraph")}</h4>
          <ChartGPTCard />
          <div style={{ height: "350px" }} className="mt-4 chartjs-chart">
            <Line data={lineChartData} options={lineChartOpts} />
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default LineChart;
