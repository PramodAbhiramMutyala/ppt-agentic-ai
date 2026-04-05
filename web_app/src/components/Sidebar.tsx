import { PlusCircle, MessageSquare } from 'lucide-react';

export function Sidebar({ threads, selectedThreadId, onSelect, onNew }: any) {
  return (
    <div style={{
      width: '280px',
      backgroundColor: 'var(--bg-sidebar)',
      borderRight: '1px solid var(--border-color)',
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 16px'
    }}>
      <h2 style={{ fontSize: '16px', letterSpacing: '1px', marginBottom: '32px', color: 'white', padding: '0 8px' }}>
        ⚡ CALIBO.AI
      </h2>

      <button 
        onClick={onNew}
        style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '12px 16px', borderRadius: '8px',
          backgroundColor: 'var(--accent-purple)',
          color: 'white', border: 'none',
          marginBottom: '32px', transition: 'opacity 0.2s', fontWeight: 600, fontSize: '15px'
        }}
        onMouseOver={e => (e.currentTarget.style.opacity = '0.9')}
        onMouseOut={e => (e.currentTarget.style.opacity = '1')}
      >
        <PlusCircle size={20} />
        New Presentation
      </button>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px', fontWeight: 700, letterSpacing: '1px', padding: '0 8px' }}>CHAT HISTORY</p>
        {threads.map((t: any) => (
          <div 
            key={t.id}
            onClick={() => onSelect(t.id)}
            style={{
              padding: '12px 16px', borderRadius: '8px', cursor: 'pointer',
              marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '12px',
              backgroundColor: t.id === selectedThreadId ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
              color: t.id === selectedThreadId ? 'white' : 'var(--text-muted)',
              transition: 'all 0.2s',
              fontWeight: t.id === selectedThreadId ? 500 : 400
            }}
            onMouseOver={e => { if(t.id !== selectedThreadId) e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)' }}
            onMouseOut={e => { if(t.id !== selectedThreadId) e.currentTarget.style.backgroundColor = 'transparent' }}
          >
            <MessageSquare size={18} color={t.id === selectedThreadId ? 'var(--accent-blue)' : 'var(--text-muted)'} />
            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '14px' }}>{t.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
