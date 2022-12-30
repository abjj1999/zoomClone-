
import { NavigateFunction } from "react-router-dom";
import { breadCrumbsType } from "./types";

export const getCreateMeetingBreadcrumb = (navigate: NavigateFunction) : Array<breadCrumbsType> => [
    {text: "Dashboard", href: '#', onClick: () => navigate('/dashboard')},
    {text: "Create Meeting"}
]


export const getOneonOneMeetingBreadcrumb = (navigate: NavigateFunction) : Array<breadCrumbsType> => [
    {text: "Dashboard", href: '#', onClick: () => navigate('/dashboard')},
    {text: "Create Meeting", href: '#', onClick: () => navigate('/create')},
    {text: "One on One Meeting"}
]