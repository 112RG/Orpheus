import { Button } from '@mantine/core'
import { Link, RootRoute } from '@tanstack/react-router'
import React from 'react'
import { Outlet } from 'react-router-dom'

import { router } from '../../router/app-router'

const Home = () => {
  async function test() {
    console.log('test')
    await router.navigate({ to: '/albumList' })
  }

  return (
    <>
      <Link to="/albumList">Search</Link>
      <Outlet />
    </>
  )
}
