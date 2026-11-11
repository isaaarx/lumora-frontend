import './ChatInput.css';

import Button from '../Button/Button';
import { Send } from 'lucide-react';
import { useEffect, useRef } from 'react';

function ChatInput({
  value = '',
  onChange,
  onSend,
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

  return (
    <div className="chat-input">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={1}
      />

      <Button
        icon={Send}
        iconOnly
        className="chat-input-send"
        ariaLabel="Enviar mensagem"
      />
    </div>
  );
}

export default ChatInput;