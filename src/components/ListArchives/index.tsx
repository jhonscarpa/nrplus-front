import { Files } from '@phosphor-icons/react'
import { useFiles } from '../../hooks/useFiles'
import { FileListItem } from './components/FileListItem'
import { InfinitySpin } from 'react-loader-spinner'
import { InfinityScroll } from '../InfinityScroll'

export function ListArchives() {
  const { archives, loadingGetFiles, loadingNextPage, nextPage } = useFiles()
  return (
    <div className="w-full h-auto flex flex-col gap-8">
      <span className="font-outfit font-light text-2xl text-black">
        {archives.files && archives.files.length > 0
          ? 'Upload list'
          : 'Empty States'}
      </span>
      <div className="h-[40rem] bg-[#FBFBFB] px-14 pt-12 pb-28 overflow-auto scroll-smooth scrollbar-thumb-[#F3EFEF]  scrollbar-track-white scrollbar-thin">
        {archives.files && archives.files.length > 0 ? (
          <ul className="flex flex-col gap-8 h-auto ">
            {archives.files.map(file => (
              <FileListItem key={file.Key} file={file} />
            ))}
            {!loadingNextPage &&
              archives.totalFiles > archives.files.length && (
                <InfinityScroll fetchMore={nextPage} />
              )}
            {loadingNextPage && (
              <div className="w-full flex items-center justify-center">
                {' '}
                <InfinitySpin width="200" color="#4E95FF" />
              </div>
            )}
          </ul>
        ) : (
          <div className="flex flex-col justify-center items-center h-full max-h-[40rem] bg-[#FBFBFB]">
            {loadingGetFiles ? (
              <InfinitySpin width="200" color="#4E95FF" />
            ) : (
              <>
                <Files className="size-32 text-[#C0C0BF]" />
                <span className="mt-5 font-outfit font-light text-2xl text-[#c0c0bf]">
                  No document here
                </span>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
