import { AppShellNavbar, AppShellSection, Space, Text } from '@mantine/core'

import { ResizeHandle } from '@components/ResizeHandle'
interface LeftSidebarProps {
  isResizing: boolean
  startResizing: (direction: 'left' | 'right') => void
  titleBarAdjustedHeight: any
}

const LeftSidebar = ({
  isResizing: isResizingLeft,
  startResizing,
  titleBarAdjustedHeight,
}: LeftSidebarProps) => {
  return (
    <>
      <AppShellNavbar
        className={titleBarAdjustedHeight}
        height="100%"
        width={{ sm: 200 }}
        p="xs"
        hidden={!false}
      >
        {
          <ResizeHandle
            $isResizing={isResizingLeft}
            $placement="right"
            onMouseDown={(e) => {
              e.preventDefault()
              startResizing('left')
            }}
          />
        }

        <AppShellSection grow>{/* <NavLinks /> */}</AppShellSection>
        <AppShellSection>
          {}
          <Space h={15} /> {/* Account for footer */}
        </AppShellSection>
      </AppShellNavbar>
    </>
  )
}
export default LeftSidebar
