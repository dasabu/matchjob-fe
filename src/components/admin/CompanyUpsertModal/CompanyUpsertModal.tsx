import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog'
import { Button } from '../../ui/button'
import { Input } from '../../ui/input'
import { Textarea } from '../../ui/textarea'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../ui/form'
import { toast } from '../../../hooks/use-toast'
import { Loader2, Plus, X } from 'lucide-react'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { updateCompanyApi, createCompanyApi } from '../../../apis/company.api'
import {
  IBackendResponse,
  ICompany,
  IPagination,
} from '../../../interfaces/schemas'
import { Label } from '../../ui/label'
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { uploadSingleFileApi } from '../../../apis/file.api'

interface ICompanyModalProps {
  isOpenModal: boolean
  setIsOpenModal: (open: boolean) => void
  companyData?: ICompany | null
  setCompanyData: (data: any) => void
  refetch: (
    options?: RefetchOptions
  ) => Promise<
    QueryObserverResult<
      AxiosResponse<IBackendResponse<IPagination<ICompany>>, any>,
      Error
    >
  >
}

const formSchema = z.object({
  name: z.string().min(1),
  address: z.string().min(1),
  logo: z.string().min(1),
  description: z.string().optional(),
})

export default function CompanyUpsertModal({
  isOpenModal,
  setIsOpenModal,
  companyData,
  setCompanyData,
  refetch,
}: ICompanyModalProps) {
  const [isUploading, setIsUploading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: companyData?.name || '',
      address: companyData?.address || '',
      logo: companyData?.logo || '',
      description: companyData?.description || '',
    },
  })

  useEffect(() => {
    if (companyData) {
      form.reset({
        name: companyData.name || '',
        address: companyData.address || '',
        logo: companyData.logo,
        description: companyData.description || '',
      })
    } else {
      form.reset({
        name: '',
        address: '',
        logo: '',
        description: '',
      })
    }
  }, [companyData, form])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      let response

      if (companyData?._id) {
        response = await updateCompanyApi(
          companyData._id,
          values.name,
          values.address,
          values.description || '',
          values.logo
        )
      } else {
        response = await createCompanyApi(
          values.name,
          values.address,
          values.description || '',
          values.logo
        )
      }

      if (
        response.data.statusCode === 200 ||
        response.data.statusCode === 201
      ) {
        toast({
          title:
            response.data.message ||
            `${companyData ? 'Cập nhật thông tin' : 'Thêm'}` +
              ' công ty thành công',
        })
        handleReset()
      } else {
        toast({
          title:
            response.data.message ||
            'Có lỗi xảy ra trong quá trình thêm/cập nhật công ty',
          variant: 'destructive',
        })
      }
    } catch (error: any) {
      toast({
        title:
          error.response?.data?.message ||
          'Có lỗi xảy ra trong quá trình thêm/cập nhật công ty',
        variant: 'destructive',
      })
    }
  }

  const handleReset = () => {
    form.reset()
    setIsOpenModal(false)
    setCompanyData(null)
    refetch()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast({
          title: 'Kích thước file tối đa 2MB',
          variant: 'destructive',
        })
        return
      }
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        toast({
          title: 'Định dạng không hợp lệ. Chỉ chấp nhận: jpeg, png',
          variant: 'destructive',
        })
        return
      }
      setIsUploading(true)
      try {
        const response = await uploadSingleFileApi(file, 'company')
        console.log('response in upload company logo: ', response)
        if (response.data.statusCode === 201) {
          form.setValue('logo', response.data.data.fileName)
          toast({
            title: 'Upload thành công',
            description: response.data.message,
          })
        } else {
          throw new Error(response.data.message)
        }
      } catch (error: any) {
        toast({
          title: 'Có lỗi khi upload file',
          description: error.message,
          variant: 'destructive',
        })
      } finally {
        setIsUploading(false)
      }
    }
  }

  return (
    <Dialog open={isOpenModal} onOpenChange={setIsOpenModal}>
      <DialogContent className="sm:min-w-[50%] min-h-[80%]">
        <DialogHeader>
          <DialogTitle>
            {companyData?._id ? 'Update Company' : 'Create Company'}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            {/* Name */}
            <div className="mb-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2 justify-center">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter company name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-row justify-between items-start mb-6">
              {/* Logo */}
              <FormField
                control={form.control}
                name="logo"
                render={({ field }) => {
                  console.log('field.value: ', field.value)
                  return (
                    <FormItem className="w-1/2">
                      <FormLabel>Logo</FormLabel>
                      <FormControl className="">
                        <div className="flex flex-row items-center">
                          <Input
                            type="file"
                            onChange={handleFileChange}
                            accept="image/jpeg,image/png"
                            className="hidden"
                            id="logo-upload"
                          />
                          <div className="flex flex-row space-x-2">
                            <Label
                              htmlFor="logo-upload"
                              className="h-32 w-32 max-w-1/2 cursor-pointer bg-secondary text-secondary-foreground hover:bg-secondary/80 flex flex-col items-center justify-center gap-2 rounded-md text-sm font-normal ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-4 py-2"
                            >
                              {isUploading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Plus className="h-4 w-4" />
                              )}
                              Upload Logo
                            </Label>
                            {field.value && (
                              <div className="relative">
                                <img
                                  src={`http://localhost:8000/images/company/${field.value}`}
                                  alt="Logo preview"
                                  className="h-32 w-32 max-w-1/2 object-cover rounded-md"
                                />
                                <Button
                                  onClick={() => form.setValue('logo', '')}
                                  className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1"
                                >
                                  <X className="h-2 w-2" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </FormControl>
                      {/* <FormMessage /> */}
                    </FormItem>
                  )
                }}
              />
              {/* Address */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Textarea
                        className="h-32"
                        placeholder="Enter company address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <ReactQuill theme="snow" {...field} className="h-72" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="mt-16" type="submit" disabled={isUploading}>
              {companyData?._id ? 'Update' : 'Create'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
