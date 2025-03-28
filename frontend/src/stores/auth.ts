import { create } from 'zustand'

interface AuthStore {
  email: string,
  // setEmail: (email: string) => void,
}

const useAuthStore = create<AuthStore>(() => ({
  email: 'no-email',
  // setEmail: (email: string) => set(() => ({ email })),
}))

export default useAuthStore;