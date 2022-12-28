import { EuiButton, EuiFlexGroup, EuiFlexItem, EuiImage, EuiPanel, EuiProvider, EuiSpacer, EuiText, EuiTextColor } from '@elastic/eui'
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth'
import { query, where, getDocs, addDoc } from 'firebase/firestore'
import React from 'react'
import animation from '../assets/animation.gif'
import logo from '../assets/logo.png'
import { firebaseAuth, userRef } from '../utils/FirebaseConfig'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from '../app/slices/AuthSlice'
const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    onAuthStateChanged(
        firebaseAuth,
        (user) => {
            if(user) {
                
                navigate('/')
            }
        }
    )

    const login = async () => {
        const provider = new GoogleAuthProvider();
        const {user: {displayName, email, uid}} = await signInWithPopup(firebaseAuth, provider)
        // console.log(data)
        if(email) {
            const firestoreQuery = query(userRef, where("uid", "==", uid))
            const fetchedUsers = await getDocs(firestoreQuery);
            if(fetchedUsers.empty) {
                await addDoc(userRef, {
                    uid, name: displayName, email 
                })
            }
        }
        dispatch(setUser({uid, name: displayName, email}))
        navigate('/')
    }
  return (
    <EuiProvider colorMode='dark'>
        <EuiFlexGroup alignItems='center' justifyContent='center' style={{
            height: '100vh', width: '100vw'
        }}>
            <EuiFlexItem grow={false}>
                <EuiPanel paddingSize='xl'>
                    <EuiFlexGroup alignItems='center' justifyContent='center' >
                    <EuiFlexItem>
                <EuiImage src={animation} alt='logo' />
            </EuiFlexItem>
            <EuiFlexItem>
                <EuiImage src={logo} alt='logo' size="230px"/>
                <EuiSpacer size='xs' />
                <EuiText textAlign='center' grow={false}>
                    <h3>
                        <EuiTextColor>One Plateform to </EuiTextColor>
                        <EuiTextColor color="#0b5cff">
                             connect
                        </EuiTextColor>
                    </h3>
                </EuiText>
                <EuiSpacer size='l' />
                <EuiButton fill onClick={login} >Login With Google</EuiButton>
            </EuiFlexItem>
                    </EuiFlexGroup>
                </EuiPanel>
            </EuiFlexItem>
        </EuiFlexGroup>

    </EuiProvider>
  )
}

export default Login
