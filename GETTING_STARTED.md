# Getting Started - Visual Guide

## 🎯 Your Project is Ready!

Your **Agentic PPT AI** application has been successfully converted from Flutter to React.

---

## 🚀 Quick Start (60 seconds)

### Step 1: Open PowerShell in Project Root

```powershell
cd D:\DIET\Calibo AI\Projects\agentic-ppt-ai
```

### Step 2: Run Quick-Start Script

```powershell
.\quick-start.ps1
```

### Step 3: Select Option 3

```
What would you like to start?

1. Backend Server (FastAPI on port 8000)
2. Frontend Server (React on port 5173)
3. Both (Backend in new window, Frontend in current) ← SELECT THIS
4. Exit

Enter your choice (1-4): 3
```

### Step 4: Open Browser

```
http://localhost:5173
```

### Step 5: Test It

Type: **"Baahubali movie"** and press Enter

---

## 📊 What's Happening

```
Browser (localhost:5173)
    ↓
React Frontend (web_app/)
    ↓
API Call (NDJSON streaming)
    ↓
FastAPI Backend (port 8000)
    ↓
LLM Agents (HuggingFace)
    ↓
Image Generation (SDXL)
    ↓
PowerPoint Creation
    ↓
Stream Response
    ↓
Display Slides + Download Link
```

---

## 📁 Project Files

### Documents to Read (In Order)

1. **`QUICK_REFERENCE.md`** ← Start here (5 min)
   - Quick lookup for commands
   - Common issues and fixes
   - Port information

2. **`REACT_SETUP_COMPLETE.md`** ← Overview (10 min)
   - What was done
   - Technology stack
   - Quick-start guide

3. **`DEVELOPMENT.md`** ← Full guide (30 min)
   - Complete setup instructions
   - File explanations
   - API reference
   - Troubleshooting

4. **`FRONTEND_SETUP.md`** ← React details (20 min)
   - React architecture
   - Component structure
   - API integration examples
   - Deployment options

### Documents for Reference

- **`FRONTEND_VERIFICATION.md`** - Checklist for manual testing
- **`IMPLEMENTATION_SUMMARY.md`** - What was accomplished
- **`README.md`** - Project overview

---

## 🎨 Architecture Diagram

```
┌─────────────────────────────────────────────────────┐
│                    WEB BROWSER                      │
│              (http://localhost:5173)                │
│  ┌─────────────────────────────────────────────┐   │
│  │      React Frontend (web_app/src/)          │   │
│  │  ┌──────────────────────────────────────┐   │   │
│  │  │  App.tsx (Main Component)            │   │   │
│  │  │  ┌─ Sidebar.tsx (Threads)           │   │   │
│  │  │  ├─ ChatPanel.tsx (Messages)        │   │   │
│  │  │  └─ PresentationPanel.tsx (Slides)  │   │   │
│  │  └──────────────────────────────────────┘   │   │
│  │          ↓ (fetch to API)                    │   │
│  │  services/api.ts (NDJSON Streaming)         │   │
│  └──────────────┬───────────────────────────────┘   │
└─────────────────┼─────────────────────────────────────┘
                  │ (HTTP)
                  ↓
┌─────────────────────────────────────────────────────┐
│              FASTAPI BACKEND                        │
│           (http://127.0.0.1:8000)                   │
│  ┌─────────────────────────────────────────────┐   │
│  │  backend/app.py (FastAPI Server)            │   │
│  │  ├─ POST /generate (NDJSON stream)         │   │
│  │  ├─ GET /download (PowerPoint file)        │   │
│  │  └─ CORSMiddleware (Allow frontend)        │   │
│  │         ↓                                    │   │
│  │  backend/orchestrator.py (Pipeline)        │   │
│  │  ├─ agents.py (LLM: Llama3, Mixtral)       │   │
│  │  ├─ export.py (PowerPoint generation)      │   │
│  │  └─ validator.py (Content validation)      │   │
│  │         ↓                                    │   │
│  │  HuggingFace API                            │   │
│  │  ├─ LLM Models (for text)                  │   │
│  │  └─ SDXL (for images)                      │   │
│  └─────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
                  ↓ (Generated Files)
         Project Root (.pptx files)
```

