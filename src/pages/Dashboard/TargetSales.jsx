import Chart from "react-apexcharts";
import Card from "@/components/Card";
import Dropdown from "@/components/Dropdown";
import Col from "@/components/Col";
import Row from "@/components/Row";
import ChartGPTCard from "@/components/ChartGPTCard";
import { useWindowSize } from 'react-use'


// stacked bar chart
const TargetSales = () => {
  const { width } = useWindowSize();

  const option = {
    series: [76, 67, 61, 90],
    options: {
      chart: {
        height: 390,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          offsetY: 0,
          startAngle: 0,
          endAngle: 270,
          hollow: {
            margin: 5,
            size: "30%",
            background: "transparent",
            image: undefined,
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              show: false,
            },
          },
        },
      },
      colors: ["#1ab7ea", "#0084ff", "#39539E", "#0077B5"],
      labels: ["Hakan Yılmaz", "Ali Efe", "Harun Kor", "Taner İleri"],
      legend: {
        show: true,
        floating: true,
        fontSize: "16px",
        position: "left",
        offsetX: 30,
        offsetY: 15,
        labels: {
          useSeriesColors: true,
        },
        markers: {
          size: 0,
        },
        formatter: function (seriesName, opts) {
          return seriesName + ":  %" + opts.w.globals.series[opts.seriesIndex];
        },
        itemMargin: {
          horizontal: 0,
        },
      },
      // responsive: [
      //   {
      //     breakpoint: 480,
      //     options: {
      //       legend: {
      //         show: false,
      //       },
      //     },
      //   },
      // ],
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
          <h4 className="header-title mb-3">Hedef Siparişlerin Durumu</h4>
          <ChartGPTCard />
          <Chart
            options={option.options}
            series={option.series}
            type="radialBar"
           className="apex-charts w-full"
         
          />
        </Card.Body>
      </Card>
    </Col>
  );
};

export default TargetSales;
