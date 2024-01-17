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
  useOrders,
} from "@/store/hooks/apps";
import { useEffect, useState } from "react";
import limitFloat from "@/utils/limitFloat";
import { formatDigits } from "@/utils/helpers";

// stacked bar chart
const CostPerOrderChart = () => {
  const { width } = useWindowSize();

  const orders = useOrders();
  const expenses = useExpenses();
  const expensesClasses = useExpensesClasses();
  const expensesItems = useExpensesItems();
  const [hourlyExpenseGroups, setHourlyExpenseGroups] = useState({});

  const hourlyAccumulatedExpenses = {};
  let expenseAmount;

  useEffect(() => {
    console.log("expenses::", expenses[0].hourly_expenses);
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
              parseFloat(expenses[0]?.hourly_expenses[itemId]) || 0;

            if (!hourlyAccumulatedExpenses[classname]) {
              hourlyAccumulatedExpenses[classname] = 0;
            }
            hourlyAccumulatedExpenses[classname] += expenseAmount;
          } else {
            console.log(
              `No hourly expenses found for item with id ${item.id} and class ${classname}`
            );
          }
        }
      });
    }
    console.log("hourlyAccumulatedExpenses", hourlyAccumulatedExpenses);
    setHourlyExpenseGroups(hourlyAccumulatedExpenses);
  }, [expenses, expensesClasses, expensesItems]);

  // hourlyExpenseCost * 0.6 * totalProductQuantity
  console.log("expenseGroups::", hourlyExpenseGroups);
  let orderNumbers = [];
  let recipeCosts = [];
  let energyCosts = [];
  let usakCosts = [];
  let consumablesCosts = [];
  let vehicleCosts = [];
  let otherCompanyCosts = [];

  let recipeCostsObj = {};
  let energyCostsObj = {};
  let usakCostsObj = {};
  let consumablesCostsObj = {};
  let vehicleCostsObj = {};
  let otherCompanyCostsObj = {};

  orders.forEach((order) => {
    if (orders.length !== 0) {
      let quantity = order.products.reduce(
        (acc, product) => acc + product.quantity,
        0
      );
      console.log(quantity);
      orderNumbers.push(order.order_number);
      recipeCosts.push(limitFloat(order.total_cost));
      energyCosts.push(
        limitFloat(hourlyExpenseGroups["energy"] * 0.6 * quantity)
      );
      usakCosts.push(limitFloat(hourlyExpenseGroups["uşak"] * 0.6 * quantity));
      consumablesCosts.push(
        limitFloat(hourlyExpenseGroups["consumables"] * 0.6 * quantity)
      );
      vehicleCosts.push(
        limitFloat(hourlyExpenseGroups["vehicle"] * 0.6 * quantity)
      );
      const excludedKeys = ["vehicle", "energy", "uşak", "consumables"];

      const otherExpensesSum = Object.entries(hourlyExpenseGroups)
        .filter(([key]) => !excludedKeys.includes(key))
        .reduce((acc, [, value]) => acc + value, 0);

      otherCompanyCosts.push(limitFloat(otherExpensesSum * 0.6 * quantity));
    }
  });


  recipeCostsObj["reçete"] = recipeCosts;
  energyCostsObj["energy"] = energyCosts;
  usakCostsObj["uşak"] = usakCosts;
  consumablesCostsObj["consumables"] = consumablesCosts;
  vehicleCostsObj["vehicle"] = vehicleCosts;
  otherCompanyCostsObj["diğer"] = otherCompanyCosts;

  console.log(recipeCostsObj, energyCostsObj);
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
        barHeight: 30
      
      },
    },
    stroke: {
      width: 2

    },
    xaxis: {
      categories: orderNumbers,
      
      labels: {
        formatter: (val) => {
          return val + "TL";
        },
      },
      // max: 100,
    },
    yaxis: {
      title: {
        text: undefined,
      },
    },
    colors: ["#0C356A", "#279EFF","#33BBC5", "#40F8FF", "#ADC4CE", "#D5FFD0"],
    tooltip: {
      y: {
        formatter: (val) => {
          return formatDigits(val) + "₺";
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
      name: Object.keys(recipeCostsObj)[0],
      data: Object.values(recipeCostsObj)[0],
    },
    {
      name: Object.keys(energyCostsObj)[0],
      data: Object.values(energyCostsObj)[0],
    },
    {
      name: Object.keys(usakCostsObj)[0],
      data: Object.values(usakCostsObj)[0],
    },
    {
      name: Object.keys(consumablesCostsObj)[0],
      data: Object.values(consumablesCostsObj)[0],
    },
    {
      name: Object.keys(vehicleCostsObj)[0],
      data: Object.values(vehicleCostsObj)[0],
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
        <span>* Değerler TL cinsindedir.</span>

        </Card.Body>
      </Card>
    </Col>
  );
};

export default CostPerOrderChart;
