import { Card, CardContent } from '../ui/card'
import { Separator } from '../ui/separator'

interface ICompanyCardProps {
  _id: string
  name: string
  logo: string
}

export default function CompanyCard({ _id, name, logo }: ICompanyCardProps) {
  return (
    <Card key={_id} className="hover:shadow-lg transition-shadow">
      <CardContent className="p-4 h-[350px] flex flex-col items-center justify-center">
        <img
          src={`http://localhost:8000/images/company/${logo}`}
          alt={`${name} logo`}
          className="size-[200px] object-contain mb-4"
        />
        <Separator className="my-4" />
        <h3 className="text-lg text-center font-medium">{name}</h3>
      </CardContent>
    </Card>
  )
}
