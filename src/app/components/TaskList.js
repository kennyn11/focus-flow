// ══════════════════════════════════════════════════════
// COMPONENT: TaskList
// PURPOSE:  Acts as a container that iterates over the 
//           filtered tasks array and renders a TaskCard 
//           for each item.
// TYPE:     Client Component ('use client')
// PROPS:    tasks (Array), onToggle (Fn), onDelete (Fn)
// ══════════════════════════════════════════════════════

'use client';

import TaskCard from './TaskCard';
export default function TaskList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return <p className="text-gray-400 p-4">No tasks yet!</p>;
  }
  return (
    <ul className="divide-y">
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskCard
            id={task.id}
            title={task.title}
            done={task.done}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        </li>
      ))}
    </ul>
  );
}