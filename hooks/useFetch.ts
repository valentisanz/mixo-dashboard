import { useState, useEffect, useCallback } from "react";

const useFetch = <T>(
  url: string,
  method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE" = "GET",
  initialBody: any = null,
  options: RequestInit = {}
): {
  data: T | null;
  loading: boolean;
  error: string | null;
  executeFetch: (body?: any) => Promise<void>;
} => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [fetchUrl] = useState(url);
  const [fetchMethod] = useState(method);

  const executeFetch = useCallback(
    async (body: any = initialBody) => {
      setLoading(true);
      setError(null);

      const fetchOptions: RequestInit = {
        method: fetchMethod,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        body: body ? JSON.stringify(body) : null,
        ...options,
      };

      try {
        const response = await fetch(fetchUrl, fetchOptions);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const result: T = await response.json();
        setData(result);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    },
    [fetchUrl, fetchMethod, initialBody, options]
  );

  useEffect(() => {
    if (method === "GET" && url) {
      executeFetch();
    }
  }, [url]);

  return { data, loading, error, executeFetch };
};

export default useFetch;