---

## 🔄 Data Flow Example

### User Types: "Baahubali movie"

```
1. Input Field
   └─ User types "Baahubali movie"
      └─ Clicks Send

2. Frontend (React)
   └─ App.tsx receives input
      └─ Calls generateResponseStream("Baahubali movie")
         └─ api.ts starts fetch POST to /generate
            └─ Backend starts streaming NDJSON

3. Backend Processing
   └─ Orchestrator receives prompt
      └─ Planner agent: Create outline
         └─ Writer agent: Generate slide content
            └─ Image agent: Generate images
               └─ Export: Create PowerPoint
                  └─ Validator: Check content

4. Streaming Events
   └─ {"status":"titles_generated","titles":[...]}
      └─ Frontend receives, updates ChatPanel
   └─ {"status":"slide_generated","slide":{...}}
      └─ Frontend receives, adds to slides[]
         └─ PresentationPanel renders new slide
   └─ {"status":"completed","filename":"...pptx"}
      └─ Download button becomes active

5. User Downloads
   └─ Clicks download button
      └─ GET /download/Baahubali_movie_Presentation.pptx
         └─ File saved to Downloads folder

6. Success!
   └─ Open PowerPoint
      └─ See generated presentation
         └─ Slides with images and content
```

---

## 🛠️ Technology Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.3 | UI Components |
| TypeScript | 5.9 | Type Safety |
| Vite | 5.4 | Build Tool |
| lucide-react | 0.446 | Icons |
| CSS Variables | - | Theming |

### Backend
| Technology | Purpose |
|------------|---------|
| Python 3.8+ | Programming Language |
| FastAPI | Web Framework |
| Uvicorn | ASGI Server |
| python-pptx | PowerPoint Export |
| HuggingFace API | LLM + Images |

---

## 🎮 User Interface

### Chat Panel
```
┌─────────────────────────────────────────┐
│  Agentic PPT AI                    ✨   │
├─────────────────────────────────────────┤
│                                          │
│  What kind of presentation would you    │
│  like to generate today?                │
│  Try "Electric Vehicles" or            │
│  "Baahubali movie"                      │
│                                          │
├─────────────────────────────────────────┤
│ ┌─ User: Baahubali movie              │
│ │ ┌─ AI: Planning presentation logic... │
│ │                                        │
│ │ ┌─ AI: Titles generated!              │
│ │                                        │
│ │ ┌─ AI: Great direction. I've success  │
│ └─────────────────────────────────────   │
├─────────────────────────────────────────┤
│  [Type your topic for presentation... ] │
│                                [Send] ► │
└─────────────────────────────────────────┘
```

### Presentation Panel
```
┌──────────────────────────────────────────┐
│  Generated Deck Preview          10 ▼   │
├──────────────────────────────────────────┤
│                                           │
│  ┌─ Slide 1 ─────┐  ┌─ Slide 2 ─────┐  │
│  │ Baahubali     │  │ Plot Overview  │  │
│  │ • An epic     │  │ • Ancient war  │  │
│  │ • Indian      │  │ • Royal quest  │  │
│  │ • Fantasy     │ ✓│ • Love story   │  │
│  └───────────────┘  └─ Slide 3 ─────┐  │
│                      │ Characters    │  │
│  ┌─ Slide 4 ─────┐   │ • Mahendra   │  │
│  │ Cinematography│   │ • Bhallala   │  │
│  │ • Stunning    │   │ • Devasena   │  │
│  │ • Visuals     │ ✓ └───────────────┘  │
│  └───────────────┘                       │
│                                           │
│  [⬇️ Download Presentation]              │
└──────────────────────────────────────────┘
```

---

## ⚙️ Configuration

### Environment Variables (.env)

```env
# Required - Get free token from HuggingFace
HUGGINGFACE_API_KEY=hf_your_token_here
```

**Get your token:**
1. Visit https://huggingface.co/settings/tokens
2. Click "New token"
3. Name it "agentic-ppt-ai"
4. Copy and paste to .env

