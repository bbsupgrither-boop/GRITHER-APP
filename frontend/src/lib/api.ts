const BASE = (import.meta.env.VITE_API_URL || "http://localhost:3001").replace(/\/$/, "");
if (!import.meta.env.VITE_API_URL) console.warn("VITE_API_URL РЅРµ Р·Р°РґР°РЅ; РёСЃРїРѕР»СЊР·СѓРµС‚СЃСЏ http://localhost:3001");

export async function apiFetch(path: string, init?: RequestInit) {
  const res = await fetch(`${BASE}${path.startsWith("/") ? path : `/${path}`}`, {
    headers: { "Content-Type": "application/json" },
    ...init
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}

// API endpoints
export const api = {
  tasks: () => apiFetch("/api/tasks"),
  achievements: () => apiFetch("/api/achievements"),
  shop: () => apiFetch("/api/shop"),
  health: () => apiFetch("/api/health"),
};
