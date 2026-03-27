import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MdWork, MdEvent, MdCheckCircle, MdCancel, MdAdd, MdBookmark } from "react-icons/md";
import { useApplications } from "../../hooks/useApplications";
import PipelineChart from "../../components/Charts/PipelineChart";
import MonthlyChart from "../../components/Charts/MonthlyChart";
import { formatDate, STATUS_COLORS } from "../../utils/helpers";
import "./Dashboard.css";

// little stat card component, keeping it in this file since it's only used here
function StatCard({ label, value, icon, color }) {
  return (
    <motion.div
      className="stat-card"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{ borderTopColor: color }}
    >
      <div className="stat-icon" style={{ background: color + "22", color }}>
        {icon}
      </div>
      <div>
        <p className="stat-value">{value}</p>
        <p className="stat-label">{label}</p>
      </div>
    </motion.div>
  );
}

export default function Dashboard() {
  const { applications } = useApplications();
  const navigate = useNavigate();

  const totalApps = applications.length;
  const interviewing = applications.filter((a) => a.status === "Interviewing").length;
  const offers = applications.filter((a) => a.status === "Offer Received").length;
  const rejected = applications.filter((a) => a.status === "Rejected").length;

  // show the 5 most recently applied
  const recent = [...applications]
    .sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate))
    .slice(0, 5);

  return (
    <div className="dashboard">
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p className="subtitle">Overview of your job search progress</p>
        </div>
        <button className="btn-primary" onClick={() => navigate("/applications/new")}>
          <MdAdd /> Add Application
        </button>
      </div>

      <div className="stats-grid">
        <StatCard label="Total Applications" value={totalApps} icon={<MdWork />} color="#3b82f6" />
        <StatCard label="Interviewing" value={interviewing} icon={<MdEvent />} color="#f59e0b" />
        <StatCard label="Offers Received" value={offers} icon={<MdCheckCircle />} color="#10b981" />
        <StatCard label="Rejected" value={rejected} icon={<MdCancel />} color="#ef4444" />
      </div>

      <div className="charts-row">
        <div className="chart-card">
          <h2>Application Pipeline</h2>
          <PipelineChart applications={applications} />
        </div>
        <div className="chart-card">
          <h2>Monthly Applications</h2>
          <MonthlyChart applications={applications} />
        </div>
      </div>

      <div className="recent-section">
        <div className="section-header">
          <h2>Recent Applications</h2>
          <button className="btn-link" onClick={() => navigate("/applications")}>
            View All
          </button>
        </div>
        {recent.length === 0 ? (
          <div className="empty-state">
            <MdWork />
            <p>No applications yet. Add your first one!</p>
            <button className="btn-primary" onClick={() => navigate("/applications/new")}>
              <MdAdd /> Add Application
            </button>
          </div>
        ) : (
          <div className="recent-table">
            <table>
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Applied Date</th>
                  <th>Salary</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((job) => (
                  <tr
                    key={job.id}
                    onClick={() => navigate(`/applications/${job.id}`)}
                    className="table-row"
                  >
                    <td>
                      <div className="table-company">
                        {job.bookmarked && <MdBookmark className="bookmark-icon" />}
                        {job.company}
                      </div>
                    </td>
                    <td>{job.role}</td>
                    <td>
                      <span
                        className="status-badge"
                        style={{
                          backgroundColor: STATUS_COLORS[job.status] + "22",
                          color: STATUS_COLORS[job.status],
                        }}
                      >
                        {job.status}
                      </span>
                    </td>
                    <td>{formatDate(job.appliedDate)}</td>
                    <td>{job.salary ? `$${job.salary.toLocaleString()}` : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
