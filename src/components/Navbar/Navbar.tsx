import { Link, useMatch } from 'react-router-dom'
import { Separator } from '../ui/separator'

export default function Navbar() {
  // Hàm kiểm tra route có khớp (bao gồm các route con)
  const isActive = (path: string) => {
    return useMatch({ path, end: path === '/' })
  }

  return (
    <>
      <nav className="max-w-7xl mx-auto px-4 py-6">
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
      <Separator />
    </>
  )
}
