import { EuiButton, EuiButtonIcon, EuiFlexGroup, EuiFlexItem, EuiHeader, EuiText, EuiTextColor } from '@elastic/eui';
import { signOut } from 'firebase/auth';
import React from 'react'
import { useDispatch } from 'react-redux';
import {useNavigate, useLocation, Link } from 'react-router-dom'
import { useAppSelector } from '../app/hooks';
import { firebaseAuth } from '../utils/FirebaseConfig';
import { changeTheme } from '../app/slices/AuthSlice';
import { getCreateMeetingBreadcrumb, getOneonOneMeetingBreadcrumb, getVideoConfMeetingBreadcrumb, myMeetingsBreadcrumb } from '../utils/breadCrumbs';
const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const username = useAppSelector(zoom => zoom.auth.userInfo?.name)
    const isDarkTheme = useAppSelector(zoom => zoom.auth.isDarkTheme);

    const [breadcrumb, setBreadcrumb] = React.useState([
        {
            text: 'Dashboard',
        }
    ])
    const dispatch = useDispatch();
    const [isResponsive, setIsResponsive] = React.useState(false);
    const logout = () => {
        signOut(firebaseAuth)
    };
    const changTheme = () => {
        const theme = localStorage.getItem('zoom-theme');
        localStorage.setItem('zoom-theme', theme === 'light' ? 'dark' : 'light');
        dispatch(changeTheme({isDarkTheme: !isDarkTheme}))

    }
    React.useEffect(() => {
        const {pathname} = location;
        if(pathname === '/create'){
            setBreadcrumb(getCreateMeetingBreadcrumb(navigate))
        }else if (pathname === '/create/oneonone'){
            setBreadcrumb(getOneonOneMeetingBreadcrumb(navigate))
        }
        else if(pathname === '/create/videoconf'){
            setBreadcrumb(getVideoConfMeetingBreadcrumb(navigate))
        }
        else if(pathname === '/my-meetings'){
            setBreadcrumb(myMeetingsBreadcrumb(navigate))
        }
    }, [])
    const sections = [{
        items: [
            <Link to='/'>
                <EuiText style={{}}>
                    <h2 style={{
                        padding: '0 1vw',
                    }}>
                        <EuiTextColor color='#0b5cff'>
                            Zoom
                        </EuiTextColor>
                    </h2>
                </EuiText>
            </Link>
        ]
    },
    {
        items: [
            <>
            {username? (
                <EuiText style={{}}>
                <h3 style={{
                    padding: '0 1vw',
                }}>
                    <EuiTextColor color={"white"}>
                        Hello,  {" "}
                    </EuiTextColor>
                    <EuiTextColor color='#0b5cff'>
                        {username}
                    </EuiTextColor>
                </h3>
            </EuiText>
            ): (
                null
            )}
                
            </>
        ]
    }, 
    {
        items: [
            <EuiFlexGroup justifyContent='center' alignItems='center' direction='row' style={{
                gap: '2vw'
            }}>
                <EuiFlexItem grow={false} style={{flexBasis: "fit-content"}} >
                    {
                        isDarkTheme ? (
                            <EuiButtonIcon onClick={changTheme}  iconType="sun" color="warning" display='fill' size='s' aria-label='invert-button' />

                        ): (

                            <EuiButtonIcon onClick={changTheme}  iconType="moon" color="ghost" display='fill' size='s' aria-label='invert-button' />
                        )
                    }

                </EuiFlexItem>
                <EuiFlexItem grow={false} style={{flexBasis: "fit-content"}} >
                    <EuiButtonIcon onClick={logout} iconType="lock" display='fill' size='s' aria-label='logout-button' />
                </EuiFlexItem>
            </EuiFlexGroup>
        ]
    }
];
    const responsiveSections = [
        {
            items: [
                <Link to='/'>
                    <EuiText style={{}}>
                        <h2 style={{
                            padding: '0 1vw',
                        }}>
                            <EuiTextColor>
                                Zoom
                            </EuiTextColor>
                        </h2>
                    </EuiText>
                </Link>
            ]
        },
        {
            items: [
                <EuiFlexGroup justifyContent='center' alignItems='center' direction='row' style={{
                    gap: '2vw'
                }}>
                    <EuiFlexItem grow={false} style={{flexBasis: "fit-content"}} >
                        {
                            isDarkTheme ? (
                                <EuiButtonIcon onClick={changTheme}  iconType="sun" color="warning" display='fill' size='s' aria-label='invert-button' />
    
                            ): (
    
                                <EuiButtonIcon onClick={changTheme}  iconType="moon" color="ghost" display='fill' size='s' aria-label='invert-button' />
                            )
                        }
    
                    </EuiFlexItem>
                    <EuiFlexItem grow={false} style={{flexBasis: "fit-content"}} >
                        <EuiButtonIcon onClick={logout} iconType="lock" display='fill' size='s' aria-label='logout-button' />
                    </EuiFlexItem>
                </EuiFlexGroup>
            ]
        }
    ];
    React.useEffect(() => {
        if(window.innerWidth < 480) {
            setIsResponsive(true);
        }
    }, [])
  return (
    <>
        <EuiHeader style={{ minHeight: '8vh' }} theme="dark" sections={
            isResponsive ? responsiveSections : sections
        } />
        <EuiHeader style={{
            minHeight: '8vh',
        }} sections={[{breadcrumbs: breadcrumb}]} />
    </>
  )
}

export default Header
