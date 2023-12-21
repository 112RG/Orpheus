import {
  ActionIcon,
  AppShell,
  AppShellAside,
  AppShellFooter,
  AppShellHeader,
  AppShellMain,
  AppShellNavbar,
  AppShellSection,
  Burger,
  Button,
  Group,
  Space,
  Text,
  useMantineColorScheme,
} from '@mantine/core'
import { useDisclosure, useHotkeys } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import * as tauriEvent from '@tauri-apps/api/event'
import { relaunch } from '@tauri-apps/api/process'
import { checkUpdate, installUpdate } from '@tauri-apps/api/updater'
import { useEffect, useRef, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { BsMoonStarsFill } from 'react-icons/bs'
import { ImCross } from 'react-icons/im'
import { IoSunnySharp } from 'react-icons/io5'
import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import SimpleBar from 'simplebar-react'

import LanguageHeaders from '@components/LanguageHeaders'

import 'simplebar-react/dist/simplebar.min.css'

// src imports

// imported views need to be added to the `views` list variable
import LeftSidebar from '@components/LeftSidebar'
import { ResizeHandle } from '@components/ResizeHandle'
import { ScrollToTop } from '@components/ScrollToTop'
import { useTauriContext } from '@utils/TauriProvider'

import classes from './App.module.css'
import { FOOTER, HEADER_TITLE, RUNNING_IN_TAURI, useCookie, useLocalForage } from './utils/utils'
import ExampleView from './views/ExampleView'

// fallback for React Suspense
// import Home from './Views/Home';
// import About from './Views/About';
// import CIFInfo from './Views/CIFInfo';
// if your views are large, you can use lazy loading to reduce the initial load time
// const Settings = lazy(() => import('./Views/Settings'));

export default function App() {
  const { t, i18n } = useTranslation()
  // check if using custom titlebar to adjust other components
  const { usingCustomTitleBar } = useTauriContext()

  // left sidebar
  const views = [
    //     { component: () => <Home prop1={'stuff'} />, path: '/home', name: t('Home') },
    //     { component: CIFInfo, path: '/cif-info', name: 'CIF ' + t('Info') },
    //     { component: React.memo(About), path: '/about', name: t('About') },
    // Suspense example when a component was lazy loaded
    //     { component: () => <React.Suspense fallback={<Fallback />}><Setting /></React.Suspense>, path: '/settings', name: t('Settings') },
    { component: ExampleView, path: '/example-view', name: t('ExampleView') },
  ]

  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  useHotkeys([['ctrl+J', toggleColorScheme]])

  // opened is for mobile nav
  const [mobileNavOpened, { toggle: toggleMobileNav }] = useDisclosure()
  const [desktopNavOpened, setDesktopNavOpened] = useCookie('desktop-nav-opened', true)
  const toggleDesktopNav = () => setDesktopNavOpened((o) => !o)
  // load preferences using localForage
  const [footersSeen, setFootersSeen, footersSeenLoading] = useLocalForage('footersSeen', {})

  const [navbarClearance, setNavbarClearance] = useState(0)
  const footerRef = useRef(null)
  useEffect(() => {
    if (footerRef.current) setNavbarClearance(footerRef.current.clientHeight)
  }, [footersSeen])

  const [sidebarWidth, setSidebarWidth] = useState(268)
  const [isResizing, setIsResizing] = useState(false)

  // Updater integration

  function startInstall(newVersion: string) {
    notifications.show({
      title: t('Installing update v{{ v }}', { v: newVersion }),
      message: t('Will relaunch afterwards'),
      autoClose: false,
    })
    installUpdate().then(relaunch)
  }

  // Tauri event listeners (run on mount)
  if (RUNNING_IN_TAURI) {
    // system tray events

    // update checker
    useEffect(() => {
      const promise = tauriEvent.listen('systemTray', ({ payload, ...eventObj }) => {
        console.log(payload.message)
        // for debugging purposes only
        notifications.show({
          title: '[DEBUG] System Tray Event',
          message: payload.message,
        })
      })

      // Ensure the cleanup function is returned
      return () => {
        promise.then((unlisten) => unlisten())
      }
    }, [])
  }

  function NavLinks() {
    // TODO: useHotkeys and abstract this
    return views.map((view, index) => (
      <NavLink
        align="left"
        to={view.path}
        key={index}
        end={view.exact}
        onClick={() => toggleMobileNav(false)}
        className={({ isActive }) =>
          classes.navLink + ' ' + (isActive ? classes.navLinkActive : classes.navLinkInactive)
        }
      >
        {/* TODO: Icons */}
        <Group>
          <Text>{view.name ? view.name : view.name}</Text>
        </Group>
      </NavLink>
    ))
  }

  const showFooter = FOOTER && !footersSeenLoading && !(FOOTER in footersSeen)
  const footerText = t(FOOTER)

  const scrollbarRef = useRef()

  const startResizing = useCallback((position: 'left' | 'right') => {
    console.log(position)
    if (position === 'left') return setIsResizing(true)
    return setIsResizingRight(true)
  }, [])
  const constrainSidebarWidth = (num: number) => {
    if (num < 260) {
      return 260
    }

    if (num > 400) {
      return 400
    }

    return num
  }
  const resize = useCallback(
    (mouseMoveEvent: MouseEvent) => {
      if (isResizing) {
        const width = mouseMoveEvent.clientX
        const constrainedWidth = constrainSidebarWidth(width)

        /*         if (width < MINIMUM_SIDEBAR_WIDTH - 100) {
          setSideBar({ collapsed: true })
        } else {
          setSideBar({ collapsed: false, leftWidth: constrainedWidth })
        } */
        setSidebarWidth(constrainedWidth)
      }
    },
    [isResizing],
  )

  const stopResizing = useCallback(() => {
    setIsResizing(false)
  }, [])
  useEffect(() => {
    window.addEventListener('mousemove', resize)
    window.addEventListener('mouseup', stopResizing)
    return () => {
      window.removeEventListener('mousemove', resize)
      window.removeEventListener('mouseup', stopResizing)
    }
  }, [resize, stopResizing])
  // hack for global styling the vertical simplebar based on state
  useEffect(() => {
    const el = document.getElementsByClassName('simplebar-vertical')[0]
    if (el !== undefined) {
      el.style.marginTop = usingCustomTitleBar ? '100px' : '70px'
      el.style.marginBottom = showFooter ? '50px' : 0
    }
  }, [usingCustomTitleBar, showFooter])

  return (
    <>
      <SimpleBar
        scrollableNodeProps={{ ref: scrollbarRef }}
        autoHide={false}
        className={classes.simpleBar}
      >
        <AppShell
          padding="md"
          header={{ height: 60 }}
          footer={{ height: 60 }}
          navbar={{
            width: sidebarWidth,
            breakpoint: 'sm',
            collapsed: { mobile: !mobileNavOpened, desktop: !desktopNavOpened },
          }}
          aside={{
            width: 200,
            breakpoint: 'sm',
            collapsed: { desktop: false, mobile: true },
          }}
          className={classes.appShell}
        >
          <AppShellMain>
            {usingCustomTitleBar && <Space h="xl" />}
            <Routes>
              <Route
                path="/"
                element={<Navigate to={views[0].path} />}
              />
              {views.map((view, index) => (
                <Route
                  key={index}
                  exact={view.exact}
                  path={view.path}
                  element={<view.component />}
                />
              ))}
            </Routes>
            {/* prevent the footer from covering bottom text of a route view */}
            {showFooter && <Space h={80} />}
            <ScrollToTop
              scroller={scrollbarRef.current}
              bottom={showFooter ? 70 : 20}
            />
          </AppShellMain>

          <AppShellHeader
            data-tauri-drag-region
            p="md"
            className={classes.header}
          >
            <Group h="100%">
              <Burger
                hiddenFrom="sm"
                opened={mobileNavOpened}
                onClick={toggleMobileNav}
                size="sm"
              />
              <Burger
                visibleFrom="sm"
                opened={desktopNavOpened}
                onClick={toggleDesktopNav}
                size="sm"
              />
              <Text>{HEADER_TITLE}</Text>
            </Group>
            <Group
              className={classes.headerRightItems}
              h="110%"
            >
              <LanguageHeaders i18n={i18n} />
              <ActionIcon
                id="toggle-theme"
                title="Ctrl + J"
                variant="default"
                onClick={() => toggleColorScheme()}
                size={30}
              >
                {colorScheme === 'dark' ? <IoSunnySharp size={'1.5em'} /> : <BsMoonStarsFill />}
              </ActionIcon>
            </Group>
          </AppShellHeader>
          <LeftSidebar
            isResizing={isResizing}
            startResizing={startResizing}
            titleBarAdjustedHeight={classes.titleBarAdjustedHeight}
          />

          <AppShellAside
            className={classes.titleBarAdjustedHeight}
            p="md"
            width={{ sm: 200, lg: 300 }}
          >
            <Text>
              Right Side. Use for help, support, quick action menu? For example, if we were building
              a trading app, we could use the aside for the trade parameters while leaving the main
              UI with the data
            </Text>
          </AppShellAside>

          {showFooter && (
            <AppShellFooter
              p="md"
              className={classes.footer}
            >
              {footerText}
              <Button
                variant="subtle"
                size="xs"
                onClick={() => setFootersSeen((prev) => ({ ...prev, [FOOTER]: '' }))}
              >
                <ImCross />
              </Button>
            </AppShellFooter>
          )}
        </AppShell>
      </SimpleBar>
    </>
  )
}
