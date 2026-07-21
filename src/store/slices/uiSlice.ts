import { StateCreator } from 'zustand';

export interface UISlice {
  isSidebarOpen: boolean;
  activeDashboardTab: string;
  toggleSidebar: () => void;
  setActiveDashboardTab: (tab: string) => void;
}

export const createUISlice: StateCreator<UISlice, [], [], UISlice> = (set) => ({
  isSidebarOpen: true,
  activeDashboardTab: 'scanner',

  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

  setActiveDashboardTab: (tab) => set({ activeDashboardTab: tab }),
});
