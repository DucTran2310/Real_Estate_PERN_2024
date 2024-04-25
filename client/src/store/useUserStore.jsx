import { apiGetCurrent } from '@apis/user'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useUserStore = create(
  persist(
    (set) => ({
      token: null,
      current: null,
      setToken: (token) =>
        set(() => ({
          token,
        })),
      getCurrent: async () => {
        const response = await apiGetCurrent()
        if (response.success) {
          return set(() => ({ current: response?.currentUser }))
        }
      }
    }),
    {
      name: 'user-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      //return object of state, want save
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(el => el[0] === 'token' || el[0] === 'current')
        )

    },
  ),
)