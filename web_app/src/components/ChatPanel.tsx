import { useRef, useEffect } from 'react';
import { Send, User, Sparkles } from 'lucide-react';

export function ChatPanel({ messages, isLoading, input, setInput, onSend }: any) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      backgroundColor: 'var(--bg-chat)'
    }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px' }}>
        {messages.length === 0 ? (
          <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
            <div style={{ textAlign: 'center', maxWidth: '400px' }}>
              <div style={{ height: '80px', width: '80px', borderRadius: '24px', backgroundColor: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                 <Sparkles size={40} color="var(--accent-blue)" />
              </div>
              <h2 style={{ color: 'white', marginBottom: '12px' }}>Agentic PPT AI</h2>
              <p style={{ lineHeight: 1.6, fontSize: '15px' }}>
                What kind of presentation would you like to generate today?<br/>
                Try "Electric Vehicles" or "Baahubali movie"
              </p>
            </div>
          </div>
        ) : null}

        {messages.map((m: any) => (
          <div key={m.id} style={{
            display: 'flex', gap: '16px', marginBottom: '32px',
            flexDirection: m.sender === 'user' ? 'row-reverse' : 'row'
          }} className="animate-fade-in">
            <div style={{
              width: '40px', height: '40px', borderRadius: '12px', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backgroundColor: m.sender === 'user' ? 'var(--accent-purple)' : 'rgba(59, 130, 246, 0.15)',
              color: m.sender === 'user' ? 'white' : 'var(--accent-blue)'
            }}>
              {m.sender === 'user' ? <User size={20} /> : <Sparkles size={20} />}
            </div>
            <div style={{
              maxWidth: '80%', padding: '16px 20px', borderRadius: '16px',
              backgroundColor: m.sender === 'user' ? 'var(--accent-purple)' : 'rgba(255, 255, 255, 0.03)',
              border: m.sender === 'user' ? 'none' : '1px solid var(--border-color)',
              color: 'var(--text-main)', fontSize: '15px', lineHeight: 1.6,
              wordWrap: 'break-word',
              borderTopRightRadius: m.sender === 'user' ? '4px' : '16px',
              borderTopLeftRadius: m.sender === 'user' ? '16px' : '4px',
            }}>
              {m.text}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }} className="animate-fade-in">
             <div style={{ width: '40px', height: '40px', borderRadius: '12px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(59, 130, 246, 0.15)', color: 'var(--accent-blue)' }}><Sparkles size={20} /></div>
             <div style={{ padding: '16px 20px', borderRadius: '16px', borderTopLeftRadius: '4px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center' }}>
               <div className="typing-dot"></div>
               <div className="typing-dot" style={{ margin: '0 4px' }}></div>
               <div className="typing-dot"></div>
             </div>
          </div>
        )}
        <div ref={bottomRef} style={{ height: '24px' }} />
      </div>

      <div style={{
        padding: '24px',
        backgroundColor: 'var(--bg-panel)',
        borderTop: '1px solid var(--border-color)'
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '12px',
          backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '16px',
          padding: '10px 16px', border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)'
        }}>
          <input 
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if(e.key === 'Enter') onSend() }}
            placeholder="Type your topic to generate a robust presentation..."
            style={{
              flex: 1, background: 'none', border: 'none', color: 'white',
              fontSize: '15px', padding: '12px 4px'
            }}
            disabled={isLoading}
          />
          <button 
            onClick={onSend}
            disabled={isLoading || !input.trim()}
            style={{
              backgroundColor: isLoading || !input.trim() ? 'rgba(255,255,255,0.05)' : 'var(--accent-blue)',
              color: isLoading || !input.trim() ? 'var(--text-muted)' : 'white',
              borderRadius: '12px', padding: '12px',
              transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
