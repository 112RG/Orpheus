/* import { lazy, Suspense } from 'react'
import { Route, createRoutesFromElements, RouterProvider, createHashRouter } from 'react-router-dom'
const AppRouter = () => {
  const router = createHashRouter(
    createRoutesFromElements(
      <>
        <Route> </Route>
      </>,
    ),
  )
  return <></>
}
export default AppRouter
 */

import { Router, RouterProvider } from '@tanstack/react-router'

import { rootRoute } from '../../App'
import { albumListRoute } from '../album/routes/album-list-route'

const routeTree = rootRoute.addChildren([albumListRoute])
export const router = new Router({
  routeTree,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export const AppRouter = () => {
  return <RouterProvider router={router} />
}
