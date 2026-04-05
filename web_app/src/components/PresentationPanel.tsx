import { Download, FileText, Layers, CheckCircle2 } from 'lucide-react';

export function PresentationPanel({ slides, notes, downloadUrl }: any) {
  if (slides.length === 0 && notes.length === 0) {
    return (
      <div style={{
        flex: 1, backgroundColor: 'var(--bg-panel)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderLeft: '1px solid var(--border-color)',
        color: 'var(--text-muted)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <Layers size={64} style={{ opacity: 0.1, marginBottom: '24px' }} /><br />
          <h3 style={{ margin: 0, fontSize: '20px', color: 'rgba(255,255,255,0.5)' }}>Presentation Studio</h3>
          <p style={{ marginTop: '8px', fontSize: '15px' }}>Waiting for generation task to begin...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      flex: 1, backgroundColor: 'var(--bg-panel)',
      borderLeft: '1px solid var(--border-color)',
      overflowY: 'auto', padding: '40px'
    }}>
      {slides.length > 0 && (
        <div className="animate-fade-in">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '22px', marginBottom: '32px', color: 'white' }}>
            <Layers size={26} color="var(--accent-blue)" />
            Generated Deck Preview
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '40px' }}>
            {slides.map((s: any, idx: number) => (
              <div key={idx} style={{
                backgroundColor: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px',
                padding: '28px', boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
                transition: 'transform 0.2s', cursor: 'default'
              }}
              onMouseOver={e => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                    <h3 style={{ marginTop: 0, color: 'var(--text-main)', fontSize: '18px', fontWeight: 600 }}>{s.title}</h3>
                    <CheckCircle2 color="var(--accent-blue)" size={20} />
                </div>
                <ul style={{ paddingLeft: '20px', margin: 0, color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '14px' }}>
                  {s.points.map((p: string, i: number) => <li key={i} style={{ marginBottom: '10px' }}>{p}</li>)}
                </ul>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: '56px' }}>
            <button 
              disabled={!downloadUrl}
              onClick={() => { if(downloadUrl) window.open(downloadUrl, '_blank') }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '12px',
                backgroundColor: downloadUrl ? 'var(--accent-purple)' : 'rgba(255,255,255,0.05)',
                color: downloadUrl ? 'white' : 'var(--text-muted)',
                padding: '16px 32px', borderRadius: '12px', fontSize: '16px', fontWeight: 600,
                opacity: downloadUrl ? 1 : 0.6, cursor: downloadUrl ? 'pointer' : 'not-allowed',
                boxShadow: downloadUrl ? '0 8px 16px rgba(139, 92, 246, 0.2)' : 'none',
                transition: 'all 0.2s'
              }}
              onMouseOver={e => { if(downloadUrl) e.currentTarget.style.transform = 'scale(1.02)' }}
              onMouseOut={e => { if(downloadUrl) e.currentTarget.style.transform = 'scale(1)' }}
            >
              <Download size={22} />
              {downloadUrl ? 'Download Final PowerPoint (.pptx)' : 'Building .pptx physical file...'}
            </button>
          </div>
        </div>
      )}

      {notes.length > 0 && (
        <div className="animate-fade-in" style={{
          backgroundColor: 'var(--bg-dark)', border: '1px solid var(--border-color)',
          borderRadius: '20px', padding: '40px'
        }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: 0, color: 'white', marginBottom: '32px', borderBottom: '1px solid var(--border-color)', paddingBottom: '24px', fontSize: '20px' }}>
            <FileText size={24} color="var(--accent-purple)" />
            Agent Analysis (Napkin Notes)
          </h3>
          {notes.map((n: any, idx: number) => (
            <div key={idx} style={{ marginBottom: '32px' }}>
              <strong style={{ color: 'var(--text-main)', fontSize: '16px', display: 'block', marginBottom: '16px' }}>{n.heading}</strong>
              <ul style={{ paddingLeft: '20px', margin: 0, color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '15px' }}>
                {n.bullets.map((b: string, i: number) => <li key={i} style={{ marginBottom: '10px' }}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
