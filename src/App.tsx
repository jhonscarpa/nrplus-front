import { ToastContainer } from 'react-toastify'
import { DropZoneInput } from './components/DropZoneInput'
import { Header } from './components/Header'
import { ListArchives } from './components/ListArchives'
import 'react-toastify/dist/ReactToastify.css'

export function App() {
  return (
    <div className="bg-gray-100 w-screen h-screen">
      <Header />

      <div className="w-full max-w-[90rem] h-full max-h-[704px] px-28 my-0 mx-auto flex items-start gap-12">
        <DropZoneInput />
        <ListArchives />
      </div>

      <ToastContainer
        position="top-right"
        autoClose={50000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}
