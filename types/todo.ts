export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string; // ISO date
  updatedAt?: string; // ISO date
  target_date?: string; // YYYY-MM-DD
}
