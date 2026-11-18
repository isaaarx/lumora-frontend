
import { useState, useEffect } from 'react';
import './Sidebar.css';

import logo from '../../assets/logo.svg';

import {
  MessageCircle,
  Pin,
  PinOff,
  History,
  Ticket,
} from 'lucide-react';

function Sidebar({
  chats,
  activeChatId,
  onSelectChat,
  onNewChat,
  onTogglePin,
}) {
  const [contextMenu, setContextMenu] = useState(null);

  const pinnedChats = chats.filter((chat) => chat.pinned);
  const historyChats = chats.filter((chat) => !chat.pinned);

  // Abrir o menu com o botão direito
  function handleContextMenu(event, chat) {
    event.preventDefault();

    setContextMenu({
      chatId: chat.id,
      x: event.clientX,
      y: event.clientY,
      pinned: chat.pinned,
    });
  }

  // Fechar o menu
  function closeContextMenu() {
    setContextMenu(null);
  }

  // Fixar ou desafixar conversa
  function handlePinChat() {
    onTogglePin(contextMenu.chatId);
    closeContextMenu();
  }

  // Fechar ao clicar fora ou apertar ESC
  useEffect(() => {
    function handleClickOutside() {
      closeContextMenu();
    }

    function handleEscape(event) {
      if (event.key === 'Escape') {
        closeContextMenu();
      }
    }

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <img src={logo} alt="Lumora" className="sidebar-logo" />
      </div>

      <nav className="sidebar-nav">
        <div className="sidebar-item" onClick={onNewChat}>
          <MessageCircle size={18} />
          <span>Novo chat</span>
        </div>

        <section className="sidebar-section">
          <div className="sidebar-item">
            <Pin size={18} />
            <span>Fixado</span>
          </div>

          <div className="sidebar-chat-list">
            {pinnedChats.map((chat) => (
              <div
                className={`sidebar-chat ${
                  activeChatId === chat.id ? 'sidebar-chat-active' : ''
                }`}
                key={chat.id}
                onClick={() => onSelectChat(chat.id)}
                onContextMenu={(event) => handleContextMenu(event, chat)}
              >
                {chat.title}
              </div>
            ))}
          </div>
        </section>

        <section className="sidebar-section">
          <div className="sidebar-item">
            <History size={18} />
            <span>Histórico</span>
          </div>

          <div className="sidebar-chat-list">
            {historyChats.map((chat) => (
              <div
                className={`sidebar-chat ${
                  activeChatId === chat.id ? 'sidebar-chat-active' : ''
                }`}
                key={chat.id}
                onClick={() => onSelectChat(chat.id)}
                onContextMenu={(event) => handleContextMenu(event, chat)}
              >
                {chat.title}
              </div>
            ))}
          </div>
        </section>
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-item sidebar-item-active">
          <Ticket size={18} />
          <span>Chamados</span>
        </div>
      </div>

      {contextMenu && (
        <div
          className="sidebar-context-menu"
          style={{
            top: contextMenu.y,
            left: contextMenu.x,
          }}
          onClick={(event) => event.stopPropagation()}
        >
          <button type="button" onClick={handlePinChat}>
            {contextMenu.pinned ? (
              <>
                <PinOff size={16} />
                <span>Desfixar</span>
              </>
            ) : (
              <>
                <Pin size={16} />
                <span>Fixar</span>
              </>
            )}
          </button>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
