import { api } from "./api";
import { Todo } from "../types/todo";

export async function listTodos(): Promise<Todo[]> {
  return api<Todo[]>("/todos", { method: "GET" });
}

export async function createTodo(payload: { title: string; description?: string; target_date?: string }): Promise<Todo> {
  return api<Todo>("/todos", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateTodo(id: string, patch: Partial<Pick<Todo, "title" | "completed" | "description">>): Promise<Todo> {
  return api<Todo>(`/todos/${id}`, {
    method: "PATCH",
    body: JSON.stringify(patch),
  });
}

export async function deleteTodo(id: string): Promise<void> {
  return api<void>(`/todos/${id}`, { method: "DELETE" });
}
