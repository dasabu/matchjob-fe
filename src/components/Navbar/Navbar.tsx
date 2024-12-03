import { Link, useMatch, useNavigate } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { ChevronDown } from 'lucide-react'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { useAuthStore } from '../../store/authStore'
import { useState } from 'react'
import UserResumeModal from '../UserResumeModal/UserResumeModal'

export default function Navbar() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const user = useAuthStore((state) => state.user)
  const navigate = useNavigate()

  // Hàm kiểm tra route có khớp (bao gồm các route con)
  const isActive = (path: string) => {
    return useMatch({ path, end: path === '/' })
  }

  const [openResumeModal, setOpenResumeModal] = useState<boolean>(false)

  return (
    <>
      <div className="sticky top-0 z-50 bg-white shadow md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-row items-center justify-between h-16">
            {/* Navigation */}
            <nav>
              {/* Logo */}
              <div className="flex flex-row gap-6">
                <Link to="/" className="text-[#ea1e30] font-medium text-base">
                  MatchJob
                </Link>

                {/* HomePage */}
                <Link
                  to="/"
                  className={`block font-normal text-base ${
                    isActive('/') ? 'text-gray-900' : 'text-gray-400'
                  } hover:text-gray-900 transition-all duration-500 ease-in-out`}
                >
                  Trang chủ
                </Link>

                {/* Top Companies */}
                <Link
                  to="/companies"
                  className={`block font-normal text-base ${
                    isActive('/companies') ? 'text-gray-900' : 'text-gray-400'
                  } hover:text-gray-900 transition-all duration-500 ease-in-out`}
                >
                  Top Công ty IT
                </Link>

                {/* Top Jobs */}
                <Link
                  to="/jobs"
                  className={`block font-normal text-base ${
                    isActive('/jobs') ? 'text-gray-900' : 'text-gray-400'
                  } hover:text-gray-900 transition-all duration-500 ease-in-out`}
                >
                  Top Việc làm IT
                </Link>
              </div>
            </nav>
            {/* Profile */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-16">
                    <div className="flex flex-row items-center gap-2">
                      <Avatar>
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="@shadcn"
                        />
                        <AvatarFallback>A</AvatarFallback>
                      </Avatar>
                      <ChevronDown className="size-4" />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40">
                  <DropdownMenuLabel className="font-normal">
                    Tài khoản
                  </DropdownMenuLabel>
                  {user?.user?.role?.name == 'SUPER_ADMIN' && (
                    <DropdownMenuItem
                      onClick={() => navigate('/admin')}
                      className="hover:cursor-pointer"
                    >
                      Trang quản trị
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    onClick={() => setOpenResumeModal(true)}
                    className="hover:cursor-pointer"
                  >
                    CV của tôi
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={useAuthStore.getState().signOut}
                    className="hover:cursor-pointer"
                  >
                    Đăng xuất
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex flex-row gap-4 items-center">
                <Link
                  to="/sign-in"
                  className="block font-normal text-base text-gray-500 hover:text-gray-900 transition-all duration-500 ease-in-out"
                >
                  Đăng nhập
                </Link>
                <Button className="font-normal">
                  <Link to="sign-up">Đăng ký</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <UserResumeModal
        open={openResumeModal}
        onOpenChange={setOpenResumeModal}
      />
    </>
  )
}
