export default function TaskStats({ total, active, completed, onClear }) {
  return (
    <div className="flex justify-between items-center mb-4 text-sm text-slate-400">
      <span>{active} active / {completed} done</span>
      {completed > 0 && (
        <button onClick={onClear} className="text-indigo-400 hover:underline">
          Clear Completed!
        </button>
      )}
    </div>
  );
}