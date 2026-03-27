import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { STATUS_COLORS } from "../../utils/helpers";

export default function PipelineChart({ applications }) {
  const data = Object.entries(STATUS_COLORS).map(([status, color]) => ({
    name: status,
    value: applications.filter((a) => a.status === status).length,
    color,
  })).filter((d) => d.value > 0);

  if (data.length === 0) {
    return <p className="empty-chart">No data to display</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={3}
          dataKey="value"
        >
          {data.map((entry) => (
            <Cell key={entry.name} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`${value} jobs`, ""]} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
