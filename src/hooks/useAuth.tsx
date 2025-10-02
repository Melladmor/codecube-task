import { useState } from "react";
import type { UseAuthResult } from "./type";

export const useAuth = <T,>(): UseAuthResult<T> => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const getData = async (url: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/${url}`);
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const result: T = await res.json();
      setData(result);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, data, success, getData };
};
