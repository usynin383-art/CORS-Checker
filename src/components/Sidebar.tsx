import { SidebarItem } from './SidebarItem';

export function Sidebar() {
  return (
    // h-full займет всё вертикальное пространство от хедера до низа экрана
    <aside className="w-64 flex-shrink-0 h-full border-r border-neutral-900 bg-[#0b0f19] flex flex-col justify-between p-4 select-none">
      {/* Верхний блок: Навигационное меню */}
      <nav className="flex flex-col gap-1.5">
        {/* Главная панель */}
        <SidebarItem
          label="Dashboard"
          path="/dashboard"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="7" height="9" x="3" y="3" rx="1" />
              <rect width="7" height="5" x="14" y="3" rx="1" />
              <rect width="7" height="9" x="14" y="10" rx="1" />
              <rect width="7" height="5" x="3" y="14" rx="1" />
            </svg>
          }
        />

        {/* История CORS тестов */}
        <SidebarItem
          label="Scan History"
          path="/dashboard/history"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
              <path d="M12 7v5l4 2" />
            </svg>
          }
        />

        {/* Подписка и Тарифы (Тот самый биллинг для SaaS) */}
        <SidebarItem
          label="Subscription"
          path="/dashboard/billing"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <line x1="2" x2="22" y1="10" y2="10" />
            </svg>
          }
        />

        {/* Настройки профиля и API ключей */}
        <SidebarItem
          label="Settings"
          path="/dashboard/settings"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          }
        />
      </nav>

      {/* Нижний блок: Статус твоих серверных систем */}
      <div className="rounded-lg border border-neutral-900 bg-neutral-950/40 p-3 text-[11px] text-neutral-500">
        <div>
          Environment: <span className="text-indigo-400 font-medium">Development</span>
        </div>
        <div className="mt-1">
          DB Connection: <span className="text-emerald-500 font-medium">Online</span>
        </div>
      </div>
    </aside>
  );
}
