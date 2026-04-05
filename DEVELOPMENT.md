# Development Guide - Agentic PPT AI

This guide provides detailed instructions for developing and running the Agentic PPT AI application.

## Project Structure

```
agentic-ppt-ai/
├── backend/                  # Python FastAPI server
│   ├── app.py               # FastAPI entry point
│   ├── orchestrator.py       # Multi-agent pipeline
│   ├── agents.py             # LLM agent implementations
│   ├── export.py             # PowerPoint generation
│   ├── validator.py          # Content validation
│   ├── config.py             # Configuration & env vars
│   └── assets/               # Generated images
├── web_app/                  # React + TypeScript frontend
│   ├── src/
│   │   ├── App.tsx           # Main app component
│   │   ├── components/       # React components
│   │   ├── services/         # API integration
│   │   └── main.tsx          # Entry point
│   ├── package.json
│   ├── vite.config.ts        # Vite configuration
│   └── tsconfig.json
├── requirements.txt          # Python dependencies
├── .env                      # Environment variables
└── .gitignore               # Git ignore rules
```

## Prerequisites

- **Python 3.8+** (recommended: 3.11+)
- **Node.js 18+** and npm 9+
- **HuggingFace API Key** (free tier available)

## Backend Setup

### 1. Create Virtual Environment

```bash
# Windows
python -m venv venv
.\\venv\\Scripts\\activate

# Linux/macOS
python3 -m venv venv
source venv/bin/activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure Environment Variables

Create or edit `.env` in the project root:

```env
HUGGINGFACE_API_KEY=hf_your_token_here
```

Get your free HuggingFace token: https://huggingface.co/settings/tokens

### 4. Run Backend Server

```bash
uvicorn backend.app:app --reload
```

Server runs on `http://127.0.0.1:8000`

**Endpoints:**
- `POST /generate` - Stream presentation generation with NDJSON format
- `GET /download/{filename}` - Download generated PowerPoint files

## Frontend Setup

### 1. Install Dependencies

```bash
cd web_app
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Frontend runs on `http://localhost:5173` (or shown in terminal)

## Development Workflow

### Full Stack Development

**Terminal 1 - Backend:**
```bash
# From project root
uvicorn backend.app:app --reload
```

**Terminal 2 - Frontend:**
```bash
cd web_app
npm run dev
```

Then open `http://localhost:5173` in your browser.

### Backend Development

Key files for extending functionality:

- **`backend/agents.py`** - Add new LLM agents or modify prompt templates
- **`backend/orchestrator.py`** - Change multi-agent pipeline logic
- **`backend/export.py`** - Customize PowerPoint styling/layout
- **`backend/validator.py`** - Add content validation rules
- **`backend/config.py`** - Add new configuration parameters

### Frontend Development

Key files for extending UI:

- **`web_app/src/App.tsx`** - Main application logic and state management
- **`web_app/src/components/ChatPanel.tsx`** - Chat messaging interface
- **`web_app/src/components/PresentationPanel.tsx`** - Slide preview display
- **`web_app/src/services/api.ts`** - Backend API integration
- **`web_app/src/index.css`** - Global styles and CSS variables

## API Reference

### POST /generate

Generate a PowerPoint presentation based on a topic.

**Request:**
```json
{
  "prompt": "Baahubali movie"
}
```

**Response:** NDJSON stream of events

```ndjson
{"status": "titles_generated", "titles": ["Title 1", "Title 2"]}
{"status": "slide_generated", "slide": {"title": "Slide 1", "bullets": ["Point 1", "Point 2"], "image_url": "..."}}
{"status": "completed", "filename": "presentation.pptx"}
```

### GET /download/{filename}

Download a generated PowerPoint file.

**Example:**
```
GET /download/Baahubali_movie_Presentation.pptx
```

## Building for Production

### Backend

```bash
# Create production-ready deployment
pip freeze > requirements.txt
```

Then run with production ASGI server:
```bash
gunicorn -w 4 -k uvicorn.workers.UvicornWorker backend.app:app
```

### Frontend

```bash
cd web_app
npm run build
```

Creates optimized build in `web_app/dist/` directory.

## Testing

### Backend Testing

```bash
# Install pytest
pip install pytest pytest-asyncio

# Run tests
pytest backend/
```

### Frontend Testing

```bash
cd web_app
npm run lint
```

## Troubleshooting

### Backend won't start

1. Check Python version: `python --version` (should be 3.8+)
2. Verify venv is activated
3. Check all dependencies installed: `pip list`
4. Ensure HuggingFace API key is valid

### Frontend won't connect to backend

1. Verify backend is running on port 8000
2. Check CORS errors in browser console
3. Ensure frontend uses correct backend URL: `http://127.0.0.1:8000`
4. Check firewall isn't blocking port 8000

### Generated presentations not downloading

1. Check that PowerPoint file was created in project root
2. Verify file permissions
3. Check backend console for export errors

### HuggingFace API errors

1. Verify API key in `.env` is correct
2. Check quota/rate limits on HuggingFace account
3. Ensure API key has necessary permissions
4. Try with test key if available

## Performance Optimization

### Backend
- Use async handlers for I/O operations
- Cache LLM responses when possible
- Optimize image generation parameters
- Monitor memory usage with large presentations

### Frontend
- Lazy load presentation components
- Implement message virtualization for long chats
- Use React.memo for expensive components
- Profile with React DevTools

## Environment Variables

```env
# Required
HUGGINGFACE_API_KEY=your_token_here

# Optional (defaults provided)
# BACKEND_URL=http://127.0.0.1:8000
# PRESENTATION_MAX_SLIDES=10
```

## Common Tasks

### Add a new LLM agent

1. Create function in `backend/agents.py`
2. Add to orchestrator in `backend/orchestrator.py`
3. Handle response in frontend `web_app/src/services/api.ts`

### Customize PowerPoint theme

1. Edit `backend/export.py` - `apply_theme_styling()` function
2. Test with sample prompt
3. Check generated `.pptx` file

### Modify chat UI styling

1. Edit `web_app/src/index.css` for global styles
2. Edit component files for inline styles
3. Use CSS variables (e.g., `var(--accent-blue)`)

## Deployment

### Deploy Backend

Deploy FastAPI app to:
- Heroku
- AWS Lambda (with adapter)
- Google Cloud Run
- Azure App Service
- DigitalOcean

### Deploy Frontend

Deploy React app to:
- Vercel (recommended)
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Google Firebase Hosting

## Documentation

- FastAPI Docs: http://127.0.0.1:8000/docs (when running)
- React Components: See JSDoc comments in component files
- API Streaming Format: See `web_app/src/services/api.ts`

## Support

For issues or questions:
1. Check error messages in browser console and backend terminal
2. Review logs in `.env` configuration
3. Verify all prerequisites are installed
4. Check HuggingFace API status
