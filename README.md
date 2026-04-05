# agentic-ppt-ai
A full-stack, multi-agent AI system that transforms user prompts into structured “napkin-style” notes and automatically generates presentation-ready PowerPoint slides, equipped with an Enterprise Chat UI!

## Architecture

1. **Python AI Backend (FastAPI)**: Handles LLM orchestration, Strict Topic Grounding validation, physical Image Generation via HuggingFace, and Python-PPTX export logic.
2. **React Chat UI (Vite + TypeScript)**: Web client that interfaces with the AI backend and streams presentation generation progress.

---

## 🛠️ Setup Instructions

### 1. Backend Setup

Ensure you have Python installed.

1. **Wait/Activate your Virtual Environment**:
   ```bash
   # Windows
   .\\venv\\Scripts\\activate
   
   # Linux/MacOS
   source venv/bin/activate
   ```

2. **Install Python Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure API Keys**:
   - Open `.env` in the root of the project.
   - Replace the placeholder with your **HuggingFace API Key** (Get free token [here](https://huggingface.co/settings/tokens)).
   - `HUGGINGFACE_API_KEY=hf_YourToken...`

### 2. Frontend Setup (React)

Ensure you have [Node.js](https://nodejs.org/) installed.

Install dependencies:
```bash
cd web_app
npm install
```

---

## 🚀 Running the Full App

Since this is now a bridged Client/Server architecture, you must run both pieces!

### Step 1: Start the AI API Server
Open a terminal and run the backend. This spins up the server on port 8000.
```bash
# Must run from the root project directory!
uvicorn backend.app:app --reload
```

### Step 2: Start the React Presentation UI
Open a **second terminal**, change into the React app directory, and run it.
```bash
cd web_app
npm run dev
```

---

## Output Behavior

When you type a prompt (e.g. "Baahubali movie") into the UI chat:
1. The React UI calls the local Python API.
2. The Orchestrator automatically plans titles, tests valid content, downloads images, and compiles a completely physical PowerPoint `.pptx` slide file right into your project folder.
3. The AI responds dynamically back into the Chat UI confirming it was built, dropping the parsed structured Notes right onto your screen.
