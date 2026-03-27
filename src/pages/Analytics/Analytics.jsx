import { useApplications } from "../../hooks/useApplications";
import PipelineChart from "../../components/Charts/PipelineChart";
import MonthlyChart from "../../components/Charts/MonthlyChart";
import { STATUS_COLORS } from "../../utils/helpers";
import "./Analytics.css";

export default function Analytics() {
  const { applications } = useApplications();

  if (applications.length === 0) {
    return (
      <div className="analytics-page">
        <h1>Analytics</h1>
        <div className="empty-state">
          <p>No data yet. Start adding applications to see analytics.</p>
        </div>
      </div>
    );
  }

  const total = applications.length;

  // build status breakdown
  const byStatus = Object.entries(STATUS_COLORS).map(([status, color]) => {
    const count = applications.filter((a) => a.status === status).length;
    const pct = Math.round((count / total) * 100);
    return { status, color, count, pct };
  });

  // average salary from apps that actually have a salary listed
  const withSalary = applications.filter((a) => a.salary > 0);
  const avgSalary =
    withSalary.length > 0
      ? Math.round(withSalary.reduce((sum, a) => sum + a.salary, 0) / withSalary.length)
      : null;

  // count applications per platform
  const platformCounts = {};
  applications.forEach((a) => {
    if (a.platform) {
      platformCounts[a.platform] = (platformCounts[a.platform] || 0) + 1;
    }
  });
  const topPlatforms = Object.entries(platformCounts).sort((a, b) => b[1] - a[1]);

  // anyone who responded (not just "Applied" still) counts as a response
  const responded = applications.filter((a) => a.status !== "Applied").length;
  const responseRate = Math.round((responded / total) * 100);

  return (
    <div className="analytics-page">
      <div className="page-header">
        <h1>Analytics</h1>
        <p className="subtitle">Insights from {total} applications</p>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <p className="kpi-value">{total}</p>
          <p className="kpi-label">Total Applications</p>
        </div>
        <div className="kpi-card">
          <p className="kpi-value">{responseRate}%</p>
          <p className="kpi-label">Response Rate</p>
        </div>
        {avgSalary && (
          <div className="kpi-card">
            <p className="kpi-value">${avgSalary.toLocaleString()}</p>
            <p className="kpi-label">Avg. Salary Target</p>
          </div>
        )}
        <div className="kpi-card">
          <p className="kpi-value">{applications.filter((a) => a.bookmarked).length}</p>
          <p className="kpi-label">Bookmarked</p>
        </div>
      </div>

      <div className="analytics-row">
        <div className="chart-card">
          <h2>Application Pipeline</h2>
          <PipelineChart applications={applications} />
        </div>
        <div className="chart-card">
          <h2>Monthly Trend</h2>
          <MonthlyChart applications={applications} />
        </div>
      </div>

      <div className="analytics-row">
        <div className="chart-card breakdown-card">
          <h2>Status Breakdown</h2>
          <div className="breakdown-list">
            {byStatus.map(({ status, color, count, pct }) => (
              <div key={status} className="breakdown-item">
                <div className="breakdown-label">
                  <span className="dot" style={{ background: color }} />
                  <span>{status}</span>
                </div>
                <div className="breakdown-bar-wrap">
                  <div
                    className="breakdown-bar"
                    style={{ width: `${pct}%`, background: color }}
                  />
                </div>
                <span className="breakdown-count">{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-card breakdown-card">
          <h2>Top Platforms</h2>
          <div className="breakdown-list">
            {topPlatforms.map(([platform, count]) => (
              <div key={platform} className="breakdown-item">
                <div className="breakdown-label">
                  <span>{platform}</span>
                </div>
                <div className="breakdown-bar-wrap">
                  <div
                    className="breakdown-bar"
                    style={{
                      width: `${Math.round((count / total) * 100)}%`,
                      background: "#3b82f6",
                    }}
                  />
                </div>
                <span className="breakdown-count">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
