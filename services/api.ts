import { supabase } from "../config/supabase";

export function getApiBaseUrl(): string {
  return process.env.EXPO_PUBLIC_API_URL?.replace(/\/$/, "") ?? "";
}

export async function fetchWithAuth(
  path: string,
  init: RequestInit = {},
): Promise<Response> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  const headers = new Headers(init.headers);
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  const base = getApiBaseUrl();
  const url =
    path.startsWith("http") || !base ? path : `${base}${path.startsWith("/") ? "" : "/"}${path}`;
  return fetch(url, { ...init, headers });
}

export async function apiJson<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const base = getApiBaseUrl();
  if (!base) {
    throw new Error(
      "Configura EXPO_PUBLIC_API_URL (ej. http://localhost:3000 en .env)",
    );
  }
  const res = await fetchWithAuth(path, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init.headers as Record<string, string>),
    },
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(text || res.statusText);
  }
  if (res.status === 204 || !text) {
    return undefined as T;
  }
  return JSON.parse(text) as T;
}
