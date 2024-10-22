import React, { useState, useEffect } from 'react'
import { Button } from '../../components/ui/button'
import { Card, CardContent } from '../../components/ui/card'
import { Input } from '../../components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select'
import { Separator } from '../../components/ui/separator'
import { MapPin, Monitor } from 'lucide-react'

// Mock data (replace with actual data fetching)
const SKILLS_LIST = ['React', 'Node.js', 'Python', 'Java']
const LOCATION_LIST = ['Ho Chi Minh', 'Ha Noi', 'Da Nang']
const COMPANIES = [
  { id: 1, name: 'Company A', logo: '/placeholder.svg' },
  { id: 2, name: 'Company B', logo: '/placeholder.svg' },
  { id: 3, name: 'Company C', logo: '/placeholder.svg' },
  { id: 4, name: 'Company D', logo: '/placeholder.svg' },
]
const JOBS = [
  {
    id: 1,
    name: 'Frontend Developer',
    company: { logo: '/placeholder.svg' },
    location: 'Ho Chi Minh',
    salary: 1000000,
    updatedAt: '2023-05-01',
  },
  {
    id: 2,
    name: 'Backend Developer',
    company: { logo: '/placeholder.svg' },
    location: 'Ha Noi',
    salary: 1500000,
    updatedAt: '2023-05-02',
  },
  {
    id: 3,
    name: 'Full Stack Developer',
    company: { logo: '/placeholder.svg' },
    location: 'Da Nang',
    salary: 2000000,
    updatedAt: '2023-05-03',
  },
]

const SearchClient = () => {
  const [skills, setSkills] = useState<string[]>([])
  const [location, setLocation] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ skills, location })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold">Việc Làm IT Cho Developer "Chất"</h2>
      <div className="flex flex-col md:flex-row gap-4">
        <Select onValueChange={(value) => setSkills([...skills, value])}>
          <SelectTrigger className="w-full md:w-[400px]">
            <SelectValue
              placeholder={
                <div className="flex items-center">
                  <Monitor className="mr-2" /> Tìm theo kỹ năng...
                </div>
              }
            />
          </SelectTrigger>
          <SelectContent>
            {SKILLS_LIST.map((skill) => (
              <SelectItem key={skill} value={skill}>
                {skill}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => setLocation([...location, value])}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue
              placeholder={
                <div className="flex items-center">
                  <MapPin className="mr-2" /> Địa điểm...
                </div>
              }
            />
          </SelectTrigger>
          <SelectContent>
            {LOCATION_LIST.map((loc) => (
              <SelectItem key={loc} value={loc}>
                {loc}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button type="submit">Search</Button>
      </div>
    </form>
  )
}

const CompanyCard = ({ showPagination = false }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Nhà Tuyển Dụng Hàng Đầu</h2>
        {!showPagination && (
          <a href="/company" className="text-blue-500 hover:underline">
            Xem tất cả
          </a>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {COMPANIES.map((company) => (
          <Card key={company.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4 h-[350px] flex flex-col items-center justify-center">
              <img
                src={company.logo}
                alt={company.name}
                className="w-32 h-32 object-contain mb-4"
              />
              <Separator className="my-4" />
              <h3 className="text-center font-semibold">{company.name}</h3>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

const JobCard = ({ showPagination = false }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Công Việc Mới Nhất</h2>
        {!showPagination && (
          <a href="/job" className="text-blue-500 hover:underline">
            Xem tất cả
          </a>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {JOBS.map((job) => (
          <Card key={job.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4 flex">
              <img
                src={job.company.logo}
                alt={job.name}
                className="w-16 h-16 object-contain mr-4"
              />
              <div>
                <h3 className="font-semibold">{job.name}</h3>
                <p className="text-sm text-gray-600">
                  <MapPin className="inline-block mr-1" size={16} />
                  {job.location}
                </p>
                <p className="text-sm text-gray-600">
                  {job.salary.toLocaleString()} đ
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(job.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="mt-5">
        <SearchClient />
      </div>
      <Separator />
      <CompanyCard />
      <div className="my-12"></div>
      <Separator />
      <JobCard />
    </div>
  )
}
