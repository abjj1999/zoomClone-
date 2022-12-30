import { EuiFlexGroup, EuiForm, EuiSpacer } from "@elastic/eui";
import moment from "moment";
import React from "react";
import MeetingDateField from "../components/Form/MeetingDateField";
import MeetingNameField from "../components/Form/MeetingNameField";
import MeetingUserField from "../components/Form/MeetingUserField";
import Header from "../components/Header";
import UseAuth from "../hooks/UseAuth";
import useFetchUsers from "../hooks/useFetchUsers";
import { FieldErrorType, UserType } from "../utils/types";
import CreateMeetingBtns from "../components/Form/CreateMeetingBtns";
import { addDoc } from "firebase/firestore";
import { meetingRef } from "../utils/FirebaseConfig";
import { generateMeetingId } from "../utils/GenerateMeetingId";
import { useAppSelector } from "../app/hooks";
import { useNavigate } from "react-router-dom";
import useToast from "../hooks/useToast";

const OneonOneMeeting = () => {
    const navigate = useNavigate();
    const [createToast] = useToast();
  const [meetingName, setMeetingName] = React.useState("");
  const [selectedUsers, setSelectedUsers] = React.useState<Array<UserType>>([]); // This is the selected users]
  const [startDate, setStartDate] = React.useState(moment()); // This is the selected date
  const uid = useAppSelector((zoom) => zoom.auth.userInfo?.uid);

  UseAuth();
  const [users] = useFetchUsers();
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

  const validateForm = () => {
    let errors = false;
    const clonedShowErrors = {...showErrors};
    if(!meetingName.length){
        clonedShowErrors.meetingName.show = true;
        clonedShowErrors.meetingName.message.push("Meeting name is required");
        errors = true;
    }
    else{
        clonedShowErrors.meetingName.show = false;
        clonedShowErrors.meetingName.message = [];
    }
    if(!selectedUsers.length){
        clonedShowErrors.meetingUser.show = true;
        clonedShowErrors.meetingUser.message.push("Please select a user");
        errors = true;
    }else{
        clonedShowErrors.meetingUser.show = false;
        clonedShowErrors.meetingUser.message = [];
    }
    setShowErrors(clonedShowErrors);
    return errors;
  }
  const createMeeting = async () => {
    // console.log(selectedUsers)
    if(!validateForm()){
       
        const meetingId = generateMeetingId();
        await addDoc(meetingRef, {
            createdBy: uid,
            meetingId,
            meetingName,
            meetingType: "oneonone",
            invitedUsers: [selectedUsers[0].uid],
            meetingDate: startDate.format('L'),
            maxUsers: 1,
            status: true
        })
        createToast({
            title: "Meeting created successfully",
            type: "success"
        })
        navigate('/')
    }
    
  };
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Header />
      <EuiFlexGroup justifyContent="center" alignItems="center">
        <EuiForm>
          <MeetingNameField
            label="Meeting name"
            placeholder="Meeting name"
            value={meetingName}
            setMeetingName={setMeetingName}
            isInvalid={showErrors.meetingName.show}
            error={showErrors.meetingName.message}
          />
          <MeetingUserField
            label="Invite User"
            options={users}
            onchange={onUserChange}
            selectedOptions={selectedUsers}
            singleSelection={{ asPlainText: true }}
            isClearable={false}
            placeholder="Select a user"
            isInvalid={showErrors.meetingUser.show}
            error={showErrors.meetingUser.message}
          />
          <MeetingDateField selected={startDate} setStartDate={setStartDate} />
          <EuiSpacer />
          <CreateMeetingBtns createMeeting={createMeeting} />
        </EuiForm>
      </EuiFlexGroup>
    </div>
  );
};

export default OneonOneMeeting;
