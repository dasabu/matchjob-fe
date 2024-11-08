import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../ui/alert-dialog'

interface ICompanyDeleteDialogProps {
  isOpenDialog: boolean
  setIsOpenDialog: (open: boolean) => void
  onConfirm: () => void
  onCancel: () => void
}

export default function CompanyDeleteDialog({
  isOpenDialog,
  setIsOpenDialog,
  onConfirm,
  onCancel,
}: ICompanyDeleteDialogProps) {
  return (
    <AlertDialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
          <AlertDialogDescription>
            Bạn có chắc chắn muốn xóa công ty này? Hành động này không thể hoàn
            tác.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={onConfirm}>Xóa</AlertDialogAction>
          <AlertDialogCancel onClick={onCancel}>Hủy</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
