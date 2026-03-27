import { createContext, useState, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { SAMPLE_JOBS, generateId } from "../utils/helpers";

export const ApplicationContext = createContext(null);

export function ApplicationProvider({ children }) {
  const [applications, setApplications] = useLocalStorage(
    "job_applications",
    SAMPLE_JOBS
  );
  // TODO: use this for showing a spinner when fetching from an API later
  const [loading, setLoading] = useState(false);

  const addApplication = (data) => {
    const newApp = {
      ...data,
      id: generateId(),
      bookmarked: false,
    };
    setApplications((prev) => [newApp, ...prev]);
    return newApp;
  };

  const updateApplication = (id, updatedData) => {
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id === id) {
          return { ...app, ...updatedData };
        }
        return app;
      })
    );
  };

  const deleteApplication = (id) => {
    setApplications((prev) => prev.filter((app) => app.id !== id));
  };

  const toggleBookmark = (id) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, bookmarked: !app.bookmarked } : app
      )
    );
  };

  const getApplication = (id) => {
    return applications.find((app) => app.id === id);
  };

  return (
    <ApplicationContext.Provider
      value={{
        applications,
        loading,
        addApplication,
        updateApplication,
        deleteApplication,
        toggleBookmark,
        getApplication,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
}
