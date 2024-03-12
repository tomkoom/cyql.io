import toast from "react-hot-toast"

export const notifySuccess = (msg: string): void => {
  toast.success(msg)
}

export const notifyErr = (msg: string): void => {
  toast.error(msg)
}
