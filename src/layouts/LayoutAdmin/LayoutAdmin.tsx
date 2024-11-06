import { Outlet } from 'react-router'
import AdminSidebar from '../../components/admin/AdminSidebar'
import { SidebarProvider, SidebarTrigger } from '../../components/ui/sidebar'

interface ILayoutAdminProps {
  children?: React.ReactNode
}

export default function LayoutAdmin({ children }: ILayoutAdminProps) {
  return (
    <>
      <SidebarProvider>
        <AdminSidebar />
        <SidebarTrigger />
        {children}
        <Outlet />
      </SidebarProvider>
    </>
  )
}
