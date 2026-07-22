import { z } from 'zod';

const envSchema = z.object({
  // Zod проверит, что переменная есть, она является строкой и валидным URL
  DATABASE_URL: z
    .string()
    .url('DATABASE_URL отсутствует или не является валидным URL-адресом Postgres'),

  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

// Безопасно парсим текущие переменные окружения
const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Критическая ошибка конфигурации переменных окружения:');
  // Выводим ошибки в красивом читаемом формате JSON
  console.error(JSON.stringify(parsed.error.format(), null, 2));

  throw new Error('Некорректная конфигурация приложения. Проверьте файлы .env');
}

export const env = parsed.data;
