import {
  EuiBadge,
  EuiBasicTable,
  EuiButtonIcon,
  EuiCopy,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
} from "@elastic/eui";
import { getDocs, query, where } from "firebase/firestore";
import moment from "moment";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

import Header from "../components/Header";
import UseAuth from "../hooks/UseAuth";
import { meetingRef } from "../utils/FirebaseConfig";
import { MeetingType } from "../utils/types";

const Meeting = () => {
  UseAuth();
  const [meetings, setMeetings] = React.useState<Array<MeetingType>>([]);
  const userInfo = useAppSelector((zoom) => zoom.auth.userInfo);

  useEffect(() => {
    if (userInfo) {
      const getUserMeetings = async () => {
        const firestoreQuery = query(
          meetingRef
        );
        const fetchedMeetings = await getDocs(firestoreQuery);
        if (fetchedMeetings.docs.length) {
          const MyMeetings: Array<MeetingType> = [];
          fetchedMeetings.forEach((meeting) => {
            const data = meeting.data() as MeetingType;
            // MyMeetings.push(data);
            if (data.createdBy === userInfo?.uid) {
              MyMeetings.push(data);
            } else if (data.meetingType === "any-can-join") {
              MyMeetings.push(data);
            } else {
              const index = data.invitedUsers.findIndex(
                (user) => user === userInfo?.uid
              );
              if (index !== -1) {
                MyMeetings.push(data);
              }
            }
          });
          setMeetings(MyMeetings);
        }
      };
      getUserMeetings();
    }
  }, [userInfo]);

  // console.log(meetings)
  const columns = [
    {
      field: "meetingName",
      name: "Meeting Name",
    },
    {
      field: "meetingType",
      name: "Meeting Type",
    },
    {
      field: "meetingDate",
      name: "Meeting Date",
    },
    {
      field: "",
      name: "Status",
      render: (meeting: MeetingType) => {
        // console.log(meeting.status)
        if (meeting.status) {
          if (meeting.meetingDate === moment().format("L")) {
            return (
              <EuiBadge color="success">
                <Link
                  style={{ color: "black" }}
                  to={`/join/${meeting.meetingId}`}
                >
                  Join now
                </Link>
              </EuiBadge>
            );
          } else if (
            moment(meeting.meetingDate).isBefore(moment().format("L"))
          ) {
            return <EuiBadge color="default">Ended</EuiBadge>;
          } else if (moment(meeting.meetingDate).isAfter()) {
            return <EuiBadge color="primary">Upcoming</EuiBadge>;
          }
        } else {
          return <EuiBadge color="danger">Cancelled</EuiBadge>;
        }
      },
    },

    {
      field: "meetingId",
      name: "Copy Link",

      render: (meetingId: string) => {
        return (
          <EuiCopy
            textToCopy={`${process.env.REACT_APP_HOST}/join/${meetingId}`}
          >
            {(copy: any) => (
              <EuiButtonIcon
                iconType="copy"
                onClick={copy}
                display="base"
                color="success"
                aria-label="Meeting-copy"
              />
            )}
          </EuiCopy>
        );
      },
    },
    {
      field: "",
      name: "Delete",
      render: (meeting: MeetingType) => {
        return (
          <EuiButtonIcon
            iconType="trash"
            color="danger"
            display="base"
            aria-label="Meeting-edit"
          />
        );
      },
    },
  ];
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Header />

      <EuiFlexGroup
        justifyContent="center"
        style={{
          margin: "1rem",
        }}
      >
        <EuiFlexItem>
          <EuiPanel>
            <EuiBasicTable items={meetings} columns={columns} />
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  );
};

export default Meeting;
