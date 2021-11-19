import { createContext, useContext, useState, useEffect } from 'react'
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, auth } from '../auth/firebase'

const SessionContext = createContext();

const useSession = () => {
  return useContext(SessionContext)
}


const SessionProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logout = () => {
    return signOut(auth)
  }

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  }

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
    })
    return unsub

  }, [])


  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword
  }

  return (
    <SessionContext.Provider value={value} >
      {!loading && children}
    </SessionContext.Provider >
  )
}

export { SessionProvider, useSession }

