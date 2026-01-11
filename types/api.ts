export type ApiCallbacks<T> = {
  success?: (data: T) => void;
  error?: (error: string) => void;
};
