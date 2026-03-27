import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { MdArrowBack, MdSave } from "react-icons/md";
import { useApplications } from "../../hooks/useApplications";
import { STATUS_OPTIONS, PLATFORM_OPTIONS, LOCATION_OPTIONS } from "../../utils/helpers";
import "./ApplicationForm.css";

// validation schema
const schema = yup.object({
  company: yup.string().required("Company name is required"),
  role: yup.string().required("Job role is required"),
  appliedDate: yup.string().required("Applied date is required"),
  location: yup.string().required("Please select a location type"),
  salary: yup
    .number()
    .transform((val, orig) => (orig === "" ? undefined : val))
    .nullable()
    .min(0, "Salary must be positive"),
  platform: yup.string(),
  status: yup.string().required("Status is required"),
  interviewDate: yup.string(),
  notes: yup.string(),
});

function ApplicationForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const { addApplication, updateApplication, getApplication } = useApplications();

  const today = new Date().toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      company: "",
      role: "",
      location: "Remote",
      salary: "",
      platform: "LinkedIn",
      status: "Applied",
      appliedDate: today,
      interviewDate: "",
      notes: "",
    },
  });

  useEffect(() => {
    if (isEdit) {
      const existing = getApplication(id);
      if (existing) {
        reset({
          ...existing,
          salary: existing.salary || "",
        });
      } else {
        toast.error("Couldn't find that application.");
        navigate("/applications");
      }
    }
  }, [id]);

  function onSubmit(data) {
    const payload = {
      ...data,
      salary: data.salary ? Number(data.salary) : null,
    };

    if (isEdit) {
      updateApplication(id, payload);
      toast.success("Saved!");
    } else {
      addApplication(payload);
      toast.success("Application added!");
    }

    navigate("/applications");
  }

  return (
    <div className="form-page">
      <div className="form-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <MdArrowBack /> Back
        </button>
        <h1>{isEdit ? "Edit Application" : "Add New Application"}</h1>
      </div>

      <form className="app-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-grid">
          <div className="form-group">
            <label>Company Name *</label>
            <input {...register("company")} placeholder="e.g. Google" />
            {errors.company && <span className="error">{errors.company.message}</span>}
          </div>

          <div className="form-group">
            <label>Job Role *</label>
            <input {...register("role")} placeholder="e.g. Frontend Engineer" />
            {errors.role && <span className="error">{errors.role.message}</span>}
          </div>

          <div className="form-group">
            <label>Location Type *</label>
            <select {...register("location")}>
              {LOCATION_OPTIONS.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
            {errors.location && <span className="error">{errors.location.message}</span>}
          </div>

          <div className="form-group">
            <label>Salary (Annual)</label>
            <input
              type="number"
              {...register("salary")}
              placeholder="e.g. 120000"
              min="0"
            />
            {errors.salary && <span className="error">{errors.salary.message}</span>}
          </div>

          <div className="form-group">
            <label>Platform</label>
            <select {...register("platform")}>
              {PLATFORM_OPTIONS.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Status *</label>
            <select {...register("status")}>
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            {errors.status && <span className="error">{errors.status.message}</span>}
          </div>

          <div className="form-group">
            <label>Applied Date *</label>
            <input type="date" {...register("appliedDate")} />
            {errors.appliedDate && <span className="error">{errors.appliedDate.message}</span>}
          </div>

          <div className="form-group">
            <label>Interview Date</label>
            <input type="date" {...register("interviewDate")} />
          </div>

          {/* TODO: maybe add a file upload for resume later */}
          <div className="form-group full-width">
            <label>Notes</label>
            <textarea
              {...register("notes")}
              rows={3}
              placeholder="Any notes about this application..."
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button type="submit" className="btn-primary" disabled={isSubmitting}>
            <MdSave /> {isEdit ? "Save Changes" : "Add Application"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ApplicationForm;
