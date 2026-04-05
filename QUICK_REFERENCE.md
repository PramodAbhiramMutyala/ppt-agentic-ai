# Quick Reference Card

**Agentic PPT AI - React Frontend** ⚛️

---

## 🚀 Start Development

### Windows (PowerShell)
```powershell
.\quick-start.ps1
```
Select option 3 to start both servers.

### Manual Start (Any OS)
```bash
# Terminal 1: Backend
.\\venv\\Scripts\\activate        # Windows
# or: source venv/bin/activate   # Linux/Mac
uvicorn backend.app:app --reload

# Terminal 2: Frontend
cd web_app
npm run dev
```

**Then open:** http://localhost:5173

---

## 📝 Key Files

| File | Purpose |
|------|---------|
| `backend/app.py` | FastAPI entry point (port 8000) |
| `backend/orchestrator.py` | Multi-agent pipeline |
| `web_app/src/App.tsx` | Main React component |
| `web_app/src/services/api.ts` | Backend API client |
| `.env` | Environment variables (HuggingFace key) |

---

## 🔧 Common Commands

### Frontend (React)
```bash
cd web_app

npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production
npm run lint     # Check code
```

### Backend (Python)
```bash
uvicorn backend.app:app --reload  # Dev server
pip install -r requirements.txt    # Install deps
python -m pytest                   # Run tests
```

---

## 📡 API Endpoint

### Generate Presentation
```
Method: POST
URL: http://127.0.0.1:8000/generate
Body: { "prompt": "Your topic" }
Response: NDJSON stream
```

**Events:**
```json
{"status":"titles_generated","titles":[...]}
{"status":"slide_generated","slide":{...}}
{"status":"completed","filename":"...pptx"}
```

---

## ⚙️ Configuration

### .env (Project Root)
```env
HUGGINGFACE_API_KEY=hf_your_token
```

Get token: https://huggingface.co/settings/tokens

### Backend Port
Edit `backend/app.py` line ~40:
```python
uvicorn.run(app, host="127.0.0.1", port=8000)
```

### Frontend Port
Edit `web_app/vite.config.ts`:
```typescript
server: { port: 5173 }
```

---

## 🧩 Component Structure

```
App (main state)
├── Sidebar (thread management)
├── ChatPanel (messages)
└── PresentationPanel (slides)
```

**Data Flow:**
User Input → Send → API → Stream → Update UI

---

## 🐛 Troubleshooting

| Issue | Fix |
|-------|-----|
| "Can't connect" | Check backend on port 8000 |
| CORS error | Verify CORSMiddleware in backend |
| npm not found | Install Node.js 18+ |
| Streaming broken | Use Chrome/Firefox |
| .env missing | Create `.env` with API key |
| Build fails | `rm -rf node_modules; npm install` |

---

## 📦 Dependencies

**Frontend:**
- react@18.3
- typescript@5.9
- vite@5.4
- lucide-react@0.446

**Backend:**
- fastapi
- python-pptx
- huggingface-hub

---

## 🌐 Browsers

✅ Chrome 90+  
✅ Firefox 88+  
✅ Safari 15+  
✅ Edge 90+

---

## 📚 Documentation

- `DEVELOPMENT.md` - Full dev guide
- `FRONTEND_SETUP.md` - React setup
- `REACT_SETUP_COMPLETE.md` - Overview
- `FRONTEND_VERIFICATION.md` - Checklist

---

## 🚢 Deployment

**Frontend (Choose one):**
- Vercel: `vercel` (recommended)
- Netlify: Connect GitHub
- Docker: `docker build .`

**Backend:**
- Cloud Run, Lambda, Heroku, VPS

---

## 💾 Data Persistence

**Saved:**
- Chat history (in-memory per session)
- Generated .pptx files (in project root)

**Not saved:**
- Session data (lost on refresh)
- Slides preview (recalculated)

---

## ⏱️ Performance

- Dev server HMR: ~100ms
- API stream: Real-time (NDJSON)
- Build size: ~300KB gzipped
- First load: ~2s

---

## 🔒 Security

✅ CORS enabled  
✅ API key in .env  
✅ No hardcoded secrets  
✅ HTTPS recommended for production  

---

## 📞 Ports

- Frontend: `localhost:5173`
- Backend: `127.0.0.1:8000`
- Backend Docs: `127.0.0.1:8000/docs`

---

## 📋 TODO for First Run

- [ ] Create `.env` with HuggingFace key
- [ ] Run `quick-start.ps1` (or start manually)
- [ ] Test with "Baahubali movie"
- [ ] Verify PowerPoint download
- [ ] Open PowerPoint file
- [ ] Read DEVELOPMENT.md
- [ ] Customize theme (optional)

---

## 🎨 CSS Variables

Edit `web_app/src/index.css`:
```css
--bg-main: #0f0f0f;           /* Main background */
--accent-blue: #3b82f6;       /* Primary color */
--accent-purple: #a855f7;     /* Secondary color */
--text-main: #ffffff;         /* Main text */
```

---

**Last Updated:** Today  
**Status:** ✅ Ready to Use  
**Next:** `.\quick-start.ps1`
