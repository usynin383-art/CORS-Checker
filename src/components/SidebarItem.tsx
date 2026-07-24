'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarItemProps {
  label: string;
  path: string;
  icon: React.ReactNode;
}

export function SidebarItem({ label, path, icon }: SidebarItemProps) {
  const pathname = usePathname();

  // Проверяем, активна ли текущая вкладка
  const isActive = pathname === path;

  return (
    <Link
      href={path}
      className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 select-none ${
        isActive
          ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20'
          : 'text-neutral-400 hover:bg-neutral-900/60 hover:text-neutral-200 border border-transparent'
      }`}
    >
      {/* Иконка с динамическим цветом и эффектом при ховере на всю кнопку */}
      <div
        className={`flex-shrink-0 transition-colors duration-200 ${
          isActive ? 'text-indigo-400' : 'text-neutral-500 group-hover:text-neutral-300'
        }`}
      >
        {icon}
      </div>

      {/* Текст ссылки */}
      <span className="truncate">{label}</span>

      {/* Неоновый микро-индикатор справа для активной вкладки */}
      {isActive && (
        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_#6366f1]" />
      )}
    </Link>
  );
}
