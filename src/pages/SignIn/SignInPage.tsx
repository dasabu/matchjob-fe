import React, { useState } from 'react'
import { Button } from '../../components/ui/button'
import { Link, useNavigate } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/ui/card'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { useToast } from '../../hooks/use-toast'
import { AnimatedTitle } from '../../components/AnimatedTitle/AnimatedTitle'

interface IUser {
  name: string
  email: string
  password: string
  age: number
  gender: string
  address: string
}

export const SignInPage = () => {
  const { toast } = useToast()
  const [isSubmit, setIsSubmit] = useState<boolean>(false)

  const onFinish = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmit(true)

    const formData = new FormData(event.currentTarget)
    const values: IUser = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      age: parseInt(formData.get('age') as string),
      gender: formData.get('gender') as string,
      address: formData.get('address') as string,
    }

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

    setIsSubmit(false)
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
          <form onSubmit={onFinish}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Mật khẩu</Label>
                <Input id="password" name="password" type="password" required />
              </div>
            </div>
            <Button className="w-full mt-6" type="submit" disabled={isSubmit}>
              {/* {isSubmit && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )} */}
              Đăng nhập
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <div className="h-px w-16 bg-gray-200"></div>
            <span className="text-slate-600">OR</span>
            <div className="h-px w-16 bg-gray-200"></div>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Đã có tài khoản{' '}
            <span>
              <Link className="text-gray-900 underline" to="/signup">
                Đăng ký
              </Link>
            </span>{' '}
          </p>
        </CardFooter>
      </Card>
      <div className="flex flex-row justify-center w-[700px]">
        <AnimatedTitle />
      </div>
    </div>
  )
}
