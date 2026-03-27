import { STATUS_OPTIONS, PLATFORM_OPTIONS, LOCATION_OPTIONS } from "../../utils/helpers";
import "./Filters.css";

export default function Filters({ filters, onChange, onSort, sortBy }) {
  const handleFilter = (key, value) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div className="filters-bar">
      <div className="filter-group">
        <label>Status</label>
        <select
          value={filters.status}
          onChange={(e) => handleFilter("status", e.target.value)}
        >
          <option value="">All Statuses</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Platform</label>
        <select
          value={filters.platform}
          onChange={(e) => handleFilter("platform", e.target.value)}
        >
          <option value="">All Platforms</option>
          {PLATFORM_OPTIONS.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Location</label>
        <select
          value={filters.location}
          onChange={(e) => handleFilter("location", e.target.value)}
        >
          <option value="">All Locations</option>
          {LOCATION_OPTIONS.map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Sort By</label>
        <select value={sortBy} onChange={(e) => onSort(e.target.value)}>
          <option value="">Default</option>
          <option value="appliedDate">Applied Date</option>
          <option value="salary">Salary</option>
          <option value="company">Company Name</option>
        </select>
      </div>
    </div>
  );
}
