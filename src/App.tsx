
import { EuiProvider, EuiThemeColorMode, EuiThemeProvider } from '@elastic/eui'
import React from 'react'
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { Routes, Route } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './app/hooks';
import ThemeSelector from './components/ThemeSelector';
import CreateMeeting from './pages/CreateMeeting';
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
  
  return (
    <ThemeSelector>

    <EuiProvider colorMode={theme}>
      <EuiThemeProvider modify={override} >

      <Routes >
        <Route path="/login" element={<Login />} />
        <Route path='/create' element={<CreateMeeting />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="*" element={<Dashboard />} />
      </Routes>
      </EuiThemeProvider>
    
    
  </EuiProvider>
    </ThemeSelector>
  )
}

export default App
