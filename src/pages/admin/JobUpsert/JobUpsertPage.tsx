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
import { useLocation, useNavigate } from 'react-router'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '../../../components/ui/breadcrumb'
import { Link } from 'react-router-dom'
import {
  createJobApi,
  getJobByIdApi,
  updateJobApi,
} from '../../../apis/job.api'
import { toast } from '../../../hooks/use-toast'

const formSchema = z.object({
  name: z.string().min(2),
  skills: z.array(z.string()).min(1),
  location: z.string(),
  salary: z.number().int().positive().min(0),
  quantity: z.number().int().positive().min(0),
  level: z.string(),
  company: z.string(),
  startDate: z.preprocess(
    (val) => (typeof val === 'string' ? new Date(val) : val),
    z.date()
  ),
  endDate: z.preprocess(
    (val) => (typeof val === 'string' ? new Date(val) : val),
    z.date()
  ),
  isActive: z.boolean().default(true),
  description: z.string(),
})

export default function JobUpsertPage() {
  const [companiesData, setCompaniesData] = useState<ICompany[] | undefined>()
  const [jobData, setJobData] = useState<IJob | undefined>()

  const [startDate, setStartDate] = useState<Date | undefined>()
  const [endDate, setEndDate] = useState<Date | undefined>()

  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const id = params?.get('id')

  const navigate = useNavigate()

  const { data: fetchedJobData } = useQuery({
    queryKey: ['job', id],
    queryFn: async () => {
      if (id) {
        return await getJobByIdApi(id)
      } else {
        return undefined
      }
    },
  })

  useEffect(() => {
    if (fetchedJobData?.data?.data) {
      setJobData(fetchedJobData.data.data)
    }
  }, [fetchedJobData])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: jobData?.name || '',
      skills: jobData?.skills || [],
      location: jobData?.location || '',
      salary: jobData?.salary || 0,
      quantity: jobData?.quantity || 1,
      level: jobData?.level || '',
      company: jobData?.company?._id || undefined,
      startDate: jobData?.startDate || undefined,
      endDate: jobData?.endDate || undefined,
      isActive: jobData?.isActive || true,
      description: jobData?.description || '',
    },
  })

  useEffect(() => {
    if (jobData) {
      form.reset({
        name: jobData.name,
        skills: jobData.skills,
        location: jobData.location,
        salary: jobData.salary,
        quantity: jobData.quantity,
        level: jobData.level,
        company: jobData?.company?._id,
        startDate: jobData.startDate,
        endDate: jobData.endDate,
        isActive: jobData.isActive,
        description: jobData.description,
      })
    } else {
      form.reset({
        name: '',
        skills: [],
        location: '',
        salary: 0,
        quantity: 1,
        level: '',
        company: '',
        startDate: undefined,
        endDate: undefined,
        isActive: true,
        description: '',
      })
    }
  }, [jobData, form])

  const { data: fetchedCompaniesData } = useQuery({
    queryKey: ['companies'],
    queryFn: async () => await getCompaniesApi(`current=1&pageSize=100`),
  })

  useEffect(() => {
    if (fetchedCompaniesData?.data?.data?.result) {
      setCompaniesData(fetchedCompaniesData.data.data.result)
    }
  }, [fetchedCompaniesData?.data?.data?.result])

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const selectedCompany = companiesData?.find(
      (company) => company._id === data.company
    )

    const payload = {
      ...data,
      startDate: new Date(data.startDate), // Đảm bảo là Date object
      endDate: new Date(data.endDate), // Đảm bảo là Date object
      company: {
        _id: selectedCompany?._id || '',
        name: selectedCompany?.name || '',
        logo: selectedCompany?.logo || '',
      },
    }

    try {
      let response
      if (id) {
        response = await updateJobApi(payload, id)
      } else {
        response = await createJobApi(payload)
      }
      if (response.status === 200 || response.status === 201) {
        toast({ title: response.data.message })
        form.reset()
        navigate('/admin/jobs')
      } else {
        toast({ title: response.data.message, variant: 'destructive' })
      }
    } catch (error) {
      console.error('Error:', error)
      toast({ title: 'Có lỗi xảy ra', variant: 'destructive' })
    }
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
              render={({ field }) => {
                return (
                  <FormItem className="lg:col-span-3">
                    <FormLabel className="after:text-red-500 after:content-['*']">
                      Kỹ năng yêu cầu
                    </FormLabel>
                    <MultiSelect
                      options={SKILL_LIST}
                      onValueChange={(value) => form.setValue('skills', value)}
                      placeholder="Kỹ năng..."
                      maxCount={2}
                      defaultValue={field.value}
                    />
                    <FormMessage />
                  </FormItem>
                )
              }}
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
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Địa điểm..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {LOCATION_LIST.map((location) => (
                        <SelectItem key={location.value} value={location.value}>
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
                <FormItem className="lg:col-span-1">
                  <FormLabel className="after:text-red-500 after:content-['*']">
                    Công ty
                  </FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn công ty...">
                          {field.value &&
                            companiesData?.find(
                              (company) => company._id === field.value
                            )?.name}
                        </SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {companiesData &&
                        companiesData.map((company) => (
                          <SelectItem key={company._id} value={company._id!}>
                            {company.name}
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
              render={({ field }) => {
                // Đồng bộ startDate từ field.value khi render
                useEffect(() => {
                  if (field.value) {
                    setStartDate(new Date(field.value))
                  }
                }, [field.value])

                return (
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
                          onSelect={(date) => {
                            setStartDate(date) // Cập nhật startDate
                            field.onChange(date) // Truyền trực tiếp Date object vào field
                          }}
                          disabled={(date) =>
                            endDate ? date > endDate : false
                          }
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            {/* End Date */}
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => {
                // Đồng bộ startDate từ field.value khi render
                useEffect(() => {
                  if (field.value) {
                    setEndDate(new Date(field.value))
                  }
                }, [field.value])
                return (
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
                          onSelect={(date) => {
                            setEndDate(date)
                            field.onChange(date)
                          }}
                          disabled={(date) =>
                            startDate ? date < startDate : false
                          }
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )
              }}
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
                    <ReactQuill className="h-72" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-start space-x-4">
            <Button type="submit">{id ? 'Cập nhật' : 'Tạo'}</Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                navigate('/admin/jobs')
                form.reset()
              }}
            >
              Hủy
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
