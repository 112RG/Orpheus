import { Route } from '@tanstack/react-router'

import { rootRoute } from '../../../App'

const AlbumList = () => {
  return (
    <>
      <div>Albumlist22</div>
      <div>Albumlist22</div>
      <div>Albumlist22</div>
      <div>Albumlist22</div>
      <div>Albumlist22</div>
      <div>Albumlist22</div>
      <div>Albumlist22</div>
      <div>Albumlist22</div>
      <div>Albumlist22</div>
      <div>Albumlist22</div>

      <div>Albumlist22</div>
      <div>Albumlist22</div>
    </>
  )
}

export const albumListRoute = new Route({
  path: 'albumList',
  getParentRoute: () => rootRoute,
  component: AlbumList,
})
