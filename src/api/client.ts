const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

async function request<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...((options?.headers as Record<string, string>) || {}),
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    if (response.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        window.dispatchEvent(new Event("auth:unauthorized"));
      }
    }
    const errorText = await response.text();
    let errorMessage = errorText;
    try {
      const jsonErr = JSON.parse(errorText);
      if (jsonErr && typeof jsonErr === "object") {
        if (typeof jsonErr.message === "string" && jsonErr.message) {
          errorMessage = jsonErr.message;
        } else if (typeof jsonErr.error === "string" && jsonErr.error) {
          errorMessage = jsonErr.error;
        }
      }
    } catch {
      // Not JSON, use errorText
    }
    throw new Error(
      errorMessage || `API request failed with status ${response.status}`
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const text = await response.text();
  if (!text) {
    return undefined as T;
  }

  try {
    return JSON.parse(text);
  } catch {
    return text as unknown as T;
  }
}

export default request;