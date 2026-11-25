import './ChatPage.css';
import { useEffect, useRef, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import logo from '../../assets/LogoIcon.svg';
import ChatInput from '../../components/ChatInput/ChatInput';
import ChatBubble from '../../components/ChatBubble/ChatBubble';
import CharacterPicker from '../../components/CharacterPicker';
import ChatReply, { Preview } from '../../components/ChatReply';

export default function ChatPage({ chat, archive, choosing, onSelect, onChoose, onCancel }) {
  const end = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const items = archive?.items ?? chat.items;
  const blocked = chat.busy || chat.switching || chat.needsRecovery || chat.expired;
  useEffect(() => {
    end.current?.scrollIntoView({ block: 'nearest' });
  }, [items, choosing]);

  return <section className="chat-page">
    {chat.error && <p role="alert">{chat.error}</p>}
    {chat.needsRecovery && !chat.expired &&
      <button disabled={chat.busy} onClick={chat.recover}>Consultar estado da sessão</button>}
    {chat.restoring ? <p role="status">Recuperando sessão…</p>
      : choosing || !chat.session || chat.expired ? <div className="chat-empty-state">
        <img src={logo} alt="Lumi" className="chat-empty-logo" />
        <CharacterPicker onSelect={onSelect} disabled={chat.switching}
          activeId={chat.session?.character.id} />
        {chat.session && !chat.expired &&
          <button disabled={chat.switching} onClick={onCancel}>Voltar à conversa</button>}
      </div> : <>
        <header className="chat-session"><strong>{chat.session.character.name}</strong>
          {chat.session.adapter === 'mock' && <span>Simulação</span>}
          <button onClick={onChoose}>Trocar técnico</button>
        </header>
        {chat.notice && !archive && <p role="status">{chat.notice}</p>}
        {archive && <p>Conversa anterior · somente leitura</p>}
        {items.length === 0 ? <div className="chat-empty-state">
          <img src={logo} alt="Lumi" className="chat-empty-logo" /><h1>Como posso ajudar?</h1>
        </div> : <div className="chat-messages-container"><div className="chat-messages" role="log" onScroll={({ currentTarget: el }) =>
          setShowScrollButton(el.scrollHeight - el.scrollTop - el.clientHeight > 100)}>
          <div className="chat-messages-content">
            {items.map((item, index) => <ChatBubble key={index} sender={item.from === 'user' ? 'user' : 'lumi'}
              message={item.from === 'user' ? <>{item.text}{item.status === 'failed' && <small> · Falha no envio</small>}</>
                : <ChatReply reply={item.reply} onOption={chat.submit}
                    disabled={Boolean(archive) || blocked || index !== items.length - 1}
                    pending={chat.session.pending_action} />} />)}
            <div ref={end} />
          </div>
        </div>
          {showScrollButton && <button type="button" className="chat-scroll-button"
            aria-label="Ir para a última mensagem" onClick={() => end.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })}>
            <ArrowDown size={20} />
          </button>}
        </div>}
        {!archive && <div className="chat-input-footer">
          {chat.session.pending_action && <div>
            <Preview action={chat.session.pending_action} />
            <p>Digite sim, não ou editar: texto corrigido.</p>
          </div>}
          {chat.busy && <p role="status">Aguardando resposta…</p>}
          <ChatInput value={chat.draft} onChange={event => chat.setDraft(event.target.value)}
            onSend={chat.submit} disabled={blocked} />
        </div>}
      </>}
  </section>;
}
