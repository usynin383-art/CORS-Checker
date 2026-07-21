import { create } from 'zustand';
import { createUISlice, UISlice } from './slices/uiSlice';

type StoreState = UISlice;

export const useBoundStore = create<StoreState>()((...a) => ({
  ...createUISlice(...a),
}));
