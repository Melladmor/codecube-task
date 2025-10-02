import { useState } from "react";
import type { UsePostResult } from "./type";

export const usePost = <T,>(): UsePostResult<T> => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const postData = async (
    url: string,
    body: any,
    options: RequestInit = {}
  ): Promise<void> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/${url}`, {
        method: options.method || "POST",
        headers: {
          "Content-Type": "application/json",
          ...(options.headers || {}),
        },
        body: JSON.stringify(body),
        ...options,
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(
          errData?.message || `Request failed with ${res.status}`
        );
      }

      const result: T = await res.json();
      setData(result);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Unexpected error");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, data, success, postData };
};
