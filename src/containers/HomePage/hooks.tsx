import { ApiChatMessage } from '@/services/api'
import { useEffect, useState } from 'react'

export type ChatSession = {
  id: string
  title: string
  messages: ApiChatMessage[][]
  createdAt: Date
}

export const useChatSessions = () => {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([])
  const [currentChatSession, setCurrentChatSession] = useState<
    ChatSession | undefined
  >()
  const [messages, setMessages] = useState<ApiChatMessage[]>([])

  const createNewChatSession = () => {
    const newChatSession: ChatSession = {
      id: Math.random().toString(),
      title: 'New Chat Session',
      messages: [],
      createdAt: new Date(),
    }

    currentChatSession
      ? setChatSessions((prevSessions) => [newChatSession, ...prevSessions])
      : setChatSessions([newChatSession])

    setCurrentChatSession(newChatSession)
    setMessages([])
  }

  useEffect(() => {
    if (currentChatSession) {
      const updatedChatSession = {
        ...currentChatSession,
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
      const parsedStoredSessions: ChatSession[] = JSON.parse(storedSessions)

      const sortedSessions = parsedStoredSessions.sort((a, b) =>
        b.createdAt > a.createdAt ? 1 : -1,
      )

      setChatSessions(sortedSessions)

      const mostRecentSession = sortedSessions[0]
      setCurrentChatSession(mostRecentSession)
      setMessages(mostRecentSession.messages.flat())
    }
    if (!storedSessions) {
      createNewChatSession()
    }
  }, [])

  useEffect(() => {
    if (chatSessions.length > 0) {
      localStorage.setItem('chatSessions', JSON.stringify(chatSessions))
    }
  }, [chatSessions])

  return {
    chatSessions,
    messages,
    setMessages,
    createNewChatSession,
    setCurrentChatSession,
  }
}
