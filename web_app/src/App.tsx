import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatPanel } from './components/ChatPanel';
import { PresentationPanel } from './components/PresentationPanel';
import { generateResponseStream, SlideModel, NapkinNote } from './services/api';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}

interface Thread {
  id: string;
  title: string;
  messages: Message[];
  latestNotes: NapkinNote[];
  latestSlides: SlideModel[];
  downloadUrl: string | null;
}

function App() {
  const [threads, setThreads] = useState<Thread[]>([
    { id: 'thread_0', title: 'New Chat', messages: [], latestNotes: [], latestSlides: [], downloadUrl: null }
  ]);
  const [selectedThreadId, setSelectedThreadId] = useState<string>('thread_0');
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const selectedThread = threads.find(t => t.id === selectedThreadId)!;

  const handleNewChat = () => {
    const id = `thread_${Date.now()}`;
    setThreads(prev => [{ id, title: 'New Chat', messages: [], latestNotes: [], latestSlides: [], downloadUrl: null }, ...prev]);
    setSelectedThreadId(id);
  };

  const handleSelectThread = (id: string) => {
    setSelectedThreadId(id);
  };

  const updateThread = (id: string, updates: Partial<Thread>) => {
    setThreads(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const prompt = input.trim();
    setInput('');
    setIsLoading(true);

    const userMsg: Message = { id: `msg_${Date.now()}`, sender: 'user', text: prompt };
    const aiMsgId = `msg_ai_${Date.now()}`;
    const initialAiMsg: Message = { id: aiMsgId, sender: 'ai', text: 'Planning presentation logic...' };

    let newTitle = selectedThread.title;
    if (newTitle === 'New Chat') {
      newTitle = prompt.length > 30 ? prompt.substring(0, 30) + '...' : prompt;
    }

    updateThread(selectedThread.id, {
      title: newTitle,
      messages: [...selectedThread.messages, userMsg, initialAiMsg]
    });

    try {
      for await (const chunk of generateResponseStream(prompt)) {
        setThreads(prev => prev.map(t => {
          if (t.id === selectedThread.id) {
            const updatedMessages = t.messages.map(m => 
              m.id === aiMsgId ? { ...m, text: chunk.chatReply } : m
            );
            return {
              ...t,
              messages: updatedMessages,
              latestNotes: chunk.notes,
              latestSlides: chunk.slides,
              downloadUrl: chunk.downloadUrl
            };
          }
          return t;
        }));
      }
    } catch (err) {
      console.error("Generator error", err);
       setThreads(prev => prev.map(t => {
          if (t.id === selectedThread.id) {
            const updatedMessages = t.messages.map(m => 
              m.id === aiMsgId ? { ...m, text: "Wait, the generation encountered an error fetching text from server." } : m
            );
             return { ...t, messages: updatedMessages };
          }
          return t;
       }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', width: '100%', height: '100%', color: 'white' }}>
      <Sidebar 
        threads={threads} 
        selectedThreadId={selectedThreadId} 
        onSelect={handleSelectThread} 
        onNew={handleNewChat} 
      />
      
      <ChatPanel 
        messages={selectedThread.messages}
        isLoading={isLoading}
        input={input}
        setInput={setInput}
        onSend={handleSend}
      />
      
      <div style={{ width: '1px', backgroundColor: 'var(--border-color)' }} />
      
      <PresentationPanel 
        slides={selectedThread.latestSlides}
        notes={selectedThread.latestNotes}
        downloadUrl={selectedThread.downloadUrl}
      />
    </div>
  );
}

export default App;
