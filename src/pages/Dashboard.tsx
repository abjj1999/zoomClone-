import React from 'react'
import { useAppSelector } from '../app/hooks'
import UseAuth from '../hooks/UseAuth'
import { useNavigate } from 'react-router-dom'
import { EuiCard, EuiFlexGroup, EuiFlexItem, EuiImage } from '@elastic/eui'
import dashboard1 from '../assets/dashboard1.png'
import dashboard2 from '../assets/dashboard2.png'
import dashboard3 from '../assets/dashboard3.png'
import Header from '../components/Header'

const Dashboard = () => {
    // const userInfo = useAppSelector(zoom => zoom.auth.userInfo)
    // console.log(userInfo)
    UseAuth();
    const navigate = useNavigate();
  return (
    <>
      <div style={{
        display: 'flex',
        height: '100vh',
        flexDirection: 'column',
      }} >
        <Header />
        <EuiFlexGroup justifyContent='center' alignItems='center' style={{
          margin: "5vh 10vh"
        }}>
          <EuiFlexItem>
            <EuiCard 
              icon={<EuiImage size="5rem" alt='text' src={dashboard1} />}
              title='Create meeting'   
              description="Create a meeting with a single click."
              onClick={() => {}}
              paddingSize="xl"
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiCard 
              icon={<EuiImage size="100%" alt='text' src={dashboard2} />}
              title='My Meetings'   
              description=" View all your meetings. "
              onClick={() => {navigate('/mymeetings')}}
              paddingSize="xl"
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiCard 
              icon={<EuiImage size="5rem" alt='text' src={dashboard3} />}
              title='Meetings'   
              description="View the meetings you are invited to."
              onClick={() => {}}
              paddingSize="xl"
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    </>
  )
}

export default Dashboard
