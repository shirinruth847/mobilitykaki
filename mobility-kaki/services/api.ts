// services/api.ts
import { API_BASE_URL } from "@/constants/api";

export async function checkHealth() {
  const response = await fetch(`${API_BASE_URL}/api/health`);
  if (!response.ok) throw new Error("Request failed");
  return response.json();
}

export async function getJourney(origin: string, destination: string) {
  const response = await fetch(`${API_BASE_URL}/api/journey`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ origin, destination }),
  });
  if (!response.ok) throw new Error("Request failed");
  return response.json();
}
