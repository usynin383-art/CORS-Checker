import { handlers } from '@/auth';

// Экспортируем GET и POST обработчики, которые NextAuth подготовил для нас
export const { GET, POST } = handlers;
