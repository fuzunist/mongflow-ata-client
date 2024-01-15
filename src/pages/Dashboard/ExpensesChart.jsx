import { Pie } from "react-chartjs-2";
import Card from "@/components/Card";
import Dropdown from "@/components/Dropdown";
import { useTranslation } from "react-i18next";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const PieChart = () => {
  const { t } = useTranslation();

  // chart data
  const donutChartData = {
    labels: ["Uşak", "Partner", "Energy", "Maintanience", "Consumables" , "Management", "Vehicle", "Travel", "Other"],
    datasets: [
      {
        fill: true,
        data: [300000, 50000, 1000000, 120000, 300000, 500000, 120333, 12000, 40000],
        backgroundColor: ["#ff8acc", "#5b69bc", "#f9c851", "#cdc7fc", "#c4bdb9", "#8994a1","#e8bcbe", "#a6b3a2", "#d3e3da"],
        borderColor: "#fff",
      },
    ],
  };

  // default options
  const donutChartOpts = {
    maintainAspectRatio: false,
    cutoutPercentage: 800,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return (
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
        <h4 className="header-title">Gider Grafiği</h4>
        <div className="mt-4 chartjs-chart" style={{ height: "350px" }}>
          <Pie data={donutChartData} options={donutChartOpts} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default PieChart;
