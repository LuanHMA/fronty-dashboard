'use client'

import { ToastContainer, toast, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function notifyError(text: string, duration = 3000) {
  return toast.error(text, { autoClose: duration })
}
export function notifySuccess(text: string, duration = 3000) {
  return toast.success(text, { autoClose: duration })
}
export function notifyWarning(text: string, duration = 3000) {
  return toast.warning(text, { autoClose: duration })
}
export function notifyInfo(text: string, duration = 3000) {
  return toast.info(text, { autoClose: duration })
}
export function notify(text: string, duration = 3000) {
  return toast(text, { autoClose: duration })
}

export function ToastifyProvider() {
  const theme = localStorage.getItem('theme')

  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={theme === 'dark' ? 'dark' : 'light'}
      transition={Slide}
    />
  )
}
