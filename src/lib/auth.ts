import { auth } from "./firebase";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

export const AUTH_KEY = "lorena_admin_auth"; // We keep this for immediate UI sync during router transitions

// Escucha el estado global de Firebase y actualiza localStorage
if (typeof window !== "undefined") {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      localStorage.setItem(AUTH_KEY, "true");
    } else {
      localStorage.removeItem(AUTH_KEY);
    }
  });
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(AUTH_KEY) === "true";
}

export async function login(email: string, password: string): Promise<boolean> {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    localStorage.setItem(AUTH_KEY, "true");
    return true;
  } catch (error) {
    console.error("Login failed:", error);
    return false;
  }
}

export async function logout(): Promise<void> {
  try {
    await signOut(auth);
    localStorage.removeItem(AUTH_KEY);
    window.location.href = "/admin/login";
  } catch (error) {
    console.error("Logout failed:", error);
  }
}
