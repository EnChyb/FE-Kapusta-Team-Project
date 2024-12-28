import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";
import "./BarChartComponent.css";

const BarChartComponent = ({ details }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateLayout = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", updateLayout);
    updateLayout();

    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  const data = Object.entries(details)
    .filter(([key]) => key !== "total")
    .map(([description, amount]) => ({
      name: description,
      amount,
    }));

  const getBarColor = (index) => {
    const darkColor = "#FF751D";
    const lightColor = "#FFDAC0";
    return index % 3 === 0 ? darkColor : lightColor;
  };

  return (
    <div className="barChartContainer">
      <BarChart
        width={isMobile ? 350 : 800}
        height={isMobile ? 500 : 400}
        data={data}
        layout={isMobile ? "vertical" : "horizontal"}
        margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
        {isMobile ? (
          <>
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fontSize: 14 }}
              tickLine={false}
              axisLine={{ stroke: "#aaa" }}
            />
            <XAxis
              type="number"
              tick={{ fontSize: 14 }}
              tickLine={false}
              axisLine={{ stroke: "#aaa" }}
              unit=" EUR"
            />
          </>
        ) : (
          <>
            <XAxis
              dataKey="name"
              tick={{ fontSize: 14 }}
              tickLine={false}
              axisLine={{ stroke: "#aaa" }}
            />
            <YAxis
              tick={{ fontSize: 14 }}
              tickLine={false}
              axisLine={{ stroke: "#aaa" }}
              unit=" EUR"
            />
          </>
        )}
        <Tooltip
          formatter={(value) => `${value} EUR`}
          itemStyle={{ fontSize: "14px" }}
        />
        <Bar
          dataKey="amount"
          fillOpacity={1}
          radius={[10, 10, 0, 0]}
          barSize={isMobile ? 20 : 40}
          label={{
            position: isMobile ? "right" : "top",
            fill: "#000",
            fontSize: 14,
            formatter: (value) => `${value} EUR`,
            style: { whiteSpace: "nowrap" },
          }}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getBarColor(index)} />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
};

export default BarChartComponent;
