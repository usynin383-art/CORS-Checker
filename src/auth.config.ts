import type { NextAuthConfig } from 'next-auth';
import GitHub from 'next-auth/providers/github';

// Эта конфигурация будет использоваться исключительно в Middleware на Edge Runtime
export const authConfig = {
  providers: [GitHub], // Перечисляем провайдеры, этого достаточно для проверки сессии
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isApiScan = nextUrl.pathname.startsWith('/api/scan');

      // Если пользователь пытается зайти на дашборд или дернуть апи сканера
      if (isDashboard || isApiScan) {
        if (isLoggedIn) return true;
        return false; // Возвращаем false, чтобы сработал редирект
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
