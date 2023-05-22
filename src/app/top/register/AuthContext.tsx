import { ReactNode, createContext, useState, useContext, useEffect } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import type { User } from "firebase/auth"
import { useRouter } from "next/router"
import { app } from "../../lib/FirebaseConfig"

export type UserType = User | null

export type AuthContextProps = {
  user: UserType
}

export type AuthProps = {
  children: ReactNode
}

const AuthContext = createContext<Partial<AuthContextProps>>({})

export const useAuthContext = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }: AuthProps) => {
  const router = useRouter()
  const auth = getAuth(app)
  const [user, setUser] = useState<UserType>(null)
  const isAvailableForViewing =
    router.pathname === "/about" ||
    router.pathname === "/login" ||
    router.pathname === "/signup"
  const value = {
    user,
  }

  //TODO:lint err:React Hook useEffect has missing dependencies: 'auth', 'isAvailableForViewing', and 'router'. Either include them or remove the dependency array.
  useEffect(() => {
    const authStateChanged = onAuthStateChanged(auth, async (user) => {
      setUser(user)
      !user && !isAvailableForViewing && (await router.push("/login"))
    })
    return () => {
      authStateChanged()
    }
  }, [])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}