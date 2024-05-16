import { AdminSidebars } from "@components/index"
import { Outlet } from "react-router-dom"

const AdminLayout = () => {
  return (
    <main className="grid grid-cols-12">
      <div className="col-span-2 bg-main-600 text-white h-full max-h-screen overflow-y-auto">
        <AdminSidebars />
      </div>
      <div className="col-span-10">
        <Outlet />
      </div>
    </main>
  )
}

export default AdminLayout