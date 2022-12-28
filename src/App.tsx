import '@elastic/eui/dist/eui_theme_light.css';
import { EuiProvider, EuiThemeProvider } from '@elastic/eui'
import React from 'react'
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { Routes, Route } from 'react-router-dom';
const App = () => {

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
    <EuiProvider>
      <EuiThemeProvider modify={override} >

      <Routes >
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="*" element={<Dashboard />} />
      </Routes>
      </EuiThemeProvider>
    
    
  </EuiProvider>
  )
}

export default App
