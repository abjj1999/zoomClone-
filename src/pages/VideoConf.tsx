import { EuiFlexGroup, EuiForm, EuiFormRow, EuiSpacer, EuiSwitch } from "@elastic/eui";
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
import { User } from "firebase/auth";
import MeetingMaxUserField from "../components/Form/MeetingMaxUserField";

const VideoConf = () => {
    UseAuth();
    const navigate = useNavigate();
    const [createToast] = useToast();
  const [meetingName, setMeetingName] = React.useState("");
  const [selectedUsers, setSelectedUsers] = React.useState<Array<UserType>>([]); // This is the selected users]
  const [startDate, setStartDate] = React.useState(moment()); // This is the selected date
  const [size, setSize] = React.useState(1);
  const [anyoneCanJoin, setAnyoneCanJoin] = React.useState(false);
  const uid = useAppSelector((zoom) => zoom.auth.userInfo?.uid);

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
    const showErrorsClone = { ...showErrors };
    let errors = false;
    if (!meetingName.length) {
      showErrorsClone.meetingName.show = true;
      showErrorsClone.meetingName.message = ["Please Enter Meeting Name"];
      errors = true;
    } else {
      showErrorsClone.meetingName.show = false;
      showErrorsClone.meetingName.message = [];
    }
    if (!selectedUsers.length && !anyoneCanJoin) {
      showErrorsClone.meetingUser.show = true;
      showErrorsClone.meetingUser.message = ["Please Select a User"];
      errors = true;
    } else {
      showErrorsClone.meetingUser.show = false;
      showErrorsClone.meetingUser.message = [];
    }
    setShowErrors(showErrorsClone);
    return errors;
  }
  const createMeeting = async () => {
      if(!validateForm()){
        console.log(selectedUsers)
       
        const meetingId = generateMeetingId();
        await addDoc(meetingRef, {
            createdBy: uid,
            meetingId,
            meetingName,
            meetingType: anyoneCanJoin ? "Any one can join" : "Invite only",
            invitedUsers: anyoneCanJoin ? [] : selectedUsers.map((user: UserType) => user.uid),
            meetingDate: startDate.format('L'),
            maxUsers: anyoneCanJoin? 100 : size,
            status: true
        })
        createToast({
            title: anyoneCanJoin? "Any one can join, meeting created successfully" : "Video meeting created successfully",
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
            <EuiFormRow display="columnCompressedSwitch" label="Anyone can join">
                <EuiSwitch 
                showLabel={false}
                label="Anyone can join"
                checked={anyoneCanJoin}
                onChange={(e) => setAnyoneCanJoin(e.target.checked)}
                compressed
                />
            </EuiFormRow>
            <EuiSpacer />
          <MeetingNameField
            label="Meeting name"
            placeholder="Meeting name"
            value={meetingName}
            setMeetingName={setMeetingName}
            isInvalid={showErrors.meetingName.show}
            error={showErrors.meetingName.message}
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
          <EuiSpacer />
          <CreateMeetingBtns createMeeting={createMeeting} />
        </EuiForm>
      </EuiFlexGroup>
    </div>
  );
};

export default VideoConf;

