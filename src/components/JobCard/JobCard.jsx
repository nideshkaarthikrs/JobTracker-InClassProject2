import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MdEdit, MdDelete, MdBookmark, MdBookmarkBorder, MdLocationOn, MdCalendarToday } from "react-icons/md";
import { STATUS_COLORS, formatDate } from "../../utils/helpers";
import { getCompanyLogoUrl } from "../../services/api";
import { useApplications } from "../../hooks/useApplications";
import { toast } from "react-toastify";
import "./JobCard.css";

export default function JobCard({ job }) {
  const { deleteApplication, toggleBookmark } = useApplications();
  const navigate = useNavigate();

  function handleDelete() {
    const confirmed = window.confirm(
      `Delete application for ${job.role} at ${job.company}?`
    );
    if (confirmed) {
      deleteApplication(job.id);
      toast.success("Application deleted.");
    }
  }

  // clearbit gives us free company logos based on domain
  // just stripping spaces and adding .com — works most of the time
  const domain = job.company.toLowerCase().replace(/\s+/g, "") + ".com";
  const logoUrl = getCompanyLogoUrl(domain);

  return (
    <motion.div
      className="job-card"
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <div className="job-card-header">
        <div className="job-company-info">
          <img
            src={logoUrl}
            alt={job.company}
            className="company-logo"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
          {/* fallback if clearbit doesn't have the logo */}
          <div className="company-logo-fallback">
            {job.company.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="job-company">{job.company}</h3>
            <p className="job-role">{job.role}</p>
          </div>
        </div>
        <span
          className="status-badge"
          style={{
            backgroundColor: STATUS_COLORS[job.status] + "22",
            color: STATUS_COLORS[job.status],
          }}
        >
          {job.status}
        </span>
      </div>

      <div className="job-card-meta">
        <span className="meta-item">
          <MdLocationOn /> {job.location}
        </span>
        <span className="meta-item">
          <MdCalendarToday /> {formatDate(job.appliedDate)}
        </span>
        {job.salary && (
          <span className="meta-item salary">
            ${job.salary.toLocaleString()}/yr
          </span>
        )}
        {job.platform && (
          <span className="meta-item platform">{job.platform}</span>
        )}
      </div>

      {job.notes && <p className="job-notes">{job.notes}</p>}

      <div className="job-card-actions">
        <button
          className={`action-btn bookmark-btn ${job.bookmarked ? "active" : ""}`}
          onClick={() => toggleBookmark(job.id)}
          title="Bookmark"
        >
          {job.bookmarked ? <MdBookmark /> : <MdBookmarkBorder />}
        </button>
        <button
          className="action-btn edit-btn"
          onClick={() => navigate(`/applications/${job.id}`)}
          title="Edit"
        >
          <MdEdit />
        </button>
        <button
          className="action-btn delete-btn"
          onClick={handleDelete}
          title="Delete"
        >
          <MdDelete />
        </button>
      </div>
    </motion.div>
  );
}
