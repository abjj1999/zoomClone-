import { EuiCard, EuiFlexGroup, EuiFlexItem, EuiImage } from '@elastic/eui'
import React from 'react'
import Header from '../components/Header'
import UseAuth from '../hooks/UseAuth'
import meeting1 from '../assets/meeting1.png'
import meeting2 from '../assets/meeting2.png'
import { useNavigate } from 'react-router-dom'

const CreateMeeting = () => {
    UseAuth()
    const navigate = useNavigate();
  return (
    <div style={{
        display: 'flex',
        height: '100vh',
        flexDirection: 'column',
    }}>
        <Header />
        <EuiFlexGroup justifyContent='center' alignItems='center' style={{
          margin: "5vh 10vh"
        }}>
            <EuiFlexItem>
                <EuiCard 
                icon={<EuiImage size="5rem" alt='text' src={meeting1} />}
                title='Create 1 on 1 meeting'   
                description="Create a personal meeting"
                onClick={() => {navigate('/create/oneonone')}}
                
                paddingSize="xl"
                />
            </EuiFlexItem>
            <EuiFlexItem>
                <EuiCard 
                icon={<EuiImage size="5rem" alt='text' src={meeting2} />}
                title='Create Video Conference'   
                description="Invite multiple people to a video conference"
                onClick={() => {navigate('/create/videoconf')}}

                paddingSize="xl"
                />
            </EuiFlexItem>
        </EuiFlexGroup>
    </div>
  )
}

export default CreateMeeting

