import { ChatMessages } from '@/components/ChatMessages'
import { MessageBar } from '@/components/MessageBar'
import { Search } from '@/components/Search'
import { ChatLayout } from '@/layouts/ChatLayout/Chat.layout'
import { useSearch } from '@/queries/useSearch'
import { chatApi } from '@/services/api'
import { populateDirs } from '@/utils/populateDirs.util'
import { Button } from '@nextui-org/button'
import React, { useEffect, useMemo, useState } from 'react'
import { useChatSessions } from './hooks'

export type HomePageProps = React.HTMLProps<HTMLDivElement>

export const HomePage: React.FC<HomePageProps> = ({ className, ...props }) => {
  const [query, setQuery] = useState('')
  const [prompt, setPrompt] = useState('')
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])
  const [generating, setGenerating] = useState(false)

  const search = useSearch(
    { query },
    {
      cacheTime: 0,
      enabled: false,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    },
  )

  const fileList = useMemo(
    () => populateDirs(search.data?.files || []),
    [search.data],
  )

  const onSearch = async () => {
    search.refetch()
  }

  const onPrompt = async (prompt: string) => {
    setGenerating(true)

    setMessages((value) => [
      ...value,
      {
        role: 'user',
        message: prompt,
      },
    ])

    const { message } = await chatApi({
      prompt,
      files: fileList.filter((f) => selectedFiles.includes(f.id)),
      history: messages,
    })

    setGenerating(false)
    setMessages((value) => [...value, message])
    setPrompt('')
  }

  const {
    chatSessions,
    messages,
    setCurrentChatSession,
    setMessages,
    createNewChatSession,
  } = useChatSessions()

  useEffect(() => {
    if (chatSessions.length > 0) {
      localStorage.setItem('chatSessions', JSON.stringify(chatSessions))
    }
  }, [chatSessions])

  useEffect(() => {
    setSelectedFiles([])
  }, [search.data])

  useEffect(() => {
    onSearch()
  }, [])

  return (
    <ChatLayout
      messageBar={
        <MessageBar
          prompt={prompt}
          onPromptChange={setPrompt}
          onSubmit={(prompt) => onPrompt(prompt)}
          loading={generating}
          disabled={generating}
        />
      }
    >
      <Search
        searching={search.isFetching}
        query={query}
        onQueryChange={(v) => setQuery(v)}
        onSearch={onSearch}
        results={fileList}
        onSelect={(selected) => setSelectedFiles(selected)}
        selectedFiles={selectedFiles}
      />
      <div className="flex h-full">
        <div className="flex flex-col basis-3/10 flex-shrink-0 gap-4 px-2">
          <Button color="default" onClick={createNewChatSession}>
            Create a new chat
          </Button>
          {chatSessions.map((chatSession) => (
            <Button
              key={chatSession.id}
              color="primary"
              onClick={() => {
                setCurrentChatSession(chatSession)
                setMessages(chatSession.messages.flat())
              }}
            >
              {chatSession.title}
            </Button>
          ))}
        </div>
        <div className="flex-grow basis-7/10 ml-4">
          <ChatMessages
            className="py-[20px]"
            data={messages.map((msg) => ({
              role: msg.role,
              message: msg.message,
            }))}
          />
        </div>
      </div>
    </ChatLayout>
  )
}
