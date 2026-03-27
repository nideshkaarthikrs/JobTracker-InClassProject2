import { AnimatePresence } from "framer-motion";
import { MdBookmark } from "react-icons/md";
import { useApplications } from "../../hooks/useApplications";
import JobCard from "../../components/JobCard/JobCard";
import "./Bookmarks.css";

export default function Bookmarks() {
  const { applications } = useApplications();
  const bookmarked = applications.filter((a) => a.bookmarked);

  return (
    <div className="bookmarks-page">
      <div className="page-header">
        <h1>Bookmarks</h1>
        <p className="subtitle">{bookmarked.length} bookmarked application{bookmarked.length !== 1 ? "s" : ""}</p>
      </div>

      {bookmarked.length === 0 ? (
        <div className="empty-state">
          <MdBookmark />
          <p>No bookmarked applications yet.</p>
          <span>Click the bookmark icon on any job card to save it here.</span>
        </div>
      ) : (
        <div className="jobs-grid">
          <AnimatePresence>
            {bookmarked.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
