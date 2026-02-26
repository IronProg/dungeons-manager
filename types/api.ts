export type ApiCallbacks<T> = {
  success?: (data: T) => void;
  error?: (error: string) => void;
};

export interface GlobalMutationVariables {
  supressError?: boolean;
  [key: string]: unknown; // Permite outras propriedades (nome, email, etc)
}
