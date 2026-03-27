import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format, parseISO } from "date-fns";

export default function MonthlyChart({ applications }) {
  const monthMap = {};
  applications.forEach((app) => {
    if (!app.appliedDate) return;
    try {
      const month = format(parseISO(app.appliedDate), "MMM yyyy");
      monthMap[month] = (monthMap[month] || 0) + 1;
    } catch {
      // skip invalid dates
    }
  });

  const data = Object.entries(monthMap)
    .map(([month, count]) => ({ month, count }))
    .sort((a, b) => new Date(a.month) - new Date(b.month))
    .slice(-6);

  if (data.length === 0) {
    return <p className="empty-chart">No data to display</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
        <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
        <Tooltip />
        <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Applications" />
      </BarChart>
    </ResponsiveContainer>
  );
}
