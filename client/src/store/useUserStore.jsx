import { apiGetCurrent, apiGetRoles } from '@apis/user'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useUserStore = create(
  persist(
    (set) => ({
      token: null,
      current: null,
      listRoles: [],
      setToken: (token) =>
        set(() => ({
          token,
        })),
      getCurrent: async () => {
        const response = await apiGetCurrent()
        if (response.success) {
          return set(() => ({ current: response?.currentUser }))
        } else {
          return set(() => ({ current: null, token: null }))
        }
      },
      getRoles: async () => {
        const response = await apiGetRoles()
        if (response.success) {
          return set(() => ({ listRoles: response?.listRoles }))
        } else {
          return set(() => ({ listRoles: [] }))
        }
      },
      logout: () => set(() => ({token: null, current: null}))
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