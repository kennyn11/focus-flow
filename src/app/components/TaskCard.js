// ══════════════════════════════════════════════════════
// COMPONENT: TaskCard
// PURPOSE:  Displays the title and status of a single task.
//           Contains buttons to trigger status toggles 
//           or task removal.
// TYPE:     Client Component ('use client')
// PROPS:    task (Object), onToggle (Fn), onDelete (Fn)
// ══════════════════════════════════════════════════════

'use client';

export default function TaskCard({ task, onToggle, onDelete }) {
    const titleStyle = task.done 
    ? 'line-through text-slate-500 italic' 
    : 'text-slate-100 font-medium';

 return (
    <div className="group flex items-center justify-between p-4 bg-slate-800/40 border border-slate-700 rounded-2xl hover:border-indigo-500/50 transition-all">
      <div className="flex items-center gap-4">
        <button
          onClick={() => onToggle(task.id)}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
            ${task.done ? 'bg-emerald-500 border-emerald-500' : 'border-slate-500 hover:border-indigo-400'}`}
        >
          {task.done && (
            <svg className="w-4 h-4 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>

        <span className={`text-base transition-all ${titleStyle}`}>
          {task.title}
        </span>
      </div>
      <button
        onClick={() => onDelete(task.id)}
        className="opacity-0 group-hover:opacity-100 p-2 text-slate-500 hover:text-red-400 transition-all"
        aria-label="Delete"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
}