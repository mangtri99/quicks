import { ref } from 'vue'
import { defineStore } from 'pinia'

interface SelectedChat {
  chatId: number
  messageId: number
  message?: string
}

export const useChatStore = defineStore('chat', () => {
  const message = ref('')
  const selectedChat = ref<SelectedChat>()
  const chats = ref([
    {
      id: 1,
      title: 'Please review my application',
      name: 'John Doe',
      updatedAt: '2024-01-15T19:10:00',
      description: 'lorem ipsum dolor sit amet',
      isGroup: true
    },
    {
      id: 2,
      title: '1092 Naturalization',
      name: 'Alain Doe',
      updatedAt: '2024-01-15T19:10:00',
      description: 'lorem ipsum dolor sit amet',
      isGroup: true
    },
    {
      id: 3,
      title: 'Fast Visa Support',
      name: 'Jennifer Doe',
      updatedAt: '2024-01-15T19:10:00',
      description: 'lorem ipsum dolor sit amet',
      isGroup: false
    }
  ])

  const chatDetails = ref([
    {
      chat_id: 1,
      converations: [
        {
          id: 1,
          userId: 1,
          name: 'John Doe',
          message: 'Hello, I have a question about my application',
          date: '2024-01-14T19:10:00',
          isMe: true,
          bgClass: 'bg-chats-purple',
          textClass: 'text-chats-purple-accent'
        },
        {
          id: 2,
          userId: 2,
          name: 'Dazel',
          message: 'I have a question about my application',
          date: '2024-01-14T19:10:00',
          isMe: false,
          bgClass: 'bg-chats-orange',
          textClass: 'text-chats-orange-accent'
        },
        {
          id: 3,
          userId: 3,
          name: 'Gracia',
          message: 'I have a question about my application',
          date: '2024-01-15T19:10:00',
          isMe: false,
          bgClass: 'bg-chats-green',
          textClass: 'text-chats-green-accent'
        },
        {
          id: 4,
          userId: 4,
          name: 'Zee',
          message: 'I have a question about my application',
          date: '2024-01-15T19:10:00',
          isMe: false,
          bgClass: 'bg-chats-blue',
          textClass: 'text-chats-blue-accent'
        },
        {
          id: 5,
          userId: 1,
          name: 'John Doe',
          message: 'I have a question about my application',
          date: '2024-01-15T19:10:00',
          isMe: true,
          bgClass: 'bg-chats-purple',
          textClass: 'text-chats-purple-accent'
        },
        {
          id: 6,
          userId: 5,
          name: 'Freya',
          message: 'I have a question about my application',
          date: '2024-01-16T19:10:00',
          isMe: false,
          bgClass: 'bg-chats-red',
          textClass: 'text-chats-red-accent'
        },
        {
          id: 7,
          userId: 1,
          name: 'John Doe',
          message: 'I have a question about my application',
          date: '2024-01-16T19:10:00',
          isMe: true,
          bgClass: 'bg-chats-purple',
          textClass: 'text-chats-purple-accent'
        }
      ]
    },
    {
      chat_id: 2,
      converations: [
        {
          id: 1,
          userId: 1,
          name: 'John Doe',
          message: 'Hello, I have a question about my application',
          date: '2024-01-14T19:10:00',
          isMe: true,
          bgClass: 'bg-chats-purple',
          textClass: 'text-chats-purple-accent'
        },
        {
          id: 2,
          userId: 2,
          name: 'Dazel',
          message: 'I have a question about my application',
          date: '2024-01-14T19:10:00',
          isMe: false,
          bgClass: 'bg-chats-orange',
          textClass: 'text-chats-orange-accent'
        },
        {
          id: 3,
          userId: 3,
          name: 'Gracia',
          message: 'I have a question about my application',
          date: '2024-01-15T19:10:00',
          isMe: false,
          bgClass: 'bg-chats-green',
          textClass: 'text-chats-green-accent'
        },
        {
          id: 4,
          userId: 4,
          name: 'Zee',
          message: 'I have a question about my application',
          date: '2024-01-15T19:10:00',
          isMe: false,
          bgClass: 'bg-chats-blue',
          textClass: 'text-chats-blue-accent'
        },
        {
          id: 5,
          userId: 1,
          name: 'John Doe',
          message: 'I have a question about my application',
          date: '2024-01-15T19:10:00',
          isMe: true,
          bgClass: 'bg-chats-purple',
          textClass: 'text-chats-purple-accent'
        },
        {
          id: 6,
          userId: 5,
          name: 'Freya',
          message: 'I have a question about my application',
          date: '2024-01-16T19:10:00',
          isMe: false,
          bgClass: 'bg-chats-red',
          textClass: 'text-chats-red-accent'
        },
        {
          id: 7,
          userId: 1,
          name: 'John Doe',
          message: 'I have a question about my application',
          date: '2024-01-16T19:10:00',
          isMe: true,
          bgClass: 'bg-chats-purple',
          textClass: 'text-chats-purple-accent'
        }
      ]
    },
    {
      chat_id: 3,
      converations: [
        {
          id: 1,
          userId: 1,
          name: 'John Doe',
          message: 'Hello, I have a question about my application',
          date: '2024-01-14T19:10:00',
          isMe: true,
          bgClass: 'bg-chats-purple',
          textClass: 'text-chats-purple-accent'
        },
        {
          id: 2,
          userId: 2,
          name: 'Gracia',
          message: 'Sure, I can help you with that',
          date: '2024-01-14T19:10:00',
          isMe: false,
          bgClass: 'bg-chats-orange',
          textClass: 'text-chats-orange-accent'
        }
      ]
    }
  ])

  function sendChat(chatId: number, message: string) {
    // If mode edit chat
    if (selectedChat.value) {
      updateChat()
      return
    }
    // else add new chat
    const getChat = chatDetails.value.find((chat) => chat.chat_id === chatId)
    if (getChat) {
      getChat.converations.push({
        id: getChat.converations.length + 1,
        userId: 1,
        name: 'John Doe',
        message,
        date: new Date().toISOString(),
        isMe: true,
        bgClass: 'bg-chats-purple',
        textClass: 'text-chats-purple-accent'
      })
    }
  }

  function updateChat() {
    const getChat = chatDetails.value.find((chat) => chat.chat_id === selectedChat.value?.chatId)
    if (getChat) {
      const getMessage = getChat.converations.findIndex(
        (chat) => chat.id === selectedChat.value?.messageId
      )
      if (getMessage) {
        getChat.converations[getMessage].message = message.value
      }
    }
  }

  function editChat(chatId: number, messageId: number, message: string) {
    selectedChat.value = {
      chatId,
      messageId,
      message
    }
  }

  function clearSelectedChat() {
    selectedChat.value = undefined
    message.value = ''
  }

  function deleteChat(chatId: number, messageId: number) {
    const getChat = chatDetails.value.find((chat) => chat.chat_id === chatId)
    if (getChat) {
      const getMessage = getChat.converations.findIndex((chat) => chat.id === messageId)
      if (getMessage) {
        getChat.converations.splice(getMessage, 1)
      }
    }
  }

  return {
    message,
    selectedChat,
    chats,
    chatDetails,
    sendChat,
    editChat,
    deleteChat,
    updateChat,
    clearSelectedChat
  }
})
