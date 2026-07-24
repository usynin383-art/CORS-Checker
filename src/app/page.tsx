import { env } from '@/lib/env';

export default function Home() {
  // Выведем варнинг в консоль сервера для проверки
  console.warn('🚀 Node Env state checked by Zod:', env.NODE_ENV);

  return (
    <main className="p-8">
      <p>main page</p>
    </main>
  );
}
