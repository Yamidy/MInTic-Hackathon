import { createContext, useContext, useState, useEffect } from 'react'
import {
  // getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  auth,
  database,
  ref,
  set,
  child,
  get
} from '../auth/firebase'

const SessionContext = createContext();

const useSession = () => {
  return useContext(SessionContext)
}


const SessionProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const userprofile = (uid, email) => {
    return set(ref(database, 'users/' + uid), {
      fullName: email,
      currentChallenges: [],
      streak: 0,
      badges: ['newbie'],
      challengesCompleted: 0,
      dailyChallenge: false
    });
  }

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const getUserprofile = async (uid) => {
    const refDb = ref(database)
    const fetchData = await get(child(refDb, `users/${uid}`)).then((snapshot) => snapshot.val())
    const ans = await fetchData
    return ans
  }

  const logout = () => {
    return signOut(auth)
  }

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  }

  // const [temp, setTemp] = useState(null)
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      // getUserprofile(user.uid).then((res) => {
      //   a = res
      // setTemp(getUserprofile(user))
      setUserProfile(getUserprofile(user.uid))
      // setUserProfile(data)
      setLoading(false)
    })
    return unsub

  }, [])


  const value = {
    currentUser,
    userProfile,
    signup,
    login,
    logout,
    resetPassword,
    userprofile,
    getUserprofile
  }

  return (
    <SessionContext.Provider value={value} >
      {!loading && children}
    </SessionContext.Provider >
  )
}

export { SessionProvider, useSession }

