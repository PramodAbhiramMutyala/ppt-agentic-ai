# Agentic PPT AI
Transform any topic into a professionally generated PowerPoint presentation in seconds.

## 🎯 Quick Overview

**Agentic PPT AI** is an intelligent presentation generation system that uses multi-agent AI orchestration to automatically create structured, visually enhanced PowerPoint slides.

- **Input:** A simple topic prompt (e.g., "Baahubali movie", "Quantum Computing")
- **Process:** Multi-agent LLM pipeline plans content, generates slides, downloads images
- **Output:** Professional PowerPoint file ready to use

### Key Features
- 🤖 Multi-agent AI orchestration (planning, writing, image generation)
- 📊 Real-time slide generation streaming
- 🖼️ Automatic image generation for each slide
- 💬 Interactive chat-based interface
- ⚡ Fast generation (typical: 30-60 seconds per presentation)

---

## � Prerequisites

### System Requirements
- **Python:** 3.8+ (get from [python.org](https://www.python.org/))
- **Node.js:** 18+ (get from [nodejs.org](https://nodejs.org/))
- **HuggingFace API Key:** Free token from [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)

### Installation

1. **Clone Repository**
   ```bash
   git clone https://github.com/PramodAbhiramMutyala/ppt-agentic-ai.git
   cd ppt-agentic-ai
   ```

2. **Setup Python Virtual Environment**
   ```bash
   # Windows
   python -m venv venv
   .\venv\Scripts\activate
   
   # Linux/macOS
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install Python Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Setup Environment Variables**
   ```bash
   # Create .env file in project root
   HUGGINGFACE_API_KEY=hf_your_token_here
   ```
   Get your token: https://huggingface.co/settings/tokens

5. **Install Frontend Dependencies**
   ```bash
   cd web_app
   npm install
   ```

---

## 🚀 How to Run

### Quick Start (Windows)
```powershell
.\quick-start.ps1
```
Then select option **3** to start both servers.

### Manual Setup (Any OS)

**Terminal 1 - Start Backend API (port 8000):**
```bash
# From project root
uvicorn backend.app:app --reload
```
You should see: `Uvicorn running on http://127.0.0.1:8000`

**Terminal 2 - Start React Frontend (port 5173):**
```bash
# From project root
cd web_app
npm run dev
```
You should see: `Local: http://localhost:5173/`

### Access Application
Open your browser and go to:
```
http://localhost:5173
```

### Generate Your First Presentation

1. Type a topic in the chat: `"Baahubali movie"` or `"Quantum Computing"`
2. Watch real-time slide generation in the chat
3. Click **Download** when complete
4. Open the PowerPoint file (saved in project root)

---

## 🏗️ Project Structure

```
ppt-agentic-ai/
├── backend/                    # Python FastAPI server
│   ├── app.py                 # Main API entry point
│   ├── orchestrator.py        # Multi-agent pipeline
│   ├── agents.py              # LLM implementations
│   ├── export.py              # PowerPoint generation
│   ├── validator.py           # Content validation
│   └── assets/                # Generated images
│
├── web_app/                   # React + TypeScript frontend
│   ├── src/
│   │   ├── App.tsx           # Main React component
│   │   ├── components/       # UI components
│   │   └── services/api.ts   # Backend API client
│   └── package.json
│
├── .env                       # Environment variables
├── requirements.txt           # Python packages
└── README.md                  # This file
```

---

## 🔧 Tech Stack

**Backend:**
- FastAPI (Python web framework)
- Uvicorn (ASGI server)
- python-pptx (PowerPoint generation)
- HuggingFace API (LLM & image generation)

**Frontend:**
- React 18 (UI framework)
- TypeScript 5.9 (type safety)
- Vite 5.4 (build tool)
- CSS Variables (dark theme)

**API Communication:**
- NDJSON streaming for real-time updates
- CORS enabled for cross-origin requests

---

## 📝 Example Usage

```
User: "Tell me about artificial intelligence in healthcare"

System Response:
1. Planning presentation structure...
2. Generating slide titles...
3. Creating slide content...
4. Downloading images for each slide...
5. Generating PowerPoint file...

Output: AI_in_Modern_Healthcare_Presentation.pptx ✅
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| `ENOENT: no such file or directory, open 'package.json'` | Run `npm install` from `web_app/` directory |
| `Cannot connect to backend` | Ensure backend running on port 8000 |
| `API key invalid` | Verify HuggingFace token in `.env` file |
| `Port already in use` | Change port in backend/app.py or frontend vite.config.ts |
| `npm: command not found` | Install Node.js from nodejs.org |

---

## 📄 License

This project is open source and available under the MIT License.

---

## 🔗 Resources

- **FastAPI Docs:** https://fastapi.tiangolo.com
- **React Docs:** https://react.dev
- **HuggingFace:** https://huggingface.co
- **GitHub:** https://github.com/PramodAbhiramMutyala/ppt-agentic-ai

---

**Ready to generate presentations?** Start with `.\quick-start.ps1` on Windows or follow manual setup above! 🚀
