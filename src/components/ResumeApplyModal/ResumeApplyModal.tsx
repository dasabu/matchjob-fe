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
import { useToast } from '../../hooks/use-toast'
import { Upload } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { IJob } from '../../interfaces/schemas'

interface IResumeApplyModalProps {
  isOpen: boolean
  setIsOpen: (v: boolean) => void
  jobDetail: IJob
}

export default function ApplyModal({
  isOpen,
  setIsOpen,
  jobDetail,
}: IResumeApplyModalProps) {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [urlCV, setUrlCV] = useState<string>('')
  const form = useForm()

  const isAuthenticated = true
  const user = true

  const handleSubmit = async () => {
    if (!urlCV && isAuthenticated) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please upload your CV!',
      })
      return
    }

    if (!isAuthenticated) {
      setIsOpen(false)
      navigate(`/login?callback=${window.location.href}`)
    } else if (jobDetail) {
      try {
        const res = await callCreateResume(
          urlCV,
          jobDetail.company?._id,
          jobDetail._id
        )
        if (res.data) {
          toast({
            title: 'Success',
            description: 'CV submitted successfully!',
          })
          setIsOpen(false)
        } else {
          throw new Error(res.message)
        }
      } catch (error: any) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: error.message || 'An error occurred',
        })
      }
    }
  }

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (file) {
      try {
        const res = await callUploadSingleFile(file, 'resume')
        if (res && res.data) {
          setUrlCV(res.data.fileName)
          toast({
            title: 'Success',
            description: `${file.name} uploaded successfully`,
          })
        } else {
          throw new Error(res.message)
        }
      } catch (error: any) {
        setUrlCV('')
        toast({
          variant: 'destructive',
          title: 'Error',
          description:
            error.message || 'An error occurred while uploading the file.',
        })
      }
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Apply for Job</DialogTitle>
        </DialogHeader>
        {isAuthenticated ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <Alert>
                <AlertDescription>
                  You are applying for the position of{' '}
                  <strong>{jobDetail?.name}</strong> at{' '}
                  <strong>{jobDetail?.company?.name}</strong>
                </AlertDescription>
              </Alert>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        {...field}
                        disabled
                        value={JSON.stringify(user)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormItem>
                <FormLabel>Upload CV</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Input
                      type="file"
                      accept=".doc,.docx,.pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="cv-upload"
                    />
                    <Button asChild>
                      <label htmlFor="cv-upload" className="cursor-pointer">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload CV (*.doc, *.docx, *.pdf, &lt; 5MB)
                      </label>
                    </Button>
                    {urlCV && (
                      <span className="text-sm text-green-600">
                        File uploaded
                      </span>
                    )}
                  </div>
                </FormControl>
              </FormItem>
              <DialogFooter>
                <Button type="submit">Submit Application</Button>
              </DialogFooter>
            </form>
          </Form>
        ) : (
          <Alert>
            <AlertDescription>
              Please log in to submit your application.
            </AlertDescription>
          </Alert>
        )}
      </DialogContent>
    </Dialog>
  )
}
