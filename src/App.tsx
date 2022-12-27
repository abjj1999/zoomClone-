import '@elastic/eui/dist/eui_theme_light.css';
import { EuiProvider } from '@elastic/eui'
import React from 'react'
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { Routes, Route } from 'react-router-dom';
const App = () => {
  
  return (
    <EuiProvider>
      <Routes >
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="*" element={<Dashboard />} />
      </Routes>
    
    
  </EuiProvider>
  )
}

export default App
