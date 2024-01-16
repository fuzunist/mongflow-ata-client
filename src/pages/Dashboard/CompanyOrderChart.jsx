import Chart from "react-apexcharts";
import Card from "@/components/Card";
import Dropdown from "@/components/Dropdown";
import Col from "@/components/Col";
import Row from "@/components/Row";
import moment from "moment";
import ChartGPTCard from "@/components/ChartGPTCard";

// stacked bar chart
const CompanyOrderChart = () => {
  const option = {
    series: [
      {
        data: [
          {
            x: "Güney Polyester",
            y: [
              new Date("2019-02-27").getTime(),
              new Date("2019-03-04").getTime(),
            ],
            fillColor: "#008FFB",
          },
          {
            x: "Kuzey Tekstil",
            y: [
              new Date("2019-03-04").getTime(),
              new Date("2019-03-08").getTime(),
            ],
            fillColor: "#00E396",
          },
          {
            x: "ELDEN Tekstil",
            y: [
              new Date("2019-03-07").getTime(),
              new Date("2019-03-10").getTime(),
            ],
            fillColor: "#775DD0",
          },
          {
            x: "DEN Polyester",
            y: [
              new Date("2019-03-08").getTime(),
              new Date("2019-03-12").getTime(),
            ],
            fillColor: "#FEB019",
          },
          {
            x: "Yıldız İplik",
            y: [
              new Date("2019-03-12").getTime(),
              new Date("2019-03-17").getTime(),
            ],
            fillColor: "#FF4560",
          },
        ],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "rangeBar",
      },
      plotOptions: {
        bar: {
          horizontal: true,
          distributed: true,
          dataLabels: {
            hideOverflowingLabels: false,
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val, opts) {
          var label = opts.w.globals.labels[opts.dataPointIndex];
          var a = moment(val[0]);
          var b = moment(val[1]);
          var diff = b.diff(a, "days");
          return label + ": " + diff + (diff > 1 ? " gün" : " gün");
        },
        style: {
          colors: ["#f3f4f5", "#fff"],
        },
      },
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        show: false,
      },
      grid: {
        row: {
          colors: ["#f3f4f5", "#fff"],
          opacity: 1,
        },
      },
    },
  };

  return (
    <Col variant="full">
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
          <h4 className="header-title mb-3">
            Şirketlere Göre Siparişlerin Durumu
          </h4>
          <ChartGPTCard />
          <Chart
            options={option.options}
            series={option.series}
            type="rangeBar"
            className="apex-charts"
            height={350}
          />
          <span className="mt-2 text-sm">
            * Aralık: Sipariş Oluşturulma Tarihi - Sipariş Sevk Tamamlanma
            Tarihi
          </span>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CompanyOrderChart;
