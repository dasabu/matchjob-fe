import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { MapPin } from 'lucide-react'

import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem } from '../ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { MultiSelect } from '../ui/mutil-select'
import { SKILLS_LIST, LOCATIONS_LIST } from '../../utils/constants'

const formSchema = z.object({
  skills: z.array(z.string()).min(1, {
    message: 'Vui lòng chọn ít nhất một kỹ năng.',
  }),
  location: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

export default function JobSearchForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      skills: [],
      location: undefined,
    },
  })

  const onSubmit = (values: FormValues) => {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3">
        <div className="flex flex-col md:flex-row items-stretch gap-4 mb-16">
          <FormField
            control={form.control}
            name="skills"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormControl>
                  <Controller
                    name="skills"
                    control={form.control}
                    render={({ field }) => (
                      <MultiSelect
                        options={SKILLS_LIST}
                        onValueChange={field.onChange}
                        placeholder="Tìm theo kỹ năng"
                        maxCount={3}
                        value={field.value}
                      />
                    )}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full md:w-[200px] min-h-10">
                      <SelectValue
                        placeholder={
                          <div className="flex items-center text-slate-600">
                            Địa điểm...
                          </div>
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {LOCATIONS_LIST.map((loc) => (
                      <SelectItem key={loc.value} value={loc.value}>
                        {loc.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <Button type="submit" className="min-h-10 px-5">
            Search
          </Button>
        </div>
      </form>
    </Form>
  )
}
