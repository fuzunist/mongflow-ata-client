import Chart from "react-apexcharts";
import Card from "@/components/Card";
import Dropdown from "@/components/Dropdown";
import Col from "@/components/Col";
import ChartGPTCard from "@/components/ChartGPTCard";
import { useWindowSize } from "react-use";
import {
  useExpenses,
  useExpensesClasses,
  useExpensesItems,
  useOrders
} from "@/store/hooks/apps";
import { useEffect, useState } from "react";


// stacked bar chart
const CostPerOrderChart = () => {
  const { width } = useWindowSize();

  const orders= useOrders()
  const expenses = useExpenses();
  const expensesClasses = useExpensesClasses();
  const expensesItems = useExpensesItems();
  const [expenseGroups, setExpenseGroups] = useState({});

  const accumulatedExpenses = {};
  let expenseAmount;

  useEffect(() => {
    if (expenses.length !== 0) {
      Object.values(expensesItems).forEach((item) => {
        const class_id = item.class_id;
        const classname = Object.values(expensesClasses)?.find(
          (val) => val.id === class_id
        )?.name;
        if (class_id && classname) {
          if (expenses.length !== 0) {
            const itemId = String(item.id);
            const expenseAmount =
              parseFloat(expenses[0].monthly_expenses[itemId]) || 0;

            if (!accumulatedExpenses[classname]) {
              accumulatedExpenses[classname] = 0;
            }
            accumulatedExpenses[classname] += expenseAmount;
          } else {
            console.log(
              `No monthly expenses found for item with id ${item.id} and class ${classname}`
            );
          }
        }
      });
    }
    setExpenseGroups(accumulatedExpenses);
  }, [expenses, expensesClasses, expensesItems]);


  let recipeCosts={}
  let energyCosts={}
  let usakCosts={}
  let consumablesCosts={}
  let vehicleCosts={}
  let otherCompanyCosts={}


  orders.forEach((order)=>{
    if(orders.length!==0){
      let quantity= order.products.reduce((acc,product)=> acc+ product.quantity,0);

    
    }

  })
  // default options
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
          return val + "$";
        },
      },
      // max: 100,
    },
    yaxis: {
      title: {
        text: undefined,
      },
    },
    colors: ["#959abd", "#98a6ad", "#8bb0b0", "#b59aaa", "#dadbcc"],
    tooltip: {
      y: {
        formatter: (val) => {
          return val + "$";
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
      name: "Genel Giderler",
      data: [1200, 1500, 1700, 1300],
    },
    {
      name: "Hammadde Giderleri",
      data: [5000, 6000, 7000, 4500],
    },
    {
      name: "Enerji Giderleri",
      data: [2500, 3500, 2750, 1020],
    },
    {
      name: "Filtre Giderleri",
      data: [800, 2000, 1400, 7500],
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
          <h4 className="header-title mb-3">Sipariş Maliyet Grafiği</h4>
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

export default CostPerOrderChart;
