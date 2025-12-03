import { Todo } from "../types/todo";

export function replaceById(list: Todo[], updated: Todo): Todo[] {
  return list.map((t) => (t.id === updated.id ? updated : t));
}

export function toggleInList(list: Todo[], id: string): Todo[] {
  const now = new Date().toISOString();
  return list.map((t) => (t.id === id ? { ...t, completed: !t.completed, updatedAt: now } : t));
}
