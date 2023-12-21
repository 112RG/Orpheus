// boilerplate components
// core styles are required for all packages
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
// other css files are required only if
// you are using components from the corresponding package
// import '@mantine/dates/styles.css';
// import '@mantine/dropzone/styles.css';
// import '@mantine/code-highlight/styles.css';

import '@fontsource/open-sans'
import { ColorSchemeScript, MantineProvider, createTheme, MantineColorsTuple } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'

import Splashscreen from '@components/Splashscreen'
import { TauriProvider } from '@utils/TauriProvider'

type AppProviderProps = {
  children: React.ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {
  // long tasks should use useState(true)
  const [isLoading] = useState(false)

  // override theme for Mantine (default props and styles)
  // https://mantine.dev/theming/mantine-provider/

  const theme = createTheme({
    colors: {
      dark: [
        '#C2C2C2',
        '#A3A3A3',
        '#707070',
        '#5C5C5C',
        '#292929',
        '#1F1F1F',
        '#141414',
        '#111010',
        '#0A0A0A',
        '#030303',
      ],

      /*       dark: [
        '#B0B1B4',
        '#95969A',
        '#7F8084',
        '#4B4E55',
        '#262930',
        '#1F2125',
        '#18191E',
        '#0D0E11',
        '#090A0D',
        '#060709',
      ], */
    },

    // Added Segoe UI Variable Text (Win11) to https://mantine.dev/theming/typography/#system-fonts
    fontFamily:
      '-apple-system, BlinkMacSystemFont, Segoe UI Variable Text, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji',
    // added source-code-pro and SFMono-Regular
    fontFamilyMonospace:
      'source-code-pro, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace',
    components: {
      Checkbox: { styles: { input: { cursor: 'pointer' }, label: { cursor: 'pointer' } } },
      TextInput: { styles: { label: { marginTop: '0.5rem' } } },
      Select: { styles: { label: { marginTop: '0.5rem' } } },
      Loader: { defaultProps: { size: 'xl' } },
      Space: { defaultProps: { h: 'sm' } },
      Anchor: { defaultProps: { target: '_blank' } },
      Burger: { styles: { burger: { color: '--mantine-color-grey-6' } } },
    },
  })

  return (
    <>
      <ColorSchemeScript defaultColorScheme="auto" />
      <MantineProvider
        defaultColorScheme="auto"
        theme={theme}
        withCssVariables={true}
      >
        <ModalsProvider>
          <BrowserRouter>
            <TauriProvider>
              <Notifications />
              {/* show splashscreen for initial data */}
              {isLoading ? <Splashscreen /> : children}
            </TauriProvider>
          </BrowserRouter>
        </ModalsProvider>
      </MantineProvider>
    </>
  )
}
