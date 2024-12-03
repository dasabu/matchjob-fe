import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog'
import { Button } from '../ui/button'
import { Form, FormField, FormItem, FormLabel, FormControl } from '../ui/form'
import { Input } from '../ui/input'
import { Alert, AlertDescription } from '../ui/alert'
import { toast } from '../../hooks/use-toast'
import { Upload } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { IJob } from '../../interfaces/schemas'
import { useAuthStore } from '../../store/authStore'
import { createResumeApi } from '../../apis/resume.api'
import { uploadSingleFileApi } from '../../apis/file.api'
import { Separator } from '../ui/separator'
import { useQueryClient } from '@tanstack/react-query'

interface IResumeApplyModalProps {
  isOpenModal: boolean
  setIsOpenModal: (v: boolean) => void
  jobDetail: IJob | null
}

export default function ResumeApplyModal({
  isOpenModal,
  setIsOpenModal,
  jobDetail,
}: IResumeApplyModalProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const user = useAuthStore((state) => state.user)

  const [urlCV, setUrlCV] = useState<string>('')
  const form = useForm()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  // Reset form
  const resetForm = () => {
    setUrlCV('')
    form.reset()
  }

  // Handle upload CV function
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (file) {
      try {
        const response: any = await uploadSingleFileApi(file, 'resume') // AxiosResponse<IBackendResponse<{fileName: string}>>
        if (response.data.statusCode === 201 && response.data.data?.fileName) {
          setUrlCV(response.data.data.fileName)
          toast({
            title: `Upload file ${file.name} thành công`,
            description: response.data.message,
          })
        } else {
          setUrlCV('')
          toast({
            title: 'Không thể upload file. Vui lòng thử lại.',
            description: response.data.message,
            variant: 'destructive',
          })
        }
      } catch (error: any) {
        setUrlCV('')
        toast({
          title: 'Có lỗi xảy ra trong quá trình upload file. Vui lòng thử lại',
          description: error.response?.data?.message || error.message,
          variant: 'destructive',
        })
      }
    }
  }

  const handleSubmit = async () => {
    if (!urlCV && isAuthenticated) {
      toast({
        title: 'Không thể gửi CV',
        description: 'Vui lòng đính kèm CV',
        variant: 'destructive',
      })
      return
    }

    if (!isAuthenticated) {
      setIsOpenModal(false)
      navigate(`/login?callback=${window.location.href}`)
    } else if (jobDetail) {
      try {
        const response: any = await createResumeApi(
          urlCV,
          jobDetail.company?._id,
          jobDetail._id
        )
        if (
          response.data.statusCode === 200 ||
          response.data.statusCode === 201
        ) {
          toast({
            title: 'Gửi CV thành công',
            description: response.data.message,
          })
          resetForm()
          setIsOpenModal(false)
          queryClient.invalidateQueries(['user-resumes'])
        } else {
          toast({
            title: 'Không thể gửi CV',
            description:
              response.message || 'Không thể gửi CV. Vui lòng thử lại',
            variant: 'destructive',
          })
        }
      } catch (error: any) {
        toast({
          title: 'Có lỗi xảy ra trong quá trình gửi CV',
          description: error.response?.data?.message || error?.message,
          variant: 'destructive',
        })
      }
    }
  }

  return (
    <Dialog
      open={isOpenModal}
      onOpenChange={(isOpen) => {
        if (!isOpen) resetForm() // Reset form khi đóng modal
        setIsOpenModal(isOpen)
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Apply công việc</DialogTitle>
        </DialogHeader>
        {isAuthenticated ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <Alert className="mb-4">
                <AlertDescription>
                  Bạn đang ứng tuyển công việc{' '}
                  <strong>{jobDetail?.name}</strong> tại công ty{' '}
                  <strong>{jobDetail?.company?.name}</strong>
                </AlertDescription>
              </Alert>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        {...field}
                        disabled
                        value={user?.user?.email}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormItem className="mb-4">
                <FormLabel>Upload CV</FormLabel>
                <FormControl>
                  <div className="flex flex-col items-center gap-2">
                    <Input
                      type="file"
                      accept=".doc,.docx,.pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="cv-upload"
                    />
                    <Button asChild className="w-full">
                      <label htmlFor="cv-upload" className="cursor-pointer">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload CV (*.doc, *.docx, *.pdf, &lt; 5MB)
                      </label>
                    </Button>
                    {urlCV && (
                      <span className="text-sm text-green-600">
                        File uploaded: {urlCV}
                      </span>
                    )}
                  </div>
                </FormControl>
              </FormItem>
              <Separator />
              <DialogFooter className="mt-4">
                <Button type="submit">Submit</Button>
              </DialogFooter>
            </form>
          </Form>
        ) : (
          <Alert>
            <AlertDescription>
              Vui lòng đăng nhập để thực hiện thao tác này
            </AlertDescription>
          </Alert>
        )}
      </DialogContent>
    </Dialog>
  )
}
