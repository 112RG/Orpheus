import { lazy, Suspense } from 'react'
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
