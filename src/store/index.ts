import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { createBearSlice } from './slices/bearSlice'
import { createFishSlice } from './slices/fishSlice'
import { type Store } from './store.d'

const isDevMode = import.meta.env.DEV

export const useBoundStore = create<Store>()(
  devtools(
    immer((...args) => ({
      ...createBearSlice(...args),
      ...createFishSlice(...args),
    })),
    { enabled: isDevMode },
  ),
)