export type UsePostResult<T> = {
  loading: boolean;
  error: string | null;
  data: T | null;
  postData: (url: string, body: any, options?: RequestInit) => Promise<void>;
};

export type UseAuthResult<T> = {
  loading: boolean;
  error: string | null;
  success: boolean;
  data: T | null;
  getData: (url: string) => Promise<void>;
};
