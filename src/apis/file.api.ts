// import axios, { AxiosResponse } from 'axios'
import { IBackendResponse } from '../interfaces/schemas'
import axiosInstance from '../lib/axios'

export const uploadSingleFileApi = (file: any, folderType: string) => {
  const bodyFormData = new FormData()
  bodyFormData.append('fileUpload', file)
  return axiosInstance<IBackendResponse<{ fileName: string }>>({
    method: 'post',
    url: '/api/v1/files/upload',
    data: bodyFormData,
    headers: {
      'Content-Type': 'multipart/form-data',
      folder_type: folderType,
    },
  })
}

// export const uploadSingleFileApi = (
//   file: any,
//   folderType: string
// ): Promise<AxiosResponse<IBackendResponse<{ fileName: string }>>> => {
//   const bodyFormData = new FormData()
//   bodyFormData.append('fileUpload', file)
//   return axiosInstance({
//     method: 'post',
//     url: '/api/v1/files/upload',
//     data: bodyFormData,
//     headers: {
//       'Content-Type': 'multipart/form-data',
//       folder_type: folderType,
//     },
//   })
// }
