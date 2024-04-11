import { Navigation, TopHeader } from "@components/index"
import { Outlet } from 'react-router-dom'

const PublicLayout = () => {
  return (
    <main>
      <TopHeader />
      <Navigation />
      <div>
        <Outlet />
      </div>
    </main>
  )
}

export default PublicLayout