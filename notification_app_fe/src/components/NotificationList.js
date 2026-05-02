const NotificationList = ({ notifications }) => {
  if (!notifications || notifications.length === 0) {
    return (
      <div style={styles.emptyState}>
        <p style={styles.emptyText}>No notifications yet.</p>
      </div>
    );
  }

  return (
    <div style={styles.listContainer}>
      {notifications.map((notification) => (
        <div key={notification.ID} style={styles.card}>
          <div style={styles.header}>
            <span style={styles.typeBadge}>{notification.Type}</span>
            <small style={styles.timestamp}>
              {new Date(notification.Timestamp).toLocaleString()}
            </small>
          </div>
          <p style={styles.message}>{notification.Message}</p>
        </div>
      ))}
    </div>
  );
};

const styles = {
  listContainer: {
    display: "grid",
    gap: "16px",
    marginTop: "20px",
  },
  card: {
    background: "#ffffff",
    border: "1px solid #e0e0e0",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
    padding: "16px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  typeBadge: {
    background: "#1976d2",
    color: "#ffffff",
    borderRadius: "999px",
    padding: "4px 12px",
    fontSize: "0.85rem",
    fontWeight: 600,
  },
  timestamp: {
    color: "#666",
    fontSize: "0.8rem",
  },
  message: {
    margin: 0,
    lineHeight: 1.6,
    color: "#333",
  },
  emptyState: {
    padding: "24px",
    textAlign: "center",
    border: "1px dashed #ccc",
    borderRadius: "12px",
    background: "#fafafa",
  },
  emptyText: {
    margin: 0,
    color: "#666",
    fontSize: "1rem",
  },
};

export default NotificationList;
