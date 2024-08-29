import { AnimatedText } from '@/components/AnimatedText'
import { SearchBar } from '@/components/SearchBar'
import { FileData } from '@/types/data.types'
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { SearchFilters } from '../SearchFilters/SearchFilters'
import { SearchResult, SearchResultProps } from '../SearchResult'

export type SearchProps = {
  query?: string
  onQueryChange?: (query: string) => void

  searching?: boolean
  results?: SearchResultProps['files']
  onSearch?: (query: string) => void

  selectedFiles?: SearchResultProps['selected']
  onSelect?: SearchResultProps['onSelect']

  compact?: boolean
}

export const Search: React.FC<SearchProps> = ({
  query,
  onQueryChange,
  searching,
  results,
  onSearch,
  selectedFiles,
  onSelect,
  compact,
}) => {
  const [filter, setFilter] = useState<string | undefined>()
  const [displayedResults, setDisplayedResults] = useState<
    FileData[] | undefined
  >(results)

  useEffect(() => {
    if (results) {
      setDisplayedResults(results)
    }
  }, [results])

  const updateFilter = (newFilter: string) => {
    if (newFilter !== filter) {
      setFilter(newFilter)

      if (results) {
        const newResults = results.filter(
          (singleResult) => singleResult.type === newFilter,
        )
        setDisplayedResults(newResults)
      }
    }
  }

  const clearFilters = () => {
    if (filter !== undefined) {
      setFilter(undefined)
      setDisplayedResults(results)
    }
  }

  return (
    <div className="flex flex-col">
      <SearchBar
        className={clsx(
          'transition',
          'mb-10',
          compact && ['opacity-0', 'invisible', 'h-0', 'mb-0'],
        )}
        value={query}
        pending={searching}
        onChange={(e) => onQueryChange && onQueryChange(e.target.value)}
        onSubmit={() => {
          onSearch && onSearch(query || '')
        }}
      />
      <SearchFilters updateFilter={updateFilter} clearFilters={clearFilters} />
      <div>
        {typeof displayedResults !== 'undefined' && (
          <SearchResult
            title={
              <div className="flex flex-row items-center gap-2">
                <AnimatedText
                  maxTime={500}
                  text={compact ? query! : 'Search results'}
                />
              </div>
            }
            description={
              <AnimatedText
                maxTime={500}
                text={
                  compact
                    ? `Ask me anything to help with your studies!`
                    : `Select at least one file to start a new conversation.`
                }
              />
            }
            selected={selectedFiles}
            onSelect={onSelect}
            files={displayedResults}
            hideList={compact}
            compactOverview={compact}
          />
        )}
      </div>
    </div>
  )
}
