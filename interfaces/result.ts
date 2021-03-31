export interface Result<T> {
  isSuccessful: boolean;
  data?: T;
  error?: string;
}
