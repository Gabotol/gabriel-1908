import type { User, UsersState } from '@/types/users'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useUsers = create<UsersState>()(
  persist(
    (set, get) => ({
      users: [],
      addUser: (user) => set((state) => ({ users: [...state.users, user] })),
      findUserByEmail: (email) =>
        get().users.find((u) => u.email.toLowerCase() === email.toLowerCase()),
      updateUser: (updatedUser: User) => {
        set((state) => ({
          users: state.users.map((user: User) =>
            user.id === updatedUser.id ? updatedUser : user
          ),
        }))
      },
    }),

    { name: 'users-storage' }
  )
)

export function useUsersStore() {
  const users = useUsers((state) => state.users)
  const addUser = useUsers((state) => state.addUser)
  const findUserByEmail = useUsers((state) => state.findUserByEmail)
  const updateUser = useUsers((state) => state.updateUser)
  return { users, addUser, findUserByEmail, updateUser }
}
