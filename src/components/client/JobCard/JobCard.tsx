import { BadgeDollarSign, MapPin } from 'lucide-react'
import { Card, CardContent } from '../../ui/card'
import {
  formatSalary,
  generateSlug,
  getLocationLabel,
} from '../../../utils/helpers'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useNavigate } from 'react-router'
dayjs.extend(relativeTime)

interface IJobCardProps {
  _id: string
  logo: string
  name: string
  salary: number
  location: string
  updatedAt: string
}

export default function JobCard({
  _id,
  logo,
  name,
  salary,
  location,
  updatedAt,
}: IJobCardProps) {
  const navigate = useNavigate()

  const handleNavigateToCompanyDetail = () => {
    if (_id && name) {
      const slug = generateSlug(name)
      navigate(`/jobs/${slug}?id=${_id}`)
    }
  }

  return (
    <Card
      key={_id}
      className="hover:shadow-lg transition-shadow"
      onClick={handleNavigateToCompanyDetail}
    >
      <CardContent className="p-6 flex items-center space-x-1">
        <img
          src={`http://localhost:8000/images/company/${logo}`}
          alt={`${name} logo`}
          className="size-16 object-contain mr-4 rounded-xl"
        />
        <div className="grow text-gray-800">
          <h4 className="font-medium  text-lg mb-3">{name}</h4>
          <p className="inline-block font-normal text-gray-700 mb-3">
            <MapPin className="text-[#e32b35] inline-block mr-2" size={16} />
            {getLocationLabel(location)}
          </p>
          <div className="flex flex-row justify-between items-center">
            <p className="font-normal text-gray-700">
              <BadgeDollarSign
                className="inline-block mr-2 text-[#85bb65]"
                size={16}
              />
              {formatSalary(salary)}{' '}
            </p>
            <p className="text-sm text-[#2666c0] mr-4">
              {dayjs(updatedAt).fromNow()}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
