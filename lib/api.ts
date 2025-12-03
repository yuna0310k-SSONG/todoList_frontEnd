const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

export async function api<T>(path: string, options: RequestInit & { method?: HttpMethod } = {}): Promise<T> {
  const url = `${BASE_URL}${path}`;
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  const res = await fetch(url, {
    method: options.method || "GET",
    headers,
    body: options.body,
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${res.status} ${res.statusText}: ${text}`);
  }

  if (res.status === 204) return undefined as unknown as T;
  return (await res.json()) as T;
}

export function hasApiBase(): boolean {
  return !!BASE_URL;
}
