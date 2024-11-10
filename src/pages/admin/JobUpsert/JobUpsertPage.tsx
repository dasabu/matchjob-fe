import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '../../../lib/utils'
import { Button } from '../../../components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../components/ui/form'
import { Input } from '../../../components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../../components/ui/popover'
import { Switch } from '../../../components/ui/switch'
import ReactQuill from 'react-quill'
import { MultiSelect } from '../../../components/ui/multi-select'
import { LEVEL_LIST, LOCATION_LIST, SKILL_LIST } from '../../../utils/constants'
import { Calendar } from '../../../components/ui/calendar'
import { Badge } from '../../../components/ui/badge'
import { getCompaniesApi } from '../../../apis/company.api'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ICompany, IJob } from '../../../interfaces/schemas'
import { useLocation } from 'react-router'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '../../../components/ui/breadcrumb'
import { Link } from 'react-router-dom'
import { getJobByIdApi } from '../../../apis/job.api'

const formSchema = z.object({
  name: z.string().min(2),
  skills: z.array(z.string()).min(1),
  location: z.string(),
  salary: z.number().int().positive().min(0),
  quantity: z.number().int().positive().min(0),
  level: z.string(),
  company: z.object({
    _id: z.string(),
    name: z.string(),
    logo: z.string(),
  }),
  startDate: z.date(),
  endDate: z.date(),
  isActive: z.boolean().default(true),
  description: z.string(),
})

export default function JobUpsertPage() {
  const [companies, setCompanies] = useState<ICompany[] | undefined>()
  const [job, setJob] = useState<IJob | undefined>()

  const [startDate, setStartDate] = useState<Date | undefined>()
  const [endDate, setEndDate] = useState<Date | undefined>()

  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const id = params?.get('id')

  const { data: jobData } = useQuery({
    queryKey: ['job', id],
    queryFn: async () => {
      if (id) {
        return await getJobByIdApi(id)
      } else return undefined
    },
  })

  useEffect(() => {
    if (jobData?.data?.data) {
      setJob(jobData?.data?.data)
    }
  }, [jobData])

  console.log(job)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: job?.name || '',
      skills: job?.skills || [],
      location: job?.location || '',
      salary: job?.salary || 0,
      quantity: job?.quantity || 1,
      level: job?.level || '',
      company: job?.company || undefined,
      startDate: job?.startDate || undefined,
      endDate: job?.endDate || undefined,
      isActive: job?.isActive || true,
      description: job?.description || '',
    },
  })

  useEffect(() => {
    if (job) {
      form.reset({
        name: job.name,
        skills: job.skills,
        location: job.location,
        salary: job.salary,
        quantity: job.quantity,
        level: job.level,
        company: job.company,
        startDate: job.startDate,
        endDate: job.endDate,
        isActive: job.isActive,
        description: job.description,
      })
    }
  }, [job, form])

  const { data: companiesData } = useQuery({
    queryKey: ['companies'],
    queryFn: async () => await getCompaniesApi(`current=1&pageSize=100`),
  })

  useEffect(() => {
    if (companiesData?.data?.data?.result) {
      setCompanies(companiesData.data.data.result)
    }
  }, [companiesData])

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)
  }

  return (
    <div className="max-w-7xl mx-auto lg:p-10 p-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link to="/admin/jobs">Job Management</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink className="font-normal">Job Upsert</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {/* Main form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-8 mb-8">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="lg:col-span-4">
                  <FormLabel className="after:text-red-500 after:content-['*']">
                    Tên công việc
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập tên công việc..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Skills */}
            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem className="lg:col-span-3">
                  <FormLabel className="after:text-red-500 after:content-['*']">
                    Kỹ năng yêu cầu
                  </FormLabel>
                  <MultiSelect
                    options={SKILL_LIST}
                    onValueChange={field.onChange}
                    placeholder="Kỹ năng..."
                    maxCount={2}
                    value={field.value}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Location */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="lg:col-span-1">
                  <FormLabel className="after:text-red-500 after:content-['*']">
                    Địa điểm
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Địa điểm..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {LOCATION_LIST.map((location) => (
                        <SelectItem key={location.value} value={location.label}>
                          {location.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-6 md:grid-cols-3 mb-8">
            {/* Salary */}
            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="after:text-red-500 after:content-['*']">
                    Mức lương
                  </FormLabel>
                  <FormControl>
                    <div className="flex">
                      <Input
                        type="number"
                        placeholder="Nhập mức lương..."
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                      <span className="ml-2 flex items-center font-light">
                        đ
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Quantity */}
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="after:text-red-500 after:content-['*']">
                    Số lượng
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Số lượng cần tuyển..."
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Level */}
            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="after:text-red-500 after:content-['*']">
                    Trình độ
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Level..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {LEVEL_LIST.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Company */}
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="after:text-red-500 after:content-['*']">
                    Công ty
                  </FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn công ty..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {companies &&
                        companies.map((company) => (
                          <SelectItem key={company._id} value={company.name!}>
                            {company.name!}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Start Date */}
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="after:text-red-500 after:content-['*']">
                    Ngày bắt đầu
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-full pl-3 text-left font-light',
                            !startDate && 'text-muted-foreground'
                          )}
                        >
                          {startDate ? (
                            format(startDate, 'dd/MM/yyyy')
                          ) : (
                            <span>dd/mm/yyyy</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={(date) => setStartDate(date)}
                        disabled={(date) => (endDate ? date > endDate : false)}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* End Date */}
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="after:text-red-500 after:content-['*']">
                    Ngày kết thúc
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-full pl-3 text-left font-light',
                            !endDate && 'text-muted-foreground'
                          )}
                        >
                          {endDate ? (
                            format(endDate, 'dd/MM/yyyy')
                          ) : (
                            <span>dd/mm/yyyy</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={(date) => setEndDate(date)}
                        disabled={(date) =>
                          startDate ? date < startDate : false
                        }
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-8 mb-14">
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Trạng thái</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      {field.value ? (
                        <Badge className="font-normal bg-green-200 text-green-700 hover:bg-green-100">
                          Active
                        </Badge>
                      ) : (
                        <Badge className="font-normal bg-red-200 text-red-700 hover:bg-red-100">
                          Inactive
                        </Badge>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="after:text-red-500 after:content-['*']">
                    Job Description
                  </FormLabel>
                  <FormControl>
                    <ReactQuill className="h-96" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-start space-x-4">
            <Button type="submit">Save</Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Hủy
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
