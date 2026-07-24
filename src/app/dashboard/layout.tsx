import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import React from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen w-full bg-[#0b0f19] text-white overflow-hidden">
      <Header />

      <div className="flex-1 flex w-full overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto p-6 bg-[#080b13]">{children}</main>
      </div>
    </div>
  );
}
