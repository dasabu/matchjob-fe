import { useState } from 'react'

import { MapPin } from 'lucide-react'
import { Button } from '../ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

import { SKILLS_LIST, LOCATIONS_LIST } from '../../utils/constants'
import { MultiSelect } from '../ui/mutil-select'

export default function JobSearchForm() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [location, setLocation] = useState<string>()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ selectedSkills, location })
  }
  return (
    <form onSubmit={handleSubmit} className="w-1/2">
      <div className="flex flex-col md:flex-row items-stretch gap-4 mb-16">
        <MultiSelect
          options={SKILLS_LIST}
          onValueChange={setSelectedSkills}
          placeholder="Tìm theo kỹ năng"
          variant="inverted"
          animation={2}
          maxCount={3}
        />
        <Select onValueChange={(value) => setLocation(value)}>
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
            {LOCATIONS_LIST.map((loc) => (
              <SelectItem key={loc.value} value={loc.label}>
                {loc.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button type="submit">Search</Button>
      </div>
    </form>
  )
}
