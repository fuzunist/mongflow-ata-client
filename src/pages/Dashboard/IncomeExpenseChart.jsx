import Chart from "react-apexcharts";
import Card from "@/components/Card";
import Col from "@/components/Col";

import Dropdown from "@/components/Dropdown";
import { ApexOptions } from "apexcharts";
import ChartGPTCard from "@/components/ChartGPTCard";
import { useWindowSize } from "react-use";

// simple bar chart
const BarChart = () => {
  const { width } = useWindowSize();

  // default options
  const apexBarChartOpts = {
    chart: {
      height: 300,
      width: 900,
      //   width: 1600,
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        dataLabels: {
          position: "top",
        },
        columnWidth: "15",
      },
    },
    dataLabels: {
      enabled: true,
      position: "vertical",
      offsetX: 0,
      padding: "6px",
      style: {
        fontSize: "10px",
        colors: ["#fff"],
      },
    },
    colors: ["#ff5b5b", "#98a6ad"],
    background: {
      enabled: true,
      opacity: 2,
      borderWidth: 2,
    },
    stroke: {
      show: true,
      width: 1,
      colors: ["white"],
    },

    xaxis: {
      categories: [
        "Ocak",
        "Şubat",
        "Mart",
        "Nisan",
        "Mayıs",
        "Haziran",
        "Temmuz",
        "Ağustos",
        "Eylül",
        "Ekim",
        "Kasım",
        "Aralık",
      ],
    },
    legend: {
      offsetY: 0,
    },
    states: {
      hover: {
        filter: {
          type: "none",
        },
      },
    },
    grid: {
      borderColor: "#f7f7f7",
    },
  };

  // chart data
  const apexBarChartData = [
    {
      name: "Gelirler",
      data: [44, 55, 41, 64, 22, 43, 21, 50, 60, 70, 80, 120],
    },
    {
      name: "Giderler",
      data: [53, 32, 33, 52, 13, 44, 32, 12, 25, 34, 40, 19],
    },
  ];

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
          <h4 className="header-title mb-3">Aylık Gelir Gider Grafiği</h4>
          <ChartGPTCard />
          <Chart
            options={apexBarChartOpts}
            series={apexBarChartData}
            type="bar"
            className="apex-charts"
          />
        </Card.Body>
      </Card>
    </Col>
  );
};

export default BarChart;
