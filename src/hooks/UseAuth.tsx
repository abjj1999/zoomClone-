import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUser } from '../app/slices/AuthSlice'
import { firebaseAuth } from '../utils/FirebaseConfig'

const UseAuth = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  React.useEffect(()=> {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
        if(!user) {
            navigate('/login')
        }
      else {
        dispatch(setUser({uid: user.uid, name: user.displayName, email: user.email}))
        navigate('/')
      }
    })
    return () => unsubscribe();
  }, [dispatch, navigate])
}

export default UseAuth
