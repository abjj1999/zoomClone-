import { EuiButton, EuiFlexGroup, EuiFlexItem } from '@elastic/eui'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const CreateMeetingBtns = ({
    createMeeting, isEdit, closeFlyout
}: {
    createMeeting: () => void,
    isEdit?: boolean,
    closeFlyout?: () => void
}) => {

    const navigate = useNavigate();
  return (
    <EuiFlexGroup>
        <EuiFlexItem grow={false}>
            <EuiButton color="danger" 
                onClick={()=> (isEdit ? closeFlyout!(): navigate('/'))}
            fill>Cancel</EuiButton>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
            <EuiButton  onClick={createMeeting} fill>
                {isEdit ? 'Update Meeting' : 'Create Meeting'}
            </EuiButton>
        </EuiFlexItem>
    </EuiFlexGroup>
  )
}

export default CreateMeetingBtns
