import React, {useEffect} from 'react'
import { useAppSelector } from '../app/hooks';
import UseAuth from '../hooks/UseAuth';
import useFetchUsers from '../hooks/useFetchUsers';
import useToast from '../hooks/useToast';
import { FieldErrorType, MeetingType, UserType } from '../utils/types'
import moment from 'moment';
import { doc, updateDoc } from 'firebase/firestore';
import { firestoneDB } from '../utils/FirebaseConfig';
import { title } from 'process';
import { EuiFlyout, EuiFlyoutBody, EuiFlyoutHeader, EuiForm, EuiFormRow, EuiSpacer, EuiSwitch, EuiTitle } from '@elastic/eui';
import MeetingNameField from './Form/MeetingNameField';
import MeetingMaxUserField from './Form/MeetingMaxUserField';
import MeetingUserField from './Form/MeetingUserField';
import MeetingDateField from './Form/MeetingDateField';
import CreateMeetingBtns from './Form/CreateMeetingBtns';

const EditFlyout = ({closeEditFlyout, meetings}: {closeEditFlyout: any, meetings: MeetingType}) => {
    UseAuth();
    const [createToast] = useToast();
    const [users] = useFetchUsers();
    const [meetingName, setMeetingName] = React.useState(meetings.meetingName);
    const [meetingType] = React.useState(meetings.meetingType);
    const [selectedUsers, setSelectedUsers] = React.useState<Array<UserType>>([]); // This is the selected users]
    const [startDate, setStartDate] = React.useState(moment(meetings.meetingDate)); // This is the selected date
    const [size, setSize] = React.useState(1);
    const [anyoneCanJoin, setAnyoneCanJoin] = React.useState(false);
    const [status, setStatus] = React.useState(false);

    useEffect(() => {
        if(users){
            const foundUsers: Array<UserType> = [];
            meetings.invitedUsers.forEach((user: string) => {
                const foundUser = users.find((tempUser: UserType) => tempUser.uid === user);
                if(foundUser){
                    foundUsers.push(foundUser);
                }
            })
            setSelectedUsers(foundUsers);
        }
    }, [meetings, users])

    const onUserChange = (selectedOptions: any) => {
        setSelectedUsers(selectedOptions);
      };
    const [showErrors, setShowErrors] = React.useState<{
        meetingName: FieldErrorType,
        meetingUser: FieldErrorType,
      }>({
        meetingName: {
            show: false,
            message: []
        }, 
        meetingUser: {
            show: false,
            message: []
        }
      });
    
      
      const editMeeting = async () => {
        const editedMeeting = {
            ...meetings,
            meetingName,
            meetingType,
            invitedUsers: selectedUsers.map((user: UserType) => user.uid),
            maxUsers: size,
            meetingDate: startDate.format('L'),
            status: !status
        }
        delete editedMeeting.docId;
        const docRef = doc(firestoneDB, "meetings", meetings.docId!);
        await updateDoc(docRef, editedMeeting);
        createToast({title:"Meeting Edited Successfully", type: "success"
        });
        closeEditFlyout(true);
      }
  

  return (
    <EuiFlyout ownFocus onClose={() => closeEditFlyout()}>
        <EuiFlyoutHeader hasBorder>
            <EuiTitle>
            <h2>Edit {meetings.meetingName}</h2>
            </EuiTitle>
        </EuiFlyoutHeader>
        <EuiFlyoutBody>
            <EuiForm>
                <MeetingNameField
                    label='Meeting Name'
                    isInvalid={showErrors.meetingName.show}
                    error={showErrors.meetingName.message}
                    value={meetingName}
                    setMeetingName={setMeetingName}
                    placeholder='Enter Meeting Name'
                />
                {anyoneCanJoin ? (
            <MeetingMaxUserField value={size} setValue={setSize} />
          ) : (

              <MeetingUserField
              label="Invite User"
              options={users}
              onchange={onUserChange}
              selectedOptions={selectedUsers}
              singleSelection={false}
              isClearable={false}
              placeholder="Select a user"
              isInvalid={showErrors.meetingUser.show}
              error={showErrors.meetingUser.message}
              />
              )}
              <MeetingDateField selected={startDate} setStartDate={setStartDate} />
              <EuiFormRow display="columnCompressedSwitch" label="Cancel Meeting">
            <EuiSwitch
              showLabel={false}
              label="Cancel Meeting"
              checked={status}
              onChange={(e) => setStatus(e.target.checked)}
            />
          </EuiFormRow>
          <EuiSpacer />
          <CreateMeetingBtns
            createMeeting={editMeeting}
            isEdit
            closeFlyout={closeEditFlyout}
          />
            </EuiForm>
        </EuiFlyoutBody>
    </EuiFlyout>
  )
}

export default EditFlyout
