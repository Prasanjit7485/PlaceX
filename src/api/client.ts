const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

async function request<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  const publicEndpoints = [
    "/auth/",
    "/users/register",
    "/recruiters/register",
    "/students/add",
    "/alumni/add",
  ];

  const isPublicEndpoint = publicEndpoints.some((path) =>
    endpoint.startsWith(path)
  );

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((options?.headers as Record<string, string>) || {}),
  };

  if (!isPublicEndpoint && token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    if (response.status === 401) {
      if (typeof window !== "undefined" && !isPublicEndpoint) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        window.dispatchEvent(new Event("auth:unauthorized"));
      }
    }

    const errorText = await response.text();

    let errorMessage = errorText;

    try {
      const jsonErr = JSON.parse(errorText);

      if (jsonErr && typeof jsonErr === "object") {
        if (
          typeof jsonErr.message === "string" &&
          jsonErr.message
        ) {
          errorMessage = jsonErr.message;
        } else if (
          typeof jsonErr.error === "string" &&
          jsonErr.error
        ) {
          errorMessage = jsonErr.error;
        } else {
          const values = Object.entries(jsonErr)
            .map(([k, v]) => (typeof v === "string" ? `${k}: ${v}` : null))
            .filter(Boolean);
          if (values.length > 0) {
            errorMessage = values.join(", ");
          }
        }
      }
    } catch {
      // Not JSON, use errorText
    }

    throw new Error(
      errorMessage ||
        `API request failed with status ${response.status}`
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