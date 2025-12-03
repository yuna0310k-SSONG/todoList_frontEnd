"use client";

import { useState } from "react";
import { Todo } from "../types/todo";

type ItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string) => void;
};

function TodoItem({ todo, onToggle, onDelete, onEdit }: ItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(todo.title);
  return (
    <div
      className="
        flex justify-between items-center rounded-xl px-4 py-3 transition-colors
        bg-white border border-gray-200 shadow-[0_4px_12px_rgba(0,0,0,0.08)]
        dark:bg-[#0f0f10] dark:border-[#262626]
      "
    >
      <div className="flex items-start gap-3">
        <button
          className={`
              h-5 w-5 grid place-items-center rounded-md border transition flex-shrink-0
              border-gray-300 bg-white hover:bg-gray-100
              ${todo.completed ? "shadow-inner" : ""}
              dark:border-[#2a2a2a] dark:bg-[#0f0f10] dark:hover:bg-[#141414]
            `}
          onClick={() => onToggle(todo.id)}
          aria-pressed={todo.completed}
          title={todo.completed ? "완료됨" : "완료로 표시"}
        >
          {todo.completed && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-gray-500 dark:text-gray-300">
              <path
                fillRule="evenodd"
                d="M16.704 5.29a1 1 0 0 1 .006 1.414l-7.5 7.5a1 1 0 0 1-1.414 0l-3.5-3.5a1 1 0 1 1 1.414-1.414l2.793 2.793 6.793-6.793a1 1 0 0 1 1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
        <div className="flex flex-col gap-0.5">
          {isEditing ? (
            <input
              className="text-sm px-2 py-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:border-[#2a2a2a] dark:bg-[#0f0f10]"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const trimmed = draft.trim();
                  if (!trimmed) return;
                  onEdit(todo.id, trimmed);
                  setIsEditing(false);
                } else if (e.key === "Escape") {
                  setDraft(todo.title);
                  setIsEditing(false);
                }
              }}
            />
          ) : (
            <span className={`text-sm transition-colors ${todo.completed ? "line-through opacity-60" : ""}`} aria-checked={todo.completed}>
              {todo.title}
            </span>
          )}
          {Boolean(todo.description) && !isEditing && <span className="text-xs text-gray-600 dark:text-gray-300 opacity-80">{todo.description}</span>}
        </div>
      </div>

      <div className="flex gap-2">
        {!isEditing && (
          <button
            className="
              text-[0.7rem] px-2 py-1 rounded-lg border transition
              bg-gray-100 hover:bg-gray-200 text-gray-800 border-gray-200
              dark:bg-[#1a1a1a] dark:text-gray-200 dark:border-[#2a2a2a] dark:hover:bg-[#222]
            "
            onClick={() => {
              setDraft(todo.title);
              setIsEditing(true);
            }}
          >
            Edit
          </button>
        )}
        {isEditing && (
          <>
            <button
              className="text-[0.7rem] px-2 py-1 rounded-lg transition bg-gray-900 text-white hover:bg-black dark:bg-white dark:text-black dark:hover:bg-gray-200"
              onClick={() => {
                const trimmed = draft.trim();
                if (!trimmed) return;
                if (trimmed === todo.title) {
                  setIsEditing(false);
                  return;
                }
                onEdit(todo.id, trimmed);
                setIsEditing(false);
              }}
            >
              Save
            </button>
            <button
              className="text-[0.7rem] px-2 py-1 rounded-lg border transition bg-gray-100 hover:bg-gray-200 text-gray-800 border-gray-200 dark:bg-[#1a1a1a] dark:text-gray-200 dark:border-[#2a2a2a] dark:hover:bg-[#222]"
              onClick={() => {
                setDraft(todo.title);
                setIsEditing(false);
              }}
            >
              Cancel
            </button>
          </>
        )}
        <button
          className="
            text-[0.7rem] px-2 py-1 rounded-lg transition
            bg-gray-900 text-white hover:bg-black
            dark:bg-white dark:text-black dark:hover:bg-gray-200
          "
          onClick={() => onDelete(todo.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

type ListProps = {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string) => void;
  onReorder?: (sourceIndex: number, destIndex: number) => void;
};

export default function TodoList({ todos, onToggle, onDelete, onEdit, onReorder }: ListProps) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  return (
    <ul className="flex flex-col gap-3">
      {todos.map((t, index) => (
        <li
          key={t.id}
          draggable
          onDragStart={() => setDragIndex(index)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => {
            if (dragIndex === null || dragIndex === index) return;
            onReorder?.(dragIndex, index);
            setDragIndex(null);
          }}
          className={`group rounded-xl`}
        >
          <TodoItem todo={t} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
        </li>
      ))}
    </ul>
  );
}
