export const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, "") ||
  "https://srtcntbe.onrender.com";

const TOKEN_KEY = "jankaam.token";

export const tokenStore = {
  get(): string | null {
    try {
      return typeof window === "undefined" ? null : localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  },
  set(token: string) {
    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch { /* ignore */ }
  },
  clear() {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch { /* ignore */}
  },
};

export interface ApiUser {
  id: string;
  username?: string; // 👈 backend returns this
  phone: string;
  name?: string;
  village?: string;
  tier?: "bronze" | "silver" | "gold";
  role?: "user" | "admin";
}

export interface AuthResponse {
  token: string;
  user: ApiUser;
}

export class ApiError extends Error {
  status: number;
  payload: unknown;

  constructor(message: string, status: number, payload: unknown) {
    super(message);
    this.status = status;
    this.payload = payload;
  }
}

async function request<T>(
  path: string,
  init: RequestInit & { auth?: boolean } = {}
): Promise<T> {
  const headers = new Headers(init.headers);

  headers.set("Content-Type", "application/json");
  headers.set("Accept", "application/json");

  const token = tokenStore.get();
  if (init.auth && token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers,
  });

  const text = await res.text();

  let data: unknown = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!res.ok) {
    let message = `Request failed (${res.status})`;

    if (typeof data === "object" && data !== null) {
      const d = data as { error?: string | { message?: string } };

      if (typeof d.error === "string") {
        message = d.error;
      } else if (typeof d.error === "object" && d.error?.message) {
        message = d.error.message;
      }
    }

    throw new ApiError(message, res.status, data);
  }

  return data as T;
}

export const api = {
  signup(body: {
    phone: string;
    password: string;
    name?: string;
    village?: string;
    tier?: "bronze" | "silver" | "gold";
  }) {
    return request<AuthResponse>("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  // 🔥 FIXED LOGIN (IMPORTANT)
  login(body: { phone: string; password: string }) {
    return request<AuthResponse>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        username: body.phone, // 👈 backend expects username
        password: body.password,
      }),
    });
  },

  async loginOrSignup(body: {
    phone: string;
    password: string;
    name?: string;
    village?: string;
    tier?: "bronze" | "silver" | "gold";
  }) {
    console.log("Attempting login with phone:", body);
    try {
      const result = await api.login(body);
      console.log("Login successful:", result);
      return result;

    } catch (err) {
      if (err instanceof ApiError && (err.status === 401 || err.status === 404)) {
        return await api.signup(body);
      }
      throw err;
    }
  },
};