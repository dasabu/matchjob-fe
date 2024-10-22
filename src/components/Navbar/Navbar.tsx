import { Link, useLocation } from 'react-router-dom'
import { Separator } from '../ui/separator'

export const Navbar = () => {
  const { pathname } = useLocation()

  return (
    <>
      <nav className="max-w-7xl mx-auto px-10 py-5 mt-2 flex flex-row justify-start items-center space-x-10">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="src/assets/job.png"
            className="w-14 h-14 -hue-rotate-[50deg]"
          />
          <p className="text-[#ea1e30] font-medium text-lg">MatchJob</p>
        </Link>

        {/* HomePage */}
        <Link to="/" className="flex items-center gap-2">
          <div
            className={`font-normal text-lg ${
              pathname == '/' ? 'text-black underline' : 'text-gray-600'
            }`}
          >
            Trang chủ
          </div>
        </Link>

        {/* Top Companies */}
        <Link to="/companies" className="flex items-center gap-2">
          <div
            className={`font-normal text-lg ${
              pathname == '/companies'
                ? 'text-black underline'
                : 'text-gray-600'
            }`}
          >
            Top Công ty IT
          </div>
        </Link>

        {/* Top Jobs */}
        <Link to="/jobs" className="flex items-center gap-2">
          <div
            className={`font-normal text-lg ${
              pathname == '/top-jobs' ? 'text-black underline' : 'text-gray-600'
            }`}
          >
            Top Việc làm IT
          </div>
        </Link>
      </nav>
      <Separator />
    </>
  )
}
