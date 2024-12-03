import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { Button } from '../../../components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog'
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
  IBackendResponse,
  ICompany,
  IPagination,
  IUser,
} from '../../../interfaces/schemas'
import { useEffect, useState } from 'react'
import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
} from '@tanstack/react-query'
import { getRolesApi } from '../../../apis/role.api'
import { createUserApi, updateUserApi } from '../../../apis/user.api'
import { getCompaniesApi } from '../../../apis/company.api'
import { toast } from '../../../hooks/use-toast'
import { AxiosResponse } from 'axios'

interface IUserModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  userData: IUser | null
  setUserData: (data: any) => void
  refetch: (
    options?: RefetchOptions
  ) => Promise<
    QueryObserverResult<
      AxiosResponse<IBackendResponse<IPagination<IUser>>, any>,
      Error
    >
  >
}

const createFormSchema = (userData: IUser | null) =>
  z.object({
    email: z.string().email(),
    password: userData ? z.string().optional() : z.string().min(6),
    name: z.string(),
    age: z.number().min(1).max(100),
    gender: z.string(),
    role: z.string(),
    company: z.string(),
    address: z.string(),
  })

export default function UserUpsertModal({
  open,
  onOpenChange,
  userData,
  setUserData,
  refetch,
}: IUserModalProps) {
  const formSchema = createFormSchema(userData)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(
      formSchema.refine((data) => !!data.password || !!userData, {
        message: 'Password là bắt buộc khi tạo mới user.',
        path: ['password'],
      })
    ),
    defaultValues: {
      email: userData?.email || '',
      password: userData?.password || '',
      name: userData?.name || '',
      age: userData?.age || 0,
      gender: userData?.gender || '',
      role: userData?.role || '',
      company: userData?.company?._id || '',
      address: userData?.address || '',
    },
  })

  useEffect(() => {
    if (userData) {
      form.reset({
        email: userData.email || '',
        password: userData.password || '',
        name: userData.name || '',
        age: userData.age || 0,
        gender: userData.gender || '',
        role: userData.role || '',
        company: userData.company?._id || '',
        address: userData.address || '',
      })
    } else {
      form.reset({
        email: '',
        password: '',
        name: '',
        age: 0,
        gender: '',
        role: '',
        address: '',
      })
    }
  }, [userData, form])

  const handleReset = () => {
    form.reset()
    onOpenChange(false)
    setUserData(null)
    refetch()
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Tìm company
    const userCompany = companies?.find(
      (company) => company._id === values.company
    )

    const payload = {
      ...values,
      company: {
        _id: userCompany!._id,
        name: userCompany!.name,
      },
    }
    try {
      // create
      if (!userData) {
        const response = await createUserApi(payload)
        if (
          response.data.statusCode === 200 ||
          response.data.statusCode === 201
        ) {
          toast({
            title: response.data.message || 'Tạo người dùng thành công',
          })
          handleReset()
        } else {
          toast({
            title:
              response.data.message ||
              'Có lỗi xảy ra trong quá trình tạo người dùng',
            variant: 'destructive',
          })
        }
      } else {
        // update
        const userId = userData._id
        const response = await updateUserApi(payload)
        if (
          response.data.statusCode === 200 ||
          response.data.statusCode === 201
        ) {
          toast({
            title:
              response.data.message ||
              'Cập nhật thông tin người dùng thành công',
          })
        } else {
          toast({
            title:
              response.data.message ||
              'Có lỗi xảy ra trong quá trình cập nhật thông tin người dùng',
            variant: 'destructive',
          })
        }
      }
    } catch (error: any) {
      // error.response?.data?.message
      console.error('Error creating/updating user:', error)
      toast({
        title:
          error.response?.data?.message ||
          'Có lỗi xảy ra trong quá trình cập nhật thông tin người dùng',
        variant: 'destructive',
      })
    }
  }

  const [roles, setRoles] = useState<{ label: string; value: string }[]>()
  const [companies, setCompanies] = useState<ICompany[]>()

  // Fetch roles
  const { data: fetchedRoles } = useQuery({
    queryKey: ['roles'],
    queryFn: async () => await getRolesApi('current=1&pageSize=100'),
  })

  useEffect(() => {
    const mappedRoles = fetchedRoles?.data.data?.result
      ?.filter((role) => role._id) // Lọc các role có _id không phải undefined
      .map((role) => ({
        label: role.name,
        value: role._id!,
      }))
    setRoles(mappedRoles)
  }, [fetchedRoles?.data.data?.result])

  // Fetch companies
  const { data: fetchedCompanies } = useQuery({
    queryKey: ['companies'],
    queryFn: async () => await getCompaniesApi('current=1&pageSize=100'),
  })

  useEffect(() => {
    if (fetchedCompanies?.data.data?.result) {
      setCompanies(fetchedCompanies?.data.data?.result)
    }
  }, [fetchedCompanies?.data.data?.result])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {userData ? 'Cập nhật User' : 'Tạo mới User'}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="after:text-red-500 after:content-['*']">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập tên email..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className={`${
                        !userData
                          ? 'after:text-red-500 after:content-["*"]'
                          : ''
                      }`}
                    >
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Nhập password..."
                        {...field}
                        disabled={!!userData}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="after:text-red-500 after:content-['*']">
                      Tên
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Tên người dùng..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Age */}
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="after:text-red-500 after:content-['*']">
                      Tuổi
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Nhập tuổi"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {/* Gender */}
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="after:text-red-500 after:content-['*']">
                      Giới Tính
                    </FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={(value) => field.onChange(value)}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn giới tính..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">Nam</SelectItem>
                        <SelectItem value="female">Nữ</SelectItem>
                        <SelectItem value="other">Khác</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Role */}
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="after:text-red-500 after:content-['*']">
                        Vai trò
                      </FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={(value) => field.onChange(value)}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn vai trò..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {roles &&
                            roles.map((role) => {
                              return (
                                <SelectItem key={role.value} value={role.value}>
                                  {role.label}
                                </SelectItem>
                              )
                            })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {/* Company */}
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thuộc Công Ty</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn công ty..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {companies &&
                          companies.map((company) => (
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
              {/* Address */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="after:text-red-500 after:content-['*']">
                      Địa chỉ
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-start gap-4">
              <Button type="submit">{userData ? 'Cập nhật' : 'Tạo mới'}</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
