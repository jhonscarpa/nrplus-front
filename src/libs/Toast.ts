import { toast } from 'react-toastify'

const fiveSeconds = 1000 * 5

export function handleToast(error: boolean, message: string) {
  if (error)
    return toast.error(message, {
      position: 'top-right',
      autoClose: fiveSeconds,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,
    })

  return toast.success(message, {
    position: 'top-right',
    autoClose: fiveSeconds,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: 0,
  })
}
