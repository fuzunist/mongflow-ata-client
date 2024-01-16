import { Pie } from "react-chartjs-2";
import Card from "@/components/Card";
import Dropdown from "@/components/Dropdown";
import { useTranslation } from "react-i18next";
import Col from "@/components/Col";
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
import ChartGPTCard from "@/components/ChartGPTCard";
import { useWindowSize } from "react-use";
import {
  useExpenses,
  useExpensesClasses,
  useExpensesItems,
} from "@/store/hooks/apps";
import { useEffect, useState } from "react";
import limitFloat from "@/utils/limitFloat";

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
  const { width } = useWindowSize();
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
              limitFloat(expenses[0].monthly_expenses[itemId],2) || 0;

            if (!accumulatedExpenses[classname]) {
              accumulatedExpenses[classname] = 0;
            }
             console.log(expenseAmount)
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
    console.log(accumulatedExpenses, "accumulatedExpenses");
  }, [expenses, expensesClasses, expensesItems]);

  const donutChartData = {
    labels: Object.keys(expenseGroups),
    datasets: [
      {
        fill: true,
        data: Object.values(expenseGroups),

        backgroundColor: [
          "#ff8acc",
          "#5b69bc",
          "#f9c851",
          "#cdc7fc",
          "#c4bdb9",
          "#8994a1",
          "#e8bcbe",
          "#a6b3a2",
          "#d3e3da",
        ],
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
          <h4 className="header-title">Aylık Gider Grafiği</h4>
          <ChartGPTCard />
          <div className="mt-4 chartjs-chart" style={{ height: "350px" }}>
            <Pie data={donutChartData} options={donutChartOpts} />
          </div>
          <span>* Değerler TL cinsindedir.</span>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default PieChart;
