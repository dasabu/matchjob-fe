import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Link } from 'react-router-dom'

import AnimatedTitle from '../../../components/AnimatedTitle/AnimatedTitle'
import { Button } from '../../../components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card'
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
import { useToast } from '../../../hooks/use-toast'

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Tên phải có ít nhất 2 ký tự.',
  }),
  email: z.string().email({
    message: 'Vui lòng nhập một địa chỉ email hợp lệ.',
  }),
  password: z.string().min(6, {
    message: 'Mật khẩu phải có ít nhất 6 ký tự.',
  }),
  age: z.number().min(18, {
    message: 'Bạn phải từ 18 tuổi trở lên.',
  }),
  gender: z.enum(['male', 'female', 'other'], {
    required_error: 'Vui lòng chọn giới tính.',
  }),
  address: z.string().min(1, {
    message: 'Vui lòng nhập địa chỉ.',
  }),
})

type FormValues = z.infer<typeof formSchema>

export default function SignUpPage() {
  const { toast } = useToast()
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      age: undefined,
      gender: undefined,
      address: '',
    },
  })

  const onSubmit = async (values: FormValues) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Simulate successful registration
    if (values.email && values.password) {
      toast({
        title: 'Đăng ký tài khoản thành công!',
        description: 'Bạn sẽ được chuyển hướng đến trang đăng nhập.',
      })
      // navigate('/')
    } else {
      toast({
        variant: 'destructive',
        title: 'Có lỗi xảy ra',
        description: 'Vui lòng kiểm tra lại thông tin đăng ký.',
      })
    }
  }

  return (
    <div className="flex flex-row items-center justify-evenly min-h-screen bg-gray-100 p-16">
      <div className="flex flex-row justify-center w-[700px]">
        <AnimatedTitle />
      </div>
      <Card className="w-[500px]">
        <CardHeader className="flex flex-col items-center justify-center mt-2">
          <CardTitle className="text-transform:uppercase lg:text-3xl mb-2">
            Đăng ký
          </CardTitle>
          <CardDescription>
            Nhập thông tin để đăng ký tài khoản mới
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mật khẩu</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tuổi</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value, 10))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giới tính</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn giới tính" />
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
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Địa chỉ</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full mt-6" type="submit">
                Đăng ký
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <div className="h-px w-16 bg-gray-200"></div>
            <span className="text-slate-600">OR</span>
            <div className="h-px w-16 bg-gray-200"></div>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Đã có tài khoản?{' '}
            <Link
              className="text-gray-800 font-normal hover:underline"
              to="/sign-in"
            >
              Đăng nhập
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
