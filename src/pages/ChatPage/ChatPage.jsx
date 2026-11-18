import './ChatPage.css';

import { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowDown } from 'lucide-react';
import logo from '../../assets/LogoIcon.svg';

import ChatInput from '../../components/ChatInput/ChatInput';
import ChatBubble from '../../components/ChatBubble/ChatBubble';

function ChatPage({ chat, onSendMessage }) {
  const [message, setMessage] = useState('');
  const [showScrollButton, setShowScrollButton] = useState(false);

  const messagesContainerRef = useRef(null);
  const messagesEndRef = useRef(null);

  const messages = chat?.messages || [];

  const scrollToBottom = useCallback((behavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({
      behavior,
      block: 'end',
    });
  }, []);

  useEffect(() => {
    setMessage('');
    setShowScrollButton(false);
  }, [chat?.id]);

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom('auto');
    }
  }, [chat?.id, messages.length, scrollToBottom]);

  function handleSend(text) {
    onSendMessage(text);
    setMessage('');
  }

  function handleScroll(event) {
    const element = event.currentTarget;

    const distanceFromBottom =
      element.scrollHeight -
      element.scrollTop -
      element.clientHeight;

    setShowScrollButton(distanceFromBottom > 100);
  }

  return (
    <div className="chat-page">
      {messages.length === 0 ? (
        <div className="chat-empty-state">
          <img
            src={logo}
            alt="Lumi"
            className="chat-empty-logo"
          />

          <h1>Como posso ajudar?</h1>

          <div className="chat-empty-input">
            <ChatInput
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onSend={handleSend}
            />
          </div>
        </div>
      ) : (
        <>
          <div className="chat-messages-container">
            <div
              className="chat-messages"
              ref={messagesContainerRef}
              onScroll={handleScroll}
            >
              <div className="chat-messages-content">
                {messages.map((item) => (
                  <ChatBubble
                    key={item.id}
                    message={item.message}
                    sender={item.sender}
                  />
                ))}

                <div ref={messagesEndRef} />
              </div>
            </div>

            {showScrollButton && (
              <button
                type="button"
                className="chat-scroll-button"
                onClick={() => scrollToBottom('smooth')}
                aria-label="Ir para a última mensagem"
                title="Ir para o final"
              >
                <ArrowDown size={20} />
              </button>
            )}
          </div>

          <div className="chat-input-footer">
            <ChatInput
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onSend={handleSend}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default ChatPage;
