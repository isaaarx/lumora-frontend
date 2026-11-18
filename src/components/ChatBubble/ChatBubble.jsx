import './ChatBubble.css';
import logo from '../../assets/LogoIcon.svg';

function ChatBubble({
  message,
  sender = 'user',
}) {
  return (
    <div className={`chat-bubble-wrapper chat-bubble-${sender}`}>
      {sender === 'lumi' && (
        <img
          src={logo}
          alt="Lumi"
          className="chat-bubble-logo"
        />
      )}

      <div className="chat-bubble">
        {message}
      </div>
    </div>
  );
}

export default ChatBubble;
