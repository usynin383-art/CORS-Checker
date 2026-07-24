import type { FC } from 'react';
import { Button } from './ui/Button';

export const Header: FC = () => {
  return (
    <header className="flex h-16 w-full items-center justify-between border-b border-neutral-900 bg-[#0b0f19]/90 px-6 backdrop-blur-md sticky top-0 z-50 select-none">
      {/* Левая часть: Статус-монитор и Контекст сканера */}
      <div className="flex items-center gap-4">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-indigo-400 tracking-widest uppercase">
            CORS Inspector
          </span>
          <h1 className="text-base font-bold text-white tracking-tight -mt-0.5 flex items-center gap-2">
            Configuration Checker
            <span className="text-xs font-normal text-neutral-500">v1.0</span>
          </h1>
        </div>

        {/* Разделитель */}
        <div className="hidden sm:block h-6 w-[1px] bg-neutral-800"></div>

        {/* Активный Proxy-индикатор */}
        <div className="hidden sm:flex items-center gap-2 rounded-md border border-emerald-950/40 bg-emerald-950/10 px-2.5 py-1 text-[11px] font-medium text-emerald-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-neutral-400">Scanner Engine:</span> Operational
        </div>
      </div>

      {/* Правая часть: Скорость, Твоя Кнопка Атаки и Юзер */}
      <div className="flex items-center gap-4">
        {/* Технический счетчик */}
        <div className="hidden lg:flex items-center gap-1.5 text-xs text-neutral-400 bg-neutral-900/40 px-2.5 py-1 rounded-md border border-neutral-800/60">
          <svg
            className="text-indigo-400"
            xmlns="http://w3.org"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span>3 Policy Specs Loaded</span>
        </div>

        {/* Интегрировали твой компонент Button */}
        <Button variant="primary" className="!text-xs !px-3.5 !py-1.5 h-8">
          + New Scan
        </Button>

        {/* Иконка логов/алертов */}

        <Button variant="secondary" className="!text-xs !px-3.5 !py-1.5 h-8 border-gray-800">
          <svg
            xmlns="http://w3.org"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M12 8v8" />
            <path d="m9 11 3-3 3 3" />
          </svg>
          <span className="absolute right-1.5 top-1.5 flex h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
        </Button>

        {/* Разделитель */}
        <div className="h-5 w-[1px] bg-neutral-800"></div>

        {/* Аватар юзера */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md border border-neutral-800 bg-neutral-900 flex items-center justify-center text-xs font-bold text-indigo-300 shadow-inner hover:border-neutral-700 transition-colors cursor-pointer">
            TS
          </div>
        </div>
      </div>
    </header>
  );
};
