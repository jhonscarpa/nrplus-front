import { DownloadSimple } from '@phosphor-icons/react'
import logoImg from '../../assets/logoImg.svg'
import { useFiles } from '../../hooks/useFiles'
import { ENV } from '../../utils/env'
import { filesRoutes } from '../../utils/routesApi'

export function Header() {
  const { archives } = useFiles()

  async function downloadAllArchives() {
    window.open(
      `${ENV.VITE_DATABASE_URL}${filesRoutes.DOWNLOAD_ALL_FILES}?page=1&pageSize=${archives.files.length}`,
    )
  }

  return (
    <header className="pt-10 pb-7 px-28 flex items-center justify-between w-full max-w-[90rem] my-0 mx-auto">
      <div className="flex items-center gap-7">
        <img src={logoImg} alt="Logo NRplus" />
        <h2 className="font-outfit size text-header text-blue-900 font-semibold">
          Upload Documents
        </h2>
      </div>
      <button
        type="button"
        onClick={downloadAllArchives}
        className="flex items-center gap-3 py-4 px-8 bg-white rounded-lg font-normal text-base text-gray-400 font-outfit hover:cursor-pointer hover:brightness-[.993] transition-all	 disabled:cursor-not-allowed"
      >
        Download all <DownloadSimple className="size-6 text-brand-green" />
      </button>
    </header>
  )
}
