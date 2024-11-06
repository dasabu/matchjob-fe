import { Payment, columns } from './columns'
import { DataTable } from '../../ui/data-table'
import { faker } from '@faker-js/faker'
import { Input } from '../../ui/input'

function getData(): Payment[] {
  // Fetch data from your API here
  const statuses: Payment['status'][] = [
    'pending',
    'processing',
    'success',
    'failed',
  ]

  let result: Payment[] = []
  for (let i = 0; i < 50; i++) {
    result.push({
      _id: faker.string.uuid(),
      amount: parseInt(faker.finance.amount()), // Giả sử số tiền từ 10 đến 1000, với 2 chữ số sau dấu phẩy
      status: faker.helpers.arrayElement(statuses),
      email: faker.internet.email(),
    })
  }

  return result
}

export default function CompanyTable() {
  const data = getData()

  return <DataTable columns={columns} data={data} />
}
