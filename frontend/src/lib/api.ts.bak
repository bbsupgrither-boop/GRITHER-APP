const BASE = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
if (!BASE) console.error("VITE_API_URL Р Р…Р Вµ Р В·Р В°Р Т‘Р В°Р Р…");

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
  health: () => apiFetch("/healthz"),
};
