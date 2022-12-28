import React from 'react'
import { useAppSelector } from '../app/hooks'
import UseAuth from '../hooks/UseAuth'

const Dashboard = () => {
    const userInfo = useAppSelector(zoom => zoom.auth.userInfo)
    console.log(userInfo)
    UseAuth();
  return (
    <div>
      
    </div>
  )
}

export default Dashboard
