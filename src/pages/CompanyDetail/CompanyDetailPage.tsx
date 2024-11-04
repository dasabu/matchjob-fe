import { useLocation } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card'
import { Skeleton } from '../../components/ui/skeleton'
import parse from 'html-react-parser'
import { getCompanyByIdApi } from '../../apis/company.api'
import { useQuery } from '@tanstack/react-query'
import { ICompany } from '../../interfaces/schemas'
import { useEffect, useState } from 'react'

export default function CompanyDetailPage() {
  const [company, setCompany] = useState<ICompany | undefined>()

  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const id = params.get('id')

  const { data, isPending } = useQuery({
    queryKey: ['company', id],
    queryFn: ({ queryKey }) => {
      const id = queryKey[1]
      return getCompanyByIdApi(id!)
    },
  })

  useEffect(() => {
    if (data?.data?.data) {
      setCompany(data?.data?.data)
    }
  }, [data?.data?.data])

  if (isPending) {
    return (
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Skeleton className="h-96" />
          </div>
          <div>
            <Skeleton className="h-56" />
          </div>
        </div>
      </div>
    )
  }

  if (!company) {
    return (
      <div className="container mx-auto p-4">No company details found.</div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 order-2 md:order-1">
          <Card>
            <CardHeader>
              <CardTitle>{company.name}</CardTitle>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{company.address}</span>
              </div>
            </CardHeader>
            <CardContent>{parse(company.description || '')}</CardContent>
          </Card>
        </div>
        <div className="order-1 md:order-2">
          <Card>
            <CardContent className="flex flex-col items-center p-6">
              <img
                alt={`${company.name} logo`}
                src={`http://localhost:8000/images/company/${company.logo}`}
                className="w-32 h-32 object-contain mb-4"
              />
              <h3 className="text-lg font-semibold">{company.name}</h3>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
