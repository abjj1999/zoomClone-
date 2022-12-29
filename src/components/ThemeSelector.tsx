import { EuiThemeColorMode } from '@elastic/eui';
import React, { Suspense } from 'react'

const LightTheme = React.lazy(() => import('./Themes/LightTheme'));
const DarkTheme = React.lazy(() => import('./Themes/Darktheme'));


export default function ThemeSelector({children}: {children: React.ReactNode}) {
    const [theme, setTheme] = React.useState<EuiThemeColorMode>('light');

    React.useEffect(() => {
        const theme = localStorage.getItem('zoom-theme');
        if (theme) {
          setTheme(theme as EuiThemeColorMode)
        }else {
          localStorage.setItem('zoom-theme', 'light')
        }
    }, [])

  return (
    <>
     <Suspense fallback={<></>}>
        {theme === 'light' ? <LightTheme /> : <DarkTheme />}
        </Suspense> 
        {children}
    </>
  )
}
