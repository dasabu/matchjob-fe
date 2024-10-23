import { LOCATIONS_LIST } from './constants'

export const getLocationLabel = (value: string) => {
  const locationFilter = LOCATIONS_LIST.filter((item) => item.value === value)
  if (locationFilter.length) {
    return locationFilter[0].label
  } else {
    return 'Others'
  }
}

export const formatSalary = (salary: number) => {
  return (salary + '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
