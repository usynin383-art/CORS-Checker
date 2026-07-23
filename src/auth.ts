import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig, // 2. Распаковываем базовые настройки (провайдеры и authorized)
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    ...authConfig.callbacks, // 3. Наследуем базовые колбэки
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
});
