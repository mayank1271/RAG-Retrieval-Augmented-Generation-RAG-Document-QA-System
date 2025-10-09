import { useState } from 'react';
import { PDFUpload } from './components/PDFUpload';
import { QueryInput } from './components/QueryInput';
import { ResponseDisplay } from './components/ResponseDisplay';
import './App.css';

interface Message {
  id: string;
  query: string;
  response: string;
  timestamp: Date;
}

function App() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isQuerying, setIsQuerying] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    setUploadedFile(file);
    setMessages([]);

    setTimeout(() => {
      setIsUploading(false);
    }, 1500);
  };

  const handleQuery = async (query: string) => {
    setIsQuerying(true);

    setTimeout(() => {
      const newMessage: Message = {
        id: Date.now().toString(),
        query,
        response: `This is a demo response. To connect to your Python RAG backend, you'll need to create an API endpoint that processes the PDF and handles queries using your existing LangChain pipeline. The response would come from your RAG system based on the document content.`,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, newMessage]);
      setIsQuerying(false);
    }, 1000);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Document Q&A Assistant</h1>
        <p>Upload a PDF document and ask questions about its content</p>
      </header>

      <main className="app-main">
        <div className="upload-section">
          {!uploadedFile ? (
            <PDFUpload onUpload={handleUpload} isUploading={isUploading} />
          ) : (
            <div className="uploaded-file-info">
              <div className="file-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <div className="file-details">
                <h3>{uploadedFile.name}</h3>
                <p>{(uploadedFile.size / 1024).toFixed(2)} KB</p>
              </div>
              <button
                onClick={() => {
                  setUploadedFile(null);
                  setMessages([]);
                }}
                className="remove-button"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {uploadedFile && (
          <div className="query-section">
            <QueryInput
              onQuery={handleQuery}
              isLoading={isQuerying}
              disabled={!uploadedFile}
            />
            <ResponseDisplay messages={messages} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
