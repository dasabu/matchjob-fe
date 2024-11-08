import { LOCATION_LIST } from './constants'
import queryString from 'query-string'

export const getLocationLabel = (value: string) => {
  const locationFilter = LOCATION_LIST.filter((item) => item.value === value)
  if (locationFilter.length) {
    return locationFilter[0].label
  } else {
    return 'Others'
  }
}

export const formatSalary = (salary: number) => {
  return (salary + '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const removeVietnameseAccents = (str: string) => {
  // Tạo các nhóm thay thế cho từng chữ cái
  str = str.replace(/[AÁÀÃẠÂẤẦẪẬĂẮẰẴẶ]/g, 'A')
  str = str.replace(/[aàáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
  str = str.replace(/[EÉÈẼẸÊẾỀỄỆ]/g, 'E')
  str = str.replace(/[eèéẹẻẽêềếệểễ]/g, 'e')
  str = str.replace(/[IÍÌĨỊ]/g, 'I')
  str = str.replace(/[iìíịỉĩ]/g, 'i')
  str = str.replace(/[OÓÒÕỌÔỐỒỖỘƠỚỜỠỢ]/g, 'O')
  str = str.replace(/[oòóọỏõôồốộổỗơờớợởỡ]/g, 'o')
  str = str.replace(/[UÚÙŨỤƯỨỪỮỰ]/g, 'U')
  str = str.replace(/[uùúụủũưừứựửữ]/g, 'u')
  str = str.replace(/[YÝỲỸỴ]/g, 'Y')
  str = str.replace(/[yỳýỵỷỹ]/g, 'y')
  str = str.replace(/[Đ]/g, 'D')
  str = str.replace(/[đ]/g, 'd')

  // Loại bỏ các dấu thanh và dấu mũ, dấu á
  str = str.replace(/[\u0300\u0301\u0303\u0309\u0323]/g, '') // Huyền, sắc, hỏi, ngã, nặng
  str = str.replace(/[\u02C6\u0306\u031B]/g, '') // Â, Ê, Ă, Ơ, Ư
  return str
}

export const generateSlug = (str: string) => {
  str = removeVietnameseAccents(str) // Bỏ dấu tiếng Việt
  str = str.trim().toLowerCase() // Loại bỏ khoảng trắng đầu/cuối và chuyển về chữ thường

  // Thay thế các ký tự đặc biệt phổ biến bằng ký tự tương ứng
  str = str
    .replace(/[^a-z0-9]+/g, '-') // Loại bỏ ký tự không hợp lệ và thay khoảng trắng bằng dấu '-'
    .replace(/-+/g, '-') // Loại bỏ dấu '-' dư thừa
    .replace(/^-|-$/g, '') // Loại bỏ dấu '-' đầu và cuối chuỗi nếu có
  return str
}

export const shortenObjectId = (id: string | undefined): string => {
  if (id) return `${id.slice(0, 4)}...${id.slice(-4)}`
  else return ''
}

export const buildQuery = (
  current: number,
  pageSize: number,
  filter: Record<string, string> = {},
  sort?: string
) => {
  const queryObject: Record<string, any> = {
    current,
    pageSize,
    sort: sort || '-updatedAt',
    ...filter,
  }

  return queryString.stringify(queryObject, {
    skipNull: true,
    skipEmptyString: true,
  })
}
