import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { Button } from '../../components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../components/ui/form'
import { Input } from '../../components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/ui/card'
import { useToast } from '../../hooks/use-toast'

const formSchema = z.object({
  email: z.string().email({
    message: 'Vui lòng nhập một địa chỉ email hợp lệ.',
  }),
  password: z.string().min(6, {
    message: 'Mật khẩu phải có ít nhất 6 ký tự.',
  }),
})

export default function SignInPage() {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Simulate successful login
    if (values.email && values.password) {
      toast({
        title: 'Đăng nhập thành công!',
        description: 'Bạn sẽ được chuyển hướng đến trang chủ.',
      })
      // navigate('/')
    } else {
      toast({
        variant: 'destructive',
        title: 'Có lỗi xảy ra',
        description: 'Vui lòng kiểm tra lại thông tin đăng nhập.',
      })
    }
  }

  return (
    <div className="flex flex-row items-center justify-evenly min-h-screen bg-gray-100 p-16">
      <Card className="w-[500px]">
        <CardHeader className="flex flex-col items-center justify-center mt-2">
          <CardTitle className="text-transform:uppercase font-normal lg:text-3xl mb-2">
            Đăng nhập
          </CardTitle>
          <CardDescription>
            Nhập thông tin đăng nhập để tiếp tục
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="m@example.com" {...field} />
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
              <Button className="w-full" type="submit">
                Đăng nhập
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
            Chưa có tài khoản?{' '}
            <Link className="text-gray-900 underline" to="/sign-up">
              Đăng ký
            </Link>
          </p>
        </CardFooter>
      </Card>
      <div className="flex flex-row justify-center w-[700px]">
        {/* Assuming AnimatedTitle is a separate component */}
        {/* <AnimatedTitle /> */}
      </div>
    </div>
  )
}
