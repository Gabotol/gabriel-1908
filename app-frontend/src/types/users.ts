export interface User {
  id: string
  name: string
  email: string
  password: string
  amount: number
  cardNumber?: string
  cvv?: string
}

export interface UsersState {
  users: User[]
  addUser: (user: User) => void
  findUserByEmail: (email: string) => User | undefined
  updateUser: (updatedUser: User) => void
}

export interface LoggedState {
  loggedUser: User
  saveUserSession: (user: User) => void
  logout: () => void
  islogged: boolean
  setIsLogged: (value: boolean) => void
  updateUser: (user: User) => void
}
