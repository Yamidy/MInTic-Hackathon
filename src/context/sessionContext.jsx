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
  get,
  updateProfile,
  updatePassword
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

  const fetchProfile = async () => {
    setUserProfile(getUserprofile(currentUser.uid))
  }

  const logout = () => {
    return signOut(auth)
  }

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  }

  const updateName = (name) =>{
    return updateProfile(auth.currentUser,{
      displayName:name 
      })
    }
    
  const updateImage = (image) =>{
    return updateProfile(auth.currentUser,{
      photoURL:image 
      })
    }

  const updatePass = (pass) =>{
    return updatePassword(auth.currentUser , pass)
  }


  // const [temp, setTemp] = useState(null)
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      // getUserprofile(user.uid).then((res) => {
      //   a = res
      // setTemp(getUserprofile(user))
      // if (currentUser) {
      //   setUserProfile(getUserprofile(currentUser.uid))
      // }
      // setUserProfile(data)
      setLoading(false)
    })
    return unsub

  }, [currentUser])


  const value = {
    currentUser,
    userProfile,
    signup,
    login,
    logout,
    resetPassword,
    userprofile,
    getUserprofile,
    fetchProfile,
    updateName,
    updateImage,
    updatePass
  }

  return (
    <SessionContext.Provider value={value} >
      {!loading && children}
    </SessionContext.Provider >
  )
}

export { SessionProvider, useSession }

