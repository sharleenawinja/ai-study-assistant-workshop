import { FileType } from '@/types/data.types'
import { Button } from '@nextui-org/button'
import React from 'react'
import {
  AudioFileIcon,
  DraftIcon,
  ImageIcon,
  PdfFileIcon,
  VideoFileIcon,
} from '../icons'

type filter = {
  filterName: string
  icon: JSX.Element
  fileType: FileType
}

type SearchFiltersProps = {
  updateFilter: (filter: string) => void
  clearFilters: () => void
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  updateFilter,
  clearFilters,
}) => {
  const filters: filter[] = [
    {
      filterName: 'Docs',
      icon: <DraftIcon isFilterIcon />,
      fileType: 'document',
    },
    { filterName: 'PDF', icon: <PdfFileIcon isFilterIcon />, fileType: 'pdf' },
    {
      filterName: 'Images',
      icon: <ImageIcon isFilterIcon />,
      fileType: 'image',
    },
    {
      filterName: 'MP3/Audio',
      icon: <AudioFileIcon isFilterIcon />,
      fileType: 'audio',
    },
    {
      filterName: 'MP4/Video',
      icon: <VideoFileIcon isFilterIcon />,
      fileType: 'video',
    },
  ]

  return (
    <div className="flex gap-[6px] justify-center flex-wrap">
      {filters.map((filter, index) => {
        return (
          <Button
            key={index + filters.length}
            radius="full"
            className="bg-white shadow-md text-slate-500 text-xs hover:bg-slate-300 stroke-cyan-500"
            aria-label={`Filter results by ${filter.filterName}`}
            startContent={filter.icon}
            onClick={() => {
              updateFilter(filter.fileType)
            }}
          >
            {filter.filterName}
          </Button>
        )
      })}
      <Button
        radius="full"
        color="danger"
        className="shadow-md text-black text-xs hover:bg-red-400"
        aria-label="Clear filters"
        onClick={clearFilters}
      >
        Clear filters
      </Button>
    </div>
  )
}
