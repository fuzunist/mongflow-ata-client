import Chart from "react-apexcharts";
import Card from "@/components/Card";
import Dropdown from "@/components/Dropdown";
import Col from "@/components/Col";
import ChartGPTCard from "@/components/ChartGPTCard";
import { useWindowSize } from "react-use";

// stacked bar chart
const OrderStatusChart = () => {
  const { width } = useWindowSize();

  const apexBarChartStackedOpts = {
    chart: {
      height: 380,
      type: "bar",
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    stroke: {
      show: false,
    },
    xaxis: {
      categories: ["Sipariş 1", "Sipariş 2", "Sipariş 3", "Sipariş 4"],
      labels: {
        formatter: (val) => {
          return val + "%";
        },
      },
      max: 100,
    },
    yaxis: {
      title: {
        text: undefined,
      },
    },
    colors: ["#35b8e0", "#98a6ad", "#10c469", "#ff5b5b", "#f9c851"],
    tooltip: {
      y: {
        formatter: (val) => {
          return val + "%";
        },
      },
    },
    fill: {
      opacity: 1,
    },
    states: {
      hover: {
        filter: {
          type: "none",
        },
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "center",
    },
    grid: {
      borderColor: "#f7f7f7",
    },
  };

  // chart data
  const apexBarChartStackedData = [
    {
      name: "Sipariş Alındı",
      data: [0, 0, 0, 0],
    },
    {
      name: "%25 Gönderildi",
      data: [25, 50, 0, 0],
    },
    {
      name: "%50 Gönderildi",
      data: [0, 0, 50, 0],
    },
    {
      name: "%75 Gönderildi",
      data: [0, 0, 0, 75],
    },
    {
      name: "%Sipariş Tamamlandı",
      data: [0, 100, 0, 0],
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
          <h4 className="header-title mb-3">Sipariş Durumu Grafiği</h4>
          <ChartGPTCard />
          <Chart
            options={apexBarChartStackedOpts}
            series={apexBarChartStackedData}
            type="bar"
            className="apex-charts"
          />
        </Card.Body>
      </Card>
    </Col>
  );
};

export default OrderStatusChart;
