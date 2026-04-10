'use client';

import { useState, useEffect } from 'react';
import AddTaskForm from './AddTaskForm';
import TaskList from './TaskList';
import TaskStats from './TaskStats';

export default function TaskBoard() {
  // 1. START BLANK: We must start with an empty array [] to match the server.
  const [tasks, setTasks] = useState([]);
  const [hasMounted, setHasMounted] = useState(false);
  const [filter, setFilter] = useState('all');

  // 2. THE MOUNT HANDSHAKE: This runs ONLY in the browser after the page loads.
  useEffect(() => {
    const saved = localStorage.getItem('tasks');
    if (saved) {
      setTasks(JSON.parse(saved));
    } else {
      // Default tasks for first-time visitors
      setTasks([
        { id: 't1', title: 'Buy milk', done: false },
        { id: 't2', title: 'Write tests', done: false }
      ]);
    }
    setHasMounted(true); // Now it's safe to show the list!
  }, []);

  // 3. PERSISTENCE: Save to localStorage whenever tasks change.
  useEffect(() => {
    if (hasMounted) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks, hasMounted]);

  // --- HANDLERS ---
  function handleAddTask(title) {
    const newTask = { id: crypto.randomUUID(), title, done: false };
    setTasks([...tasks, newTask]);
  }

  function handleToggle(id) {
    setTasks(tasks.map((t) =>
      t.id === id ? { ...t, done: !t.done } : t
    ));
  }

  function handleDelete(id) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  function handleClearDone() {
    setTasks(tasks.filter((t) => !t.done));
  }

  // --- LOGIC ---
  const completedCount = tasks.filter((t) => t.done).length;
  const activeCount = tasks.length - completedCount;

  const visible = filter === 'all'
    ? tasks
    : filter === 'active'
      ? tasks.filter((t) => !t.done)
      : tasks.filter((t) => t.done);

  // 4. THE GUARD: If we haven't mounted, show a simple loading shell.
  if (!hasMounted) {
    return (
      <div className="max-w-lg mx-auto p-12 text-center italic text-slate-500 animate-pulse">
        Syncing FocusFlow...
      </div>
    );
  }

  // 5. THE MAIN UI
  return (
    <div className="max-w-lg mx-auto bg-slate-900/40 backdrop-blur-md border border-slate-800 p-6 rounded-3xl shadow-xl">
      <AddTaskForm onAdd={handleAddTask} />

      <TaskStats 
        total={tasks.length} 
        active={activeCount}
        completed={completedCount} 
        onClear={handleClearDone} 
      />

      <div className="flex gap-2 mb-6">
        {['all', 'active', 'done'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl transition-all ${
              filter === f
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <TaskList 
        tasks={visible} 
        onToggle={handleToggle} 
        onDelete={handleDelete} 
      />
    </div>
  );
}