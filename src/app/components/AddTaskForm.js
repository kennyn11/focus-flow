// ══════════════════════════════════════════════════════
// COMPONENT: AddTaskForm
// PURPOSE:  A controlled form that allows users to type 
//           new tasks. It validates that the input isn't 
//           empty before sending data up to TaskBoard.
// TYPE:     Client Component ('use client')
// PROPS:    onAdd (Function) — callback to update parent state
// ══════════════════════════════════════════════════════

'use client';

import { useState } from 'react';

export default function AddTaskForm({ onAdd }) {
  const [title, setTitle] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title.trim());
    setTitle('');
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task..."
        className="flex-1 border rounded px-3 py-2 text-sm"
      />
      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-3 rounded-xl transition-all active:scale-95 shadow-lg shadow-indigo-500/20"
      >Add</button>
    </form>
  );
}