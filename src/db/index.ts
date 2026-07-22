import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '@/lib/env'; // Импортируем наш Zod-валидатор

const connectionString = env.DATABASE_URL;

const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined;
};

const queryClient =
  globalForDb.conn ??
  postgres(connectionString, {
    prepare: false, // Выключаем подготовленные выражения для совместимости с пулером Supabase
  });

if (env.NODE_ENV !== 'production') {
  globalForDb.conn = queryClient;
}

export const db = drizzle(queryClient);
