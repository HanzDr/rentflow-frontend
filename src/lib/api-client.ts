const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5174/";

interface ApiRequestOptions extends RequestInit {
  body?: any;
}

export async function apiRequest<TResponse>(
  path: string,
  options: ApiRequestOptions = {}
): Promise<TResponse> {
  const { body, headers, ...rest } = options;

  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(headers ?? {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    ...rest,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));

    const msg = Array.isArray(err.message)
      ? err.message[0]
      : err.message || "Something went wrong";

    throw new Error(msg);
  }

  return res.json() as Promise<TResponse>;
}
