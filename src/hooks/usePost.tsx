import { useState } from "react";
import type { UseApiResult } from "./type";

export const useApi = <T,>(): UseApiResult<T> => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);
  const [success, setSuccess] = useState(false);

  const request = async (
    url: string,
    body?: any,
    options: RequestInit = {}
  ): Promise<void> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const method = options.method || "POST";

      const res = await fetch(`${import.meta.env.VITE_API_URL}/${url}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(options.headers || {}),
        },
        body:
          method === "GET" || method === "DELETE"
            ? undefined
            : JSON.stringify(body),
        ...options,
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(
          errData?.message || `Request failed with ${res.status}`
        );
      }

      // بعض الـ APIs بيرجع 204 (no content) خاصة بالـ DELETE
      const result: T = res.status !== 204 ? await res.json() : (null as any);
      setData(result);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Unexpected error");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, data, success, request };
};
