import TaskBoard from '@/components/TaskBoard';
const tasks = [
  { id: 1, title: 'Buy milk', done: false },
  { id: 2, title: 'Write tests', done: true },
  { id: 3, title: 'Ship it', done: false },
];

export default function HomePage() {
  return (
   <main className="min-h-screen py-12 px-4 flex justify-center items-start">
      <div className="w-full max-w-2xl">
        
        
        <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400 mb-8 text-center tracking-tight">
          Task Manager
        </h1>

        {/* handles all the Adding, Deleting, and LocalStorage logic. */}
        <TaskBoard />
        
      </div>
    </main>
  );
}