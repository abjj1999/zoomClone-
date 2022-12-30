import { EuiButton, EuiFlexGroup, EuiFlexItem } from '@elastic/eui'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const CreateMeetingBtns = ({
    createMeeting
}: {
    createMeeting: () => void
}) => {

    const navigate = useNavigate();
  return (
    <EuiFlexGroup>
        <EuiFlexItem grow={false}>
            <EuiButton color="danger" onClick={()=> navigate('/')} fill>Cancel</EuiButton>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
            <EuiButton  onClick={createMeeting} fill>submit</EuiButton>
        </EuiFlexItem>
    </EuiFlexGroup>
  )
}

export default CreateMeetingBtns
