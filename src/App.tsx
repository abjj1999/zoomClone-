
import { EuiGlobalToastList, EuiProvider, EuiThemeColorMode, EuiThemeProvider } from '@elastic/eui'
import React from 'react'
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { Routes, Route } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './app/hooks';
import ThemeSelector from './components/ThemeSelector';
import CreateMeeting from './pages/CreateMeeting';
import OneonOneMeeting from './pages/OneonOneMeeting';
import VideoConf from './pages/VideoConf';
import MyMeetings from './pages/MyMeetings';
import Meeting from './pages/Meeting';
const App = () => {

  const dispatch = useAppDispatch()
  const isDarktheme = useAppSelector(zoom => zoom.auth.isDarkTheme);

  const [theme, setTheme] = React.useState<EuiThemeColorMode>('light');
  const [isIntialTheme, setIsInitialTheme] = React.useState(true);

  React.useEffect(() => {
    const theme = localStorage.getItem('zoom-theme');
    if (theme) {
      setTheme(theme as EuiThemeColorMode)
    }else {
      localStorage.setItem('zoom-theme', 'light')
    }
  },[])

  React.useEffect(() => {
    if(isIntialTheme){
      setIsInitialTheme(false)

    }else{
      window.location.reload();
    }
  },[isDarktheme])

  const override = {
    colors: {
      LIGHT: {
        primary: '#0b5cff',
      },
      DARK: {
        primary: '#0b5cff',
      }
    }
  }

  const toasts = useAppSelector(zoom => zoom.meetings.toasts);
  const removeToast = (removedToast: any) => {

  };
  
  return (
    <ThemeSelector>

    <EuiProvider colorMode={theme}>
      <EuiThemeProvider modify={override} >

      <Routes >
        <Route path="/login" element={<Login />} />
        <Route path='/create' element={<CreateMeeting />} />
        <Route path='/create/oneonone' element={<OneonOneMeeting />} />
        <Route path='/create/videoconf' element={<VideoConf />} />
        <Route path='/my-meetings' element={<MyMeetings />} />
        <Route path='/meetings' element={<Meeting />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="*" element={<Dashboard />} />
      </Routes>
      <EuiGlobalToastList 
      toasts={toasts}
      dismissToast={removeToast}
      toastLifeTimeMs={5000}
      />
      </EuiThemeProvider>
    
    
  </EuiProvider>
    </ThemeSelector>
  )
}

export default App
