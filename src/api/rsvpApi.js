const BASE_URL = import.meta.env?.VITE_API_URL || "http://localhost:5000/api";

export async function fetchGuest(uniqueId) {
  const encodedId = encodeURIComponent(uniqueId);
  const res = await fetch(`${BASE_URL}/guest?id=${encodedId}`);
  if (!res.ok) {
    const error = await res.text();
    console.error("Fetch failed:", res.status, error);
    throw new Error("Failed to fetch guest");
  }
  return res.json();
}

export async function submitRsvp(data) {
  const res = await fetch(`${BASE_URL}/rsvp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to submit RSVP");
  return res.json();
}