### Frontend Configuration

**API URL** - `web_app/src/services/api.ts`
```typescript
const baseUrl = 'http://127.0.0.1:8000';  // Change here for production
```

### Backend Configuration

**Server Port** - `backend/app.py`
```python
uvicorn.run(app, host="127.0.0.1", port=8000)  # Change here if needed
```

---

## 📊 Ports & URLs

| Service | URL | Status |
|---------|-----|--------|
| Backend API | http://127.0.0.1:8000 | ✅ Required |
| Backend Docs | http://127.0.0.1:8000/docs | 📚 Optional |
| Frontend Dev | http://localhost:5173 | ✅ Use this |
| Frontend Prod | https://your-domain.com | 🚀 After deploy |

---

## 🐛 Quick Troubleshooting

### Problem: "Can't connect to backend"

**Check:** Is backend running?
```powershell
# Terminal should show:
# Uvicorn running on http://127.0.0.1:8000
```

**Fix:**
```powershell
# Terminal 1: Backend
.\\venv\\Scripts\\activate
uvicorn backend.app:app --reload
```

### Problem: "npm: command not found"

**Check:** Is Node.js installed?
```powershell
node --version  # Should show v18+
```

**Fix:** Install from https://nodejs.org/

### Problem: "CORS error in console"

**Check:** Does backend have CORSMiddleware?

**Fix:** In `backend/app.py`, add:
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## 📈 Next Steps

### Now (First Run)
```
1. ✅ Run quick-start.ps1
2. ✅ Test with "Baahubali movie"
3. ✅ Verify PowerPoint download
```

### Today (First Day)
```
1. 📖 Read QUICK_REFERENCE.md
2. 🎨 Customize styling (optional)
3. 🧪 Try different prompts
```

### This Week (Development)
```
1. 📖 Read DEVELOPMENT.md
2. 🔧 Modify components as needed
3. 🚀 Deploy frontend to Vercel
4. 🌐 Configure production URL
```

### This Month (Production)
```
1. 📦 Deploy backend (Cloud Run, Lambda, etc)
2. 🔗 Connect frontend to production backend
3. 📊 Set up monitoring
4. 🔐 Enable HTTPS
```

---

## 🎓 Learning Resources

### React Development
- **Official Docs:** https://react.dev
- **Tutorial:** Follow "Learn React" on react.dev
- **TypeScript:** https://www.typescriptlang.org/docs

### FastAPI Development
- **Official Docs:** https://fastapi.tiangolo.com
- **Tutorial:** Check FastAPI documentation
- **Async:** Learn about async/await in Python

### Deployment
- **Vercel (Frontend):** https://vercel.com
- **Netlify (Frontend):** https://netlify.com
- **Google Cloud:** https://cloud.google.com
- **AWS:** https://aws.amazon.com

---

## 📞 Support

### Getting Help

1. **Check Documentation**
   - QUICK_REFERENCE.md - Quick lookup
   - DEVELOPMENT.md - Detailed guide
   - FRONTEND_SETUP.md - React specifics

2. **Check Error Message**
   - Look in browser console (F12)
   - Check terminal output
   - Compare with troubleshooting section

3. **Try Solutions**
   - Restart both servers
   - Clear browser cache
   - Delete node_modules, npm install

### Common Issues

| Error | Solution |
|-------|----------|
| `ERR_NAME_NOT_RESOLVED` | Backend not running on port 8000 |
| `Cannot find module` | Run `npm install` in web_app/ |
| `CORS error` | Add CORSMiddleware to backend |
| `Python version` | Use Python 3.8+ |
| `API key invalid` | Check HuggingFace token in .env |

---

## 🎉 You're All Set!

Your Agentic PPT AI is ready to use. 

**Next action:** Run `.\quick-start.ps1` 🚀

---

**Questions?** See documentation files for detailed explanations.

**Ready to deploy?** Follow DEVELOPMENT.md deployment section.

**Want to customize?** See FRONTEND_SETUP.md styling section.
