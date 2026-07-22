import { env } from '@/lib/env';

export default function Home() {
  // Выведем варнинг в консоль сервера для проверки
  console.warn('🚀 Node Env state checked by Zod:', env.NODE_ENV);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold text-accent">CORS Configuration Checker</h1>
    </main>
  );
}
