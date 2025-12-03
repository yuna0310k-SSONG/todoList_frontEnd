"use client";

import Header from "../components/Header";
import DigitalClock from "../components/DigitalClock";
import WeeklyView from "../components/WeeklyView";
import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";
import LoadingOverlay from "../components/LoadingOverlay";
import { useTheme } from "../hooks/useTheme";
import { useTodos } from "../hooks/useTodos";
import Status from "../components/Status";
import { useState, useMemo } from "react";
import { useHolidaysReady } from "../hooks/useHolidaysReady";
import { useTimeReady } from "../hooks/useTimeReady";
import { todayIso } from "../lib/date";

export default function HomePage() {
  const { theme, toggleTheme } = useTheme();
  const { todos, loading, error, addTodo, toggleTodo, editTitle, removeTodo, reorderTodos } = useTodos();
  const [selectedDate, setSelectedDate] = useState<string>(() => todayIso());
  const holidaysReady = useHolidaysReady();
  const timeReady = useTimeReady(200);

  const filtered = useMemo(() => todos.filter((t) => t.target_date?.slice(0, 10) === selectedDate), [todos, selectedDate]);

  if (loading || !timeReady || !holidaysReady) {
    return <LoadingOverlay />;
  }

  return (
    <main
      className="
        min-h-screen font-cute transition-colors
        bg-white text-gray-900 dark:bg-black dark:text-white
      "
    >
      <div className="max-w-3xl mx-auto p-6 flex flex-col gap-10">
        {/* HEADER */}
        <Header theme={theme} onToggle={toggleTheme} />

        {/* CLOCK */}
        <DigitalClock />
        {/* WEEKLY VIEW */}
        <WeeklyView selectedDate={selectedDate} onSelectDate={setSelectedDate} todos={todos} />

        {/* TODO INPUT */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Today&apos;s Tasks 🌱</h2>

          <TodoInput onAdd={(title) => addTodo(title, selectedDate)} />

          <Status loading={loading} error={error}>
            <TodoList
              todos={filtered}
              onToggle={toggleTodo}
              onDelete={removeTodo}
              onEdit={editTitle}
              onReorder={(source, dest) => {
                // Map indices within filtered list to indices in full list
                const fullIndices = filtered.map((item) => todos.findIndex((t) => t.id === item.id));
                const sourceFull = fullIndices[source];
                const destFull = fullIndices[dest];
                if (sourceFull === -1 || destFull === -1) return;
                reorderTodos(sourceFull, destFull);
              }}
            />
          </Status>
        </section>
      </div>
    </main>
  );
}
