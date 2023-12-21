import { Text } from '@mantine/core'
import { useInterval } from '@mantine/hooks'
import { appWindow } from '@tauri-apps/api/window'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  VscChromeClose,
  VscChromeMaximize,
  VscChromeMinimize,
  VscChromeRestore,
} from 'react-icons/vsc'

import classes from './TitleBar.module.css'

export function TitleBar() {
  const { t } = useTranslation()
  const [maximized, setMaximized] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const [windowTitle, setWindowTitle] = useState('')

  const tauriInterval = useInterval(() => {
    appWindow.isMaximized().then(setMaximized)
    appWindow.isFullscreen().then(setFullscreen)
    appWindow.title().then((title) => {
      if (windowTitle !== title) setWindowTitle(title)
    })
  }, 200)

  useEffect(() => {
    tauriInterval.start()
    return tauriInterval.stop
  }, [])

  return (
    !fullscreen && (
      <div
        data-tauri-drag-region
        className={classes.titlebar}
        id="titlebar"
      >
        <div>
          {/* window icon */}

          {/* left window title */}
          <Text
            data-tauri-drag-region
            inline
            className={classes.titlebarLabel}
            size="xs"
          >
            {windowTitle}
          </Text>
          {/*       <Menu shadow='md' width={4000}>
        <Menu.Dropdown>
          <Menu.Item onClick={() => appWindow.minimize()} leftSection={<VscChromeMinimize size={14} />}>{t('Minimize')}</Menu.Item>
          {maximized
            ? <Menu.Item onClick={() => appWindow.toggleMaximize()} leftSection={<VscChromeRestore size={14} />}>{t('Restore Down')}</Menu.Item>
            : <Menu.Item onClick={() => appWindow.toggleMaximize()} leftSection={<VscChromeMaximize size={14} />}>{t('Maximize')}</Menu.Item>}
          <Menu.Divider />
          <Menu.Item onClick={() => appWindow.close()} leftSection={<VscChromeClose size={14} />} rightSection={
            <Text style={{ fontWeight: 'bold', fontSize: 'xs' }}>Alt + F4</Text>}>{t('Close')}</Menu.Item>
        </Menu.Dropdown>
      </Menu> */}
        </div>
        {/* center window title */}
        {/* <Text data-tauri-drag-region inline className={classes.titlebarLabel} size='xs'>{windowTitle}</Text> */}
        <div>
          {/* window icons */}
          <div
            title={t('Minimize')}
            className={`${classes.titlebarButton} ${classes.titlebarDefaultHover}`}
            onClick={() => appWindow.minimize()}
          >
            <VscChromeMinimize className={classes.verticalAlign} />
          </div>
          {maximized ? (
            <div
              title={t('Restore Down')}
              className={`${classes.titlebarButton} ${classes.titlebarDefaultHover}`}
              onClick={() => appWindow.toggleMaximize()}
            >
              <VscChromeRestore className={classes.verticalAlign} />
            </div>
          ) : (
            <div
              title={t('Maximize')}
              className={`${classes.titlebarButton} ${classes.titlebarDefaultHover}`}
              onClick={() => appWindow.toggleMaximize()}
            >
              <VscChromeMaximize className={classes.verticalAlign} />
            </div>
          )}
          <div
            title={t('Close')}
            className={`${classes.titlebarButton} ${classes.titlebarCloseHover}`}
            onClick={() => appWindow.close()}
          >
            <VscChromeClose className={classes.verticalAlign} />
          </div>
        </div>
      </div>
    )
  )
}
