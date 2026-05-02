import React, { useEffect, useState } from "react";
import { fetchNotifications } from "../api/notificationApi";
import NotificationList from "../components/NotificationList";

const TOKEN = process.env.REACT_APP_TOKEN;

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [type, setType] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchNotifications(TOKEN, 10, page, type);
      setNotifications(data);
    } catch (err) {
      setError(err.message || "Unable to load notifications.");
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [type, page]);

  useEffect(() => {
    setPage(1);
  }, [type]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Notifications</h2>

      {/* Filter */}
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="">All</option>
        <option value="Event">Event</option>
        <option value="Result">Result</option>
        <option value="Placement">Placement</option>
      </select>

      {error && <p style={{ color: "#d32f2f" }}>{error}</p>}
      {loading ? (
        <p>Loading notifications...</p>
      ) : (
        <NotificationList notifications={notifications} />
      )}

      {/* Pagination */}
      <div style={{ marginTop: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
        <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}>
          Prev
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default NotificationPage;