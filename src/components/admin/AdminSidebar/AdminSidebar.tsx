import { User, Warehouse, BriefcaseBusiness, ShieldCheck } from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../../ui/sidebar'
import { Link } from 'react-router-dom'

// Menu items.
const items = [
  {
    title: 'Company',
    url: '/admin/companies',
    icon: Warehouse,
  },
  {
    title: 'User',
    url: '/admin/users',
    icon: User,
  },
  {
    title: 'Job',
    url: '/admin/jobs',
    icon: BriefcaseBusiness,
  },
]

export default function AdminSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <div className="flex flex-row gap-2">
              <ShieldCheck />
              <p>Admin</p>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="font-normal">
                    <Link to={item.url}>
                      <div className="flex flex-row gap-2 items-center justify-between">
                        <item.icon />
                        {item.title}
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
