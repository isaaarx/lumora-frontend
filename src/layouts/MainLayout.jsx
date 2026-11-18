
import { useState } from 'react';
import './MainLayout.css';

import Sidebar from '../components/SideBar/SideBar';
import ChatPage from '../pages/ChatPage/ChatPage';
import TicketsPage from '../pages/TicketsPage/TicketsPage';

import chatsMock from '../mocks/chats';

function MainLayout() {
  const [chats, setChats] = useState(chatsMock);
  const [activeChatId, setActiveChatId] = useState(null);
  const [activePage, setActivePage] = useState('chat');

  const activeChat = chats.find(
    (chat) => chat.id === activeChatId
  );

  // Selecionar uma conversa
  function handleSelectChat(chatId) {
    setActiveChatId(chatId);
    setActivePage('chat');
  }

  // Navegar entre páginas
  function handleNavigate(page) {
    setActivePage(page);

    if (page === 'tickets') {
      setActiveChatId(null);
    }
  }

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
    setActivePage('chat');
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

  // Excluir uma conversa
  function handleDeleteChat(chatId) {
    setChats((previousChats) =>
      previousChats.filter((chat) => chat.id !== chatId)
    );

    if (activeChatId === chatId) {
      setActiveChatId(null);
    }
  }

  // Enviar mensagem
  function handleSendMessage(message) {
    let chatId = activeChatId;

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
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
        onTogglePin={handleTogglePin}
        onDeleteChat={handleDeleteChat}
        onNavigate={handleNavigate}
      />

      <main className="main-content">
        {activePage === 'chat' ? (
          <ChatPage
            chat={activeChat}
            onSendMessage={handleSendMessage}
          />
        ) : (
          <TicketsPage />
        )}
      </main>
    </div>
  );
}

export default MainLayout;
