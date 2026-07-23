import { pgTable, uuid, text, timestamp, index, pgEnum } from 'drizzle-orm/pg-core';

// 1. СТРОГИЕ ENUMS (Валидация типов данных прямо внутри PostgreSQL)
export const scanStatusEnum = pgEnum('scan_status', ['success', 'failed', 'error']);
export const riskLevelEnum = pgEnum('risk_level', ['none', 'low', 'medium', 'high', 'critical']);

// 2. ТАБЛИЦА ПОЛЬЗОВАТЕЛЕЙ (Сюда будут падать юзеры после авторизации)
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 3. ТАБЛИЦА ПРОЕКТОВ (Для группировки сайтов пользователя)
export const projects = pgTable(
  'projects',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .references(() => users.id, { onDelete: 'cascade' })
      .notNull(),
    name: text('name').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => [
    index('projects_user_id_idx').on(table.userId), // Мгновенная выборка проектов для сайдбара
  ]
);

// 4. ТАБЛИЦА ИСТОРИИ CORS-СКАНИРОВАНИЙ
export const scanHistory = pgTable(
  'scan_history',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .references(() => users.id, { onDelete: 'cascade' })
      .notNull(),
    projectId: uuid('project_id').references(() => projects.id, { onDelete: 'cascade' }), // null, если сканируют без создания проекта
    targetUrl: text('target_url').notNull(),
    status: scanStatusEnum('status').default('success').notNull(),
    riskScore: riskLevelEnum('risk_score').default('none').notNull(),

    // payload хранит сырой JSON ответа серверов (все заголовки и результаты тестов безопасности)
    payload: text('payload'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => [
    index('scan_history_user_id_idx').on(table.userId),
    index('scan_history_project_id_idx').on(table.projectId),
    index('scan_history_created_at_idx').on(table.createdAt), // Сортировка логов по дате в Dashboard
  ]
);
