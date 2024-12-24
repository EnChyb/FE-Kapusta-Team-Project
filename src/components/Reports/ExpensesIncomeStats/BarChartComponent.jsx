import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";

const BarChartComponent = ({ details }) => {
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
    <div
      className="barChartContainer"
      style={{ textAlign: "center", marginTop: "20px" }}>
      <BarChart
        width={800}
        height={400}
        data={data}
        margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 14, angle: 0 }}
          tickLine={false}
          axisLine={{ stroke: "#aaa" }}
        />
        <YAxis
          tick={{ fontSize: 14 }}
          tickLine={false}
          axisLine={{ stroke: "#aaa" }}
          unit=" UAH"
        />
        <Tooltip
          formatter={(value) => `${value} UAH`}
          itemStyle={{ fontSize: "14px" }}
        />
        <Bar
          dataKey="amount"
          fillOpacity={1}
          radius={[10, 10, 0, 0]}
          barSize={40}
          label={{
            position: "top",
            fill: "#000",
            fontSize: 14,
            formatter: (value) => `${value} UAH`,
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
