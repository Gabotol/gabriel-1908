import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { LoggedState, User } from '@/types/users'
import { EMPTY_USER } from '@/constants/defaultUser'

const useLogged = create<LoggedState>()(
  persist(
    (set) => ({
      loggedUser: EMPTY_USER,
      saveUserSession: ({ id, name, email, amount, password }) =>
        set({ loggedUser: { id, name, email, amount, password } }),
      logout: () =>
        set({
          loggedUser: EMPTY_USER,
        }),
      updateUser: (user: User) => set({ loggedUser: user }),
      islogged: false,
      setIsLogged: (value) => set({ islogged: value }),
    }),
    { name: 'logged-storage' }
  )
)

export function useSessionStore() {
  const loggedUser = useLogged((state) => state.loggedUser)
  const saveUserSession = useLogged((state) => state.saveUserSession)
  const logout = useLogged((state) => state.logout)
  const updateUser = useLogged((state) => state.updateUser)

  return {
    loggedUser,
    isLogged: loggedUser.id !== '',
    saveUserSession,
    logout,
    updateUser,
  }
}
