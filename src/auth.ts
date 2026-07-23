import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import { db } from '@/db'; // Проверь, что этот путь совпадает с твоим экспортом инстанса db
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    ...authConfig.callbacks,

    async signIn({ user }) {
      if (!user.email || !user.id) return false;

      try {
        // 1. Ищем пользователя в БД по email
        const existingUser = await db
          .select()
          .from(users)
          .where(eq(users.email, user.email))
          .limit(1);

        // 2. Если пользователя нет в базе — создаем его
        if (existingUser.length === 0) {
          const dbUserId = crypto.randomUUID();

          await db.insert(users).values({
            id: dbUserId,
            email: user.email,
          });

          // Подменяем ID в объекте, чтобы Auth.js записал в JWT именно UUID из базы
          user.id = dbUserId;
          console.log(`[DB] New user created: ${user.email} with UUID: ${dbUserId}`);
        } else {
          // Если пользователь уже существует, берем его UUID из базы для сессии
          user.id = existingUser[0].id;
        }

        return true;
      } catch (error) {
        console.error('Error synchronizing user profile to DB:', error);
        return false;
      }
    },

    async jwt({ token, user }) {
      // При первой авторизации или создании юзера прокидываем UUID в токен
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      // Переносим UUID из токена в объект сессии для фронтенда
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
