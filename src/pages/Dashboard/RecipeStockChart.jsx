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
import { useTranslation } from 'react-i18next'


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
  // const labels = Utils.months({ count: 7 });
  const { t } = useTranslation()


  // chart data
  const barChartData = {
    labels: [
      "Beyaz Granül",
      "Beyaz takoz",
      "Beyaz Plaka",
      "Şeffaf Pet",
      "Sarı Optik",
      "Beyaz Boya",

    ],
    datasets: [
      {
        label: t("stockquantity"),
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: "rgba(113,182,249,0.2)",
        borderColor: "#71b6f9",
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
        <div style={{ height: "350px" }} className="mt-4 chartjs-chart">
          <Bar data={barChartData} options={barChartOpts} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default BarChart;
