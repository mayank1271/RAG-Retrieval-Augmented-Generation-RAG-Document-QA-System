interface Message {
  id: string;
  query: string;
  response: string;
  timestamp: Date;
}

interface ResponseDisplayProps {
  messages: Message[];
}

export function ResponseDisplay({ messages }: ResponseDisplayProps) {
  if (messages.length === 0) {
    return (
      <div className="response-empty">
        <p>Your questions and answers will appear here</p>
      </div>
    );
  }

  return (
    <div className="response-container">
      {messages.map((message) => (
        <div key={message.id} className="message-group">
          <div className="message query-message">
            <div className="message-label">You</div>
            <div className="message-content">{message.query}</div>
          </div>
          <div className="message response-message">
            <div className="message-label">AI Assistant</div>
            <div className="message-content">{message.response}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
