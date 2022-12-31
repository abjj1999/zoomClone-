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
import EditFlyout from "../components/EditFlyout";
import Header from "../components/Header";
import UseAuth from "../hooks/UseAuth";
import { meetingRef } from "../utils/FirebaseConfig";
import { MeetingType } from "../utils/types";

const MyMeetings = () => {
  UseAuth();
  const [meetings, setMeetings] = React.useState<any>([]);
  const userInfo = useAppSelector((zoom) => zoom.auth.userInfo);

  const getMyMeetings = async () => {
    const firestoreQuery = query(
      meetingRef,
      where("createdBy", "==", userInfo?.uid)
    );
    const fetchedMeetings = await getDocs(firestoreQuery);
    if (fetchedMeetings.docs.length) {
      const MyMeetings: Array<MeetingType> = [];
      fetchedMeetings.forEach((meeting) => {
        MyMeetings.push({
          docId: meeting.id,
          ...(meeting.data() as MeetingType),
        });
      });
      setMeetings(MyMeetings);
    }
  };

  useEffect(() => {
    getMyMeetings();
  }, [userInfo]);

  const [showEditFlyout, setShowEditFlyout] = React.useState<boolean>(false);
  const [editMeeting, setEditMeeting] = React.useState<MeetingType | null>();
  const openEditFlyout = (meeting: MeetingType) => {
    setShowEditFlyout(true);
    setEditMeeting(meeting);
  };

  const closeEditFlyout = (dataChanged = false) => {
    setShowEditFlyout(false);
    setEditMeeting(undefined);
    if (dataChanged) {
      getMyMeetings();
    }
  };

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
          } else if (moment(meeting.meetingDate).isBefore(moment().format("L"))) {
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
      field: "",
      name: "Edit",
      render: (meeting: MeetingType) => {
        return (
          <EuiButtonIcon
            iconType="pencil"
            display="base"
            aria-label="Meeting-edit"
            disabled={
              !meeting.status ||
              moment(meeting.meetingDate).isBefore(moment().format("L"))
            }
            onClick={() => openEditFlyout(meeting)}
          />
        );
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
      {
        showEditFlyout && <EditFlyout closeEditFlyout= {closeEditFlyout} meetings= {editMeeting!}  />
      }
    </div>
  );
};

export default MyMeetings;
