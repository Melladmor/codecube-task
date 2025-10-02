export const setLocalStorageItem = (key: string, value: any): void => {
  const stored = typeof value === "string" ? value : JSON.stringify(value);
  localStorage.setItem(key, stored);
};

export const getLocalStorageItem = <T,>(key: string): T | null => {
  const value = localStorage.getItem(key);
  if (!value) return null;

  try {
    return JSON.parse(value) as T;
  } catch {
    return value as unknown as T;
  }
};

export const removeLocalStorageItem = (key: string): void => {
  localStorage.removeItem(key);
};

export const validateUsername = (v: string) =>
  v.trim() === "" ? "Username is required" : "";

export const validatePassword = (v: string) => {
  const hasMinLen = v.length >= 8;
  const hasUpper = /[A-Z]/.test(v);
  const hasLower = /[a-z]/.test(v);
  const hasSpecial = /[^A-Za-z0-9]/.test(v);

  if (!hasMinLen) return "Password must be at least 8 characters";
  if (!hasUpper) return "Password must include an uppercase letter";
  if (!hasLower) return "Password must include a lowercase letter";
  if (!hasSpecial) return "Password must include a special character";
  return "";
};
