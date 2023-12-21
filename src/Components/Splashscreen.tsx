import { Center, Loader } from '@mantine/core'
export default function Splashscreen() {
  // filler
  return (
    <Center style={{ height: '100vh', width: '100vw' }}>
      <Loader size="xl" />
    </Center>
  )
}
