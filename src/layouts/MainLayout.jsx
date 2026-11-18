

import { useState } from 'react';
import './MainLayout.css';

import Sidebar from '../components/Sidebar/Sidebar';
import ChatPage from '../pages/ChatPage/ChatPage';
import chatsMock from '../mocks/chats';

function MainLayout() {
  const [chats, setChats] = useState(chatsMock);
  const [activeChatId, setActiveChatId] = useState(null);

  const activeChat = chats.find(
    (chat) => chat.id === activeChatId
  );

  // Criar um novo chat
  function handleNewChat() {
    const newChatId = Math.max(0, ...chats.map((chat) => chat.id)) + 1;

    const newChat = {
      id: newChatId,
      title: 'Novo chat',
      pinned: false,
      messages: [],
    };

    setChats((previousChats) => {
      const pinnedChats = previousChats.filter((chat) => chat.pinned);
      const historyChats = previousChats.filter((chat) => !chat.pinned);

      return [...pinnedChats, newChat, ...historyChats];
    });

    setActiveChatId(newChatId);
  }

  // Fixar ou desafixar uma conversa
  function handleTogglePin(chatId) {
    setChats((previousChats) => {
      const updatedChats = previousChats.map((chat) =>
        chat.id === chatId
          ? { ...chat, pinned: !chat.pinned }
          : chat
      );

      const pinnedChats = updatedChats.filter((chat) => chat.pinned);
      const historyChats = updatedChats.filter((chat) => !chat.pinned);

      return [...pinnedChats, ...historyChats];
    });
  }

  // Enviar mensagem
  function handleSendMessage(message) {
    let chatId = activeChatId;

    // Criar um chat caso nenhum esteja selecionado
    if (chatId === null) {
      chatId = Math.max(0, ...chats.map((chat) => chat.id)) + 1;

      const newChat = {
        id: chatId,
        title: message.slice(0, 30),
        pinned: false,
        messages: [],
      };

      setChats((previousChats) => {
        const pinnedChats = previousChats.filter((chat) => chat.pinned);
        const historyChats = previousChats.filter((chat) => !chat.pinned);

        return [...pinnedChats, newChat, ...historyChats];
      });

      setActiveChatId(chatId);
    }

    const newMessage = {
      id: Date.now(),
      sender: 'user',
      message,
    };

    setChats((previousChats) =>
      previousChats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              title:
                chat.messages.length === 0
                  ? message.slice(0, 30)
                  : chat.title,
              messages: [...chat.messages, newMessage],
            }
          : chat
      )
    );
  }

  return (
    <div className="main-layout">
      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        onSelectChat={setActiveChatId}
        onNewChat={handleNewChat}
        onTogglePin={handleTogglePin}
      />

      <main className="main-content">
        <ChatPage
          chat={activeChat}
          onSendMessage={handleSendMessage}
        />
      </main>
    </div>
  );
}

export default MainLayout;
