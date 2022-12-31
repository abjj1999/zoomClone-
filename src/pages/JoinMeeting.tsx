import { onAuthStateChanged } from "firebase/auth";
import { getDocs, query, where } from "firebase/firestore";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useToast from "../hooks/useToast";
import { firebaseAuth, meetingRef } from "../utils/FirebaseConfig";
import moment from "moment";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { generateMeetingId } from "../utils/GenerateMeetingId";

const JoinMeeting = () => {
  const [user, setUser] = React.useState<any>(undefined);
  const params = useParams();
  const navigate = useNavigate();
  const [createToast] = useToast();
  const [isAllowed, setIsAllowed] = React.useState<boolean>(false);
  const [userLoaded, setUserLoaded] = React.useState<boolean>(false);
  onAuthStateChanged(firebaseAuth, (currentuser) => {
    if (currentuser) {
      // console.log(currentuser)
      setUser(currentuser);
    }
    setUserLoaded(true);
  });

  React.useEffect(() => {
    const getMeetingData = async () => {
      if (params.id && userLoaded) {
        const firebaseQuery = query(
          meetingRef,
          where("meetingId", "==", params.id)
        );
        const fetchedMeetings = await getDocs(firebaseQuery);
        if (fetchedMeetings.docs.length) {
          const meeting = fetchedMeetings.docs[0].data();
          const isCreator = meeting.createdBy === user?.uid;
          if (meeting.meetingType === "1-on-1") {
            if (meeting.invitedUsers[0] === user?.uid || isCreator) {
              if (meeting.meetingDate === moment().format("L")) {
                setIsAllowed(true);
              } else if (
                moment(meeting.meetingDate).isBefore(moment().format("L"))
              ) {
                createToast({ title: "Meeting has ended.", type: "danger" });
                navigate(user ? "/" : "/login");
              } else if (moment(meeting.meetingDate).isAfter()) {
                createToast({
                  title: `Meeting is on ${meeting.meetingDate}`,
                  type: "warning",
                });
                navigate(user ? "/" : "/login");
              }
            } else navigate(user ? "/" : "/login");
          } else if (meeting.meetingType === "video-conference") {
            const index = meeting.invitedUsers.findIndex(
              (invitedUser: string) => invitedUser === user?.uid
            );
            if (index !== -1 || isCreator) {
              if (meeting.meetingDate === moment().format("L")) {
                setIsAllowed(true);
              } else if (
                moment(meeting.meetingDate).isBefore(moment().format("L"))
              ) {
                createToast({ title: "Meeting has ended.", type: "danger" });
                navigate(user ? "/" : "/login");
              } else if (moment(meeting.meetingDate).isAfter()) {
                createToast({
                  title: `Meeting is on ${meeting.meetingDate}`,
                  type: "warning",
                });
              }
            } else {
              createToast({
                title: `You are not invited to the meeting.`,
                type: "danger",
              });
              navigate(user ? "/" : "/login");
            }
          } else {
            setIsAllowed(true);
          }
        }
      }
    };
    getMeetingData();
  }, [userLoaded]);
  
  const serverSecret = process.env.REACT_APP_ZEGOCLOUD_SERVER_SECRET ;
  const MyMeeting = async (element: any) => {
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        parseInt(process.env.REACT_APP_ZEGOCLOUD_APP_ID!),
      serverSecret as string,
      params.id as string,
      user.uid ? user.uid : generateMeetingId(),
      user.dispalyName ? user.dispalyName : generateMeetingId()
    );
    // console.log(kitToken);
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
        container: element,
        maxUsers: 50,
        sharedLinks: [
            {
                name: "personal link",
                url: window.location.origin
            }
        ],
        scenario: {
            mode: ZegoUIKitPrebuilt.VideoConference
        }
    })
  };
  return isAllowed ? (
    <div
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <div
        className="myCallContainer"
        ref={MyMeeting}
        style={{ width: "100%", height: "100vh" }}
      ></div>
    </div>
  ) : (
    <></>
  );
};

export default JoinMeeting;
