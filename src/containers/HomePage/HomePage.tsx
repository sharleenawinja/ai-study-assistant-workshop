import { ChatMessages } from '@/components/ChatMessages'
import { MessageBar } from '@/components/MessageBar'
import { Search } from '@/components/Search'
import { ChatLayout } from '@/layouts/ChatLayout/Chat.layout'
import { useSearch } from '@/queries/useSearch'
import { ApiChatMessage, chatApi } from '@/services/api'
import { populateDirs } from '@/utils/populateDirs.util'
import { Button } from '@nextui-org/button'
import React, { useEffect, useMemo, useState } from 'react'

export type HomePageProps = React.HTMLProps<HTMLDivElement>

type ChatSession = {
  id: string
  title: string
  messages: ApiChatMessage[][]
  createdAt: Date
}

export const HomePage: React.FC<HomePageProps> = ({ className, ...props }) => {
  const [query, setQuery] = useState('')
  const [prompt, setPrompt] = useState('')
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])
  const [messages, setMessages] = useState<ApiChatMessage[]>([])
  const [generating, setGenerating] = useState(false)
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([])
  const [currentChatSession, setCurrentChatSession] = useState<ChatSession>()

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

  const createNewChatSession = () => {
    const newChatSession: ChatSession = {
      id: Math.random().toString(),
      title: 'New Chat Session',
      messages: [],
      createdAt: new Date(),
    }

    setChatSessions((prevSessions) => [newChatSession, ...prevSessions])
    setCurrentChatSession(newChatSession)
    setMessages([])
  }

  useEffect(() => {
    if (currentChatSession) {
      const updatedChatSession = {
        ...currentChatSession!,
        messages: [messages],
        title: messages.length > 0 ? messages[0].message : 'New Chat Session',
      }

      setCurrentChatSession(updatedChatSession)

      const updatedChatSessions = chatSessions.map((session) =>
        session.id === updatedChatSession.id ? updatedChatSession : session,
      )

      setChatSessions(updatedChatSessions)
    }
  }, [messages])

  useEffect(() => {
    const storedSessions = localStorage.getItem('chatSessions')

    if (storedSessions) {
      const parsedStoredSessions = JSON.parse(storedSessions)

      const sortedSessions = parsedStoredSessions.sort(
        (a: ChatSession, b: ChatSession) =>
          b.createdAt > a.createdAt ? 1 : -1,
      )

      setChatSessions(sortedSessions)

      const mostRecentSession = sortedSessions[0]
      setCurrentChatSession(mostRecentSession)
      setMessages(mostRecentSession.messages.flat())
    }
    if (!storedSessions) {
      const newChatSession = {
        id: Math.random().toString(),
        title: 'New Chat',
        messages: [],
        createdAt: new Date(),
      }

      setChatSessions([newChatSession])
      setCurrentChatSession(newChatSession)
    }
  }, [])

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
