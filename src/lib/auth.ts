export const AUTH_KEY = "lorena_admin_auth";

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(AUTH_KEY) === "true";
}

export async function login(password: string): Promise<boolean> {
  // Simulating network delay
  await new Promise((resolve) => setTimeout(resolve, 800));
  
  // Fake simple password for now
  if (password === "admin123") {
    localStorage.setItem(AUTH_KEY, "true");
    return true;
  }
  return false;
}

export function logout(): void {
  localStorage.removeItem(AUTH_KEY);
  window.location.href = "/admin/login";
}
