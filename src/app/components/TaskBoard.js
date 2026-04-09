// ══════════════════════════════════════════════════════
// COMPONENT: TaskBoard
// PURPOSE:  The "brain" of the app. Owns task state,
//           handles filtering logic, and manages CRUD
//           operations for the task list.
// TYPE:     Client Component ('use client')
// ══════════════════════════════════════════════════════
'use client';

import { useState, useEffect } from 'react';
import AddTaskForm from './AddTaskForm';
import TaskList from './TaskList';
import TaskStats from './TaskStats';

// initialized to read localStorage
export default function TaskBoard() {
const [tasks, setTasks] = useState(() => {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem('tasks');
  return saved ? JSON.parse(saved) : [
    { id: 't1', title: 'Buy milk', done: false },
    { id: 't2', title: 'Write tests', done: false }
  ];
});
const [filter, setFilter] = useState('all');

// Sync tasks to localStorage whenever they change
useEffect(() => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}, [tasks]);

//Spread old array and add new object
function handleAddTask(title) { const newTask = { id: crypto.randomUUID(), title, done: false };
    setTasks([...tasks, newTask]);
  }

  // Toggle the "done" status of a task by mapping over the tasks and updating the matching one
function handleToggle(id) {
    setTasks(tasks.map((t) =>
      t.id === id ? { ...t, done: !t.done } : t
    ));
  }

  const completedCount = tasks.filter((t) => t.done).length;

  const visible = filter === 'all'
    ? tasks
    : filter === 'active'
      ? tasks.filter((t) => !t.done)
      : tasks.filter((t) => t.done);
      function handleDelete(id) {
// Removes all done tasks
  setTasks(tasks.filter((t) => t.id !== id));
}
function handleClearDone() {
  setTasks(tasks.filter((t) => !t.done));
}
     return (
    <div className="max-w-lg mx-auto bg-slate-900/40 backdrop-blur-md border border-slate-800 p-6 rounded-3xl shadow-xl">
      {/* Passing the correct function name 'handleAddTask' */}
      <AddTaskForm onAdd={handleAddTask} />

      {/* Stats component showing live updates */}
      <TaskStats 
        total={tasks.length} 
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