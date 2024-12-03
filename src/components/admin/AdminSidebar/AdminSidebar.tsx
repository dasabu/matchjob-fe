import {
  User,
  Warehouse,
  BriefcaseBusiness,
  ShieldCheck,
  FileUser,
  ChevronUp,
} from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../../ui/sidebar'
import { Link, useNavigate } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu'
import { useAuthStore } from '../../../store/authStore'
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar'
import { Button } from '../../ui/button'

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
  {
    title: 'Resume',
    url: '/admin/resumes',
    icon: FileUser,
  },
]

export default function AdminSidebar() {
  const user = useAuthStore((state) => state.user)
  const navigate = useNavigate()
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <div className="flex flex-row gap-2">
              <ShieldCheck />
              Admin
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
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="h-12 flex flex-row justify-between items-center">
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                  <div>Hi, {user?.user.name}</div>
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem
                  onClick={() => navigate('/')}
                  className="hover:cursor-pointer"
                >
                  Trang chủ
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    useAuthStore.getState().signOut()
                    navigate('/sign-in')
                  }}
                  className="hover:cursor-pointer"
                >
                  Đăng xuất
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
