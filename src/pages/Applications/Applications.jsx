import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { MdAdd, MdWork } from "react-icons/md";
import { useApplications } from "../../hooks/useApplications";
import { useDebounce } from "../../hooks/useDebounce";
import SearchBar from "../../components/SearchBar/SearchBar";
import Filters from "../../components/Filters/Filters";
import JobCard from "../../components/JobCard/JobCard";
import "./Applications.css";

const TABS = ["All", "Applied", "Interviewing", "Offer Received", "Rejected"];

export default function Applications() {
  const { applications } = useApplications();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [filters, setFilters] = useState({ status: "", platform: "", location: "" });
  const [sortBy, setSortBy] = useState("");

  // debounce so we're not filtering on every single keystroke
  const debouncedSearch = useDebounce(searchQuery, 500);

  const filtered = useMemo(() => {
    let result = [...applications];

    if (activeTab !== "All") {
      result = result.filter((a) => a.status === activeTab);
    }

    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter(
        (a) =>
          a.company.toLowerCase().includes(q) ||
          a.role.toLowerCase().includes(q)
      );
    }

    if (filters.status) result = result.filter((a) => a.status === filters.status);
    if (filters.platform) result = result.filter((a) => a.platform === filters.platform);
    if (filters.location) result = result.filter((a) => a.location === filters.location);

    if (sortBy === "appliedDate") {
      result.sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate));
    } else if (sortBy === "salary") {
      result.sort((a, b) => (b.salary || 0) - (a.salary || 0));
    } else if (sortBy === "company") {
      result.sort((a, b) => a.company.localeCompare(b.company));
    }

    // console.log("filtered:", result.length);
    return result;
  }, [applications, activeTab, debouncedSearch, filters, sortBy]);

  // count per tab for the little badge numbers
  const tabCounts = {};
  TABS.forEach((tab) => {
    if (tab === "All") {
      tabCounts[tab] = applications.length;
    } else {
      tabCounts[tab] = applications.filter((a) => a.status === tab).length;
    }
  });

  return (
    <div className="applications-page">
      <div className="page-header">
        <div>
          <h1>Applications</h1>
          <p className="subtitle">{applications.length} total applications</p>
        </div>
        <button className="btn-primary" onClick={() => navigate("/applications/new")}>
          <MdAdd /> Add Application
        </button>
      </div>

      <div className="tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
            <span className="tab-count">{tabCounts[tab]}</span>
          </button>
        ))}
      </div>

      <div className="controls-bar">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <Filters filters={filters} onChange={setFilters} sortBy={sortBy} onSort={setSortBy} />
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <MdWork />
          <p>No applications found.</p>
          {applications.length === 0 && (
            <button className="btn-primary" onClick={() => navigate("/applications/new")}>
              <MdAdd /> Add Your First Application
            </button>
          )}
        </div>
      ) : (
        <div className="jobs-grid">
          <AnimatePresence>
            {filtered.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
