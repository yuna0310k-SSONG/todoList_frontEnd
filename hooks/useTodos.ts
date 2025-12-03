"use client";

import { useCallback, useEffect, useState } from "react";
import { Todo } from "../types/todo";
import { hasApiBase } from "../lib/api";
import { listTodos, createTodo, updateTodo, deleteTodo } from "../lib/todos";
import { replaceById, toggleInList } from "../lib/todoUtils";

const LS_KEY = "todos";
const LS_ORDER_KEY = "todos_order";

function loadFromLocal(): Todo[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Todo[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveToLocal(todos: Todo[]) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(todos));
  } catch {}
}

function loadOrder(): string[] {
  try {
    const raw = localStorage.getItem(LS_ORDER_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as string[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveOrder(order: string[]) {
  try {
    localStorage.setItem(LS_ORDER_KEY, JSON.stringify(order));
  } catch {}
}

function applyOrder(data: Todo[], order: string[]): Todo[] {
  if (!order.length) return data;
  const byId = new Map(data.map((t) => [t.id, t]));
  const orderedPart: Todo[] = [];
  for (const id of order) {
    const item = byId.get(id);
    if (item) {
      orderedPart.push(item);
      byId.delete(id);
    }
  }
  // Append any items not in order array (e.g., new ones)
  const remaining = Array.from(byId.values());
  return [...orderedPart, ...remaining];
}

export function useTodos() {
  const useApi = hasApiBase();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const order = loadOrder();
        const data = useApi ? await listTodos() : loadFromLocal();
        const ordered = applyOrder(data, order);
        if (!cancelled) setTodos(ordered);
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Failed to load";
        if (!cancelled) setError(msg);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [useApi]);

  const addTodo = useCallback(
    async (title: string, target_date?: string, description?: string) => {
      const trimmed = title.trim();
      if (!trimmed) return;
      if (useApi) {
        const created = await createTodo({ title: trimmed, description, target_date });
        setTodos((prev) => [created, ...prev]);
      } else {
        const newTodo: Todo = {
          id: crypto.randomUUID(),
          title: trimmed,
          description,
          completed: false,
          createdAt: new Date().toISOString(),
          target_date,
        };
        setTodos((prev) => {
          const next = [newTodo, ...prev];
          saveToLocal(next);
          return next;
        });
      }
    },
    [useApi]
  );
  const editTitle = useCallback(
    async (id: string, title: string) => {
      const trimmed = title.trim();
      if (!trimmed) return;
      if (useApi) {
        const updated = await updateTodo(id, { title: trimmed });
        setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
      } else {
        setTodos((prev) => {
          const next = prev.map((t) => (t.id === id ? { ...t, title: trimmed, updatedAt: new Date().toISOString() } : t));
          saveToLocal(next);
          return next;
        });
      }
    },
    [useApi]
  );
  const toggleTodo = useCallback(
    async (id: string) => {
      if (useApi) {
        const target = todos.find((t) => t.id === id);
        if (!target) return;
        const updated = await updateTodo(id, { completed: !target.completed });
        setTodos((prev) => replaceById(prev, updated));
      } else {
        setTodos((prev) => {
          const next = toggleInList(prev, id);
          saveToLocal(next);
          return next;
        });
      }
    },
    [useApi, todos]
  );
  const removeTodo = useCallback(
    async (id: string) => {
      if (useApi) {
        try {
          await deleteTodo(id);
          setTodos((prev) => prev.filter((t) => t.id !== id));
        } catch {
          // 서버가 500을 반환하는 경우 알림 표시 후 새로고침
          if (typeof window !== "undefined") {
            alert("이미 삭제된 글입니다");
            window.location.reload();
          }
        }
      } else {
        setTodos((prev) => {
          const next = prev.filter((t) => t.id !== id);
          saveToLocal(next);
          return next;
        });
      }
    },
    [useApi]
  );

  const reorderTodos = useCallback(
    (sourceIndex: number, destIndex: number) => {
      setTodos((prev) => {
        if (sourceIndex === destIndex) return prev;
        const next = [...prev];
        const [moved] = next.splice(sourceIndex, 1);
        next.splice(destIndex, 0, moved);
        // Persist global order of IDs so refresh retains ordering
        const order = next.map((t) => t.id);
        saveOrder(order);
        if (!useApi) saveToLocal(next);
        return next;
      });
    },
    [useApi]
  );

  return { todos, loading, error, addTodo, toggleTodo, editTitle, removeTodo, reorderTodos };
}
