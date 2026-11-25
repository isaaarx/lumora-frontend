import './ChatInput.css';

import Button from '../Button/Button';
import { Send } from 'lucide-react';
import { useEffect, useRef } from 'react';

function ChatInput({
  value = '',
  onChange,
  onSend,
  disabled = false,
  placeholder = 'Como a Lumi pode te ajudar?',
}) {
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;

    if (!textarea) return;

    textarea.style.height = '24px';

    const newHeight = Math.min(textarea.scrollHeight, 120);

    textarea.style.height = `${newHeight}px`;
  }, [value]);

  function handleSend() {
    const message = value.trim();

    if (disabled || !message) return;

    onSend(message);
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="chat-input">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        rows={1}
        aria-label="Sua mensagem"
        maxLength={4000}
        disabled={disabled}
      />

      <Button
        disabled={disabled || !value.trim()}
        icon={Send}
        iconOnly
        className="chat-input-send"
        ariaLabel="Enviar mensagem"
        onClick={handleSend}
      />
    </div>
  );
}

export default ChatInput;