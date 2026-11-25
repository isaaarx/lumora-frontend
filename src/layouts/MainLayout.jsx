import { useState } from 'react';
import './MainLayout.css';

import Sidebar from '../components/Sidebar/Sidebar';
import ChatPage from '../pages/ChatPage/ChatPage';
import TicketsPage from '../pages/TicketsPage/TicketsPage';
import TicketDetailsPage from '../pages/TicketDetailsPage/TicketDetailsPage';

import { useConversation } from '../useConversation';
import ticketsMock from '../mocks/tickets';

function MainLayout() {
  const chat = useConversation();
  const [archives, setArchives] = useState([]);
  const [pinned, setPinned] = useState([]);
  const [viewId, setViewId] = useState(null);
  const [choosing, setChoosing] = useState(false);
  const [tickets, setTickets] = useState(ticketsMock);
  const [activePage, setActivePage] = useState('chat');
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const current = chat.session && {
    id: chat.session.thread_id,
    title: chat.items.find(item => item.from === 'user')?.text.slice(0, 40) || 'Conversa atual',
    items: chat.items,
  };
  const archive = archives.find(item => item.id === viewId);
  const chats = [...(current ? [current] : []), ...archives].map(item => ({
    ...item, pinned: pinned.includes(item.id),
  }));
  const selectedTicket = tickets.find((ticket) => ticket.id === selectedTicketId);

  function handleSelectChat(chatId) {
    setViewId(chatId);
    setChoosing(false);
    setActivePage('chat');
  }

  function handleNavigate(page) {
    setActivePage(page);

    if (page === 'tickets') {
      setSelectedTicketId(null);
    }
  }

  function handleViewTicket(ticket) {
    setSelectedTicketId(ticket.id);
    setActivePage('ticket-details');
  }

  function handleUpdateTicket(updatedTicket) {
    setTickets((previousTickets) =>
      previousTickets.map((ticket) =>
        ticket.id === updatedTicket.id ? updatedTicket : ticket
      )
    );
  }

  function handleBackToTickets() {
    setActivePage('tickets');
    setSelectedTicketId(null);
  }

  function handleNewChat() {
    setActivePage('chat');
    setViewId(null);
    setChoosing(true);
  }

  async function selectCharacter(id) {
    const sameCharacter = !chat.expired && chat.session?.character.id === id;
    if (await chat.start(id)) {
      if (sameCharacter && current) setArchives(previous => [current, ...previous]);
      else {
        setArchives([]);
        setPinned([]);
      }
      setViewId(null);
      setChoosing(false);
    }
  }

  function handleTogglePin(id) {
    setPinned(previous => previous.includes(id) ? previous.filter(key => key !== id) : [...previous, id]);
  }

  function handleDeleteChat(id) {
    setArchives(previous => previous.filter(item => item.id !== id));
    setPinned(previous => previous.filter(key => key !== id));
    if (id === viewId) setViewId(null);
  }

  return (
    <div className="main-layout">
      <Sidebar
        chats={chats}
        activeChatId={viewId ?? current?.id}
        currentId={current?.id}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
        onTogglePin={handleTogglePin}
        onDeleteChat={handleDeleteChat}
        onNavigate={handleNavigate}
      />

      <main className="main-content">
        {activePage !== 'chat' && <p>Chamados de demonstração · dados locais</p>}
        {activePage === 'chat' ? (
          <ChatPage chat={chat} archive={archive} choosing={choosing}
            onChoose={handleNewChat} onSelect={selectCharacter} onCancel={() => setChoosing(false)} />
        ) : activePage === 'ticket-details' && selectedTicket ? (
          <TicketDetailsPage
            ticket={selectedTicket}
            onBack={handleBackToTickets}
            onUpdateTicket={handleUpdateTicket}
          />
        ) : (
          <TicketsPage tickets={tickets} onViewTicket={handleViewTicket} />
        )}
      </main>
    </div>
  );
}

export default MainLayout;
