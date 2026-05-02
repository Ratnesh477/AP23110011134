const BASE_URL = "/evaluation-service/notifications";
export const fetchNotifications = async (token, limit = 10, page = 1, type = "") => {
  const params = new URLSearchParams({
    limit: String(limit),
    page: String(page),
  });

  if (type) {
    params.set("notification_type", type);
  }

  const url = `${BASE_URL}?${params.toString()}`;

  if (!token) {
    console.warn("No API token provided. Please set REACT_APP_TOKEN in your environment.");
  }

  const res = await fetch(url, {
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API Error ${res.status}: ${text}`);
  }

  const data = await res.json();
  return data.notifications || [];
};