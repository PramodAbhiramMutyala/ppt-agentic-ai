# React Frontend - Complete Integration Guide

This document details the React frontend setup, API integration, and troubleshooting for the Agentic PPT AI application.

## Frontend Architecture

### Technology Stack

- **React 18.3+** - UI framework
- **TypeScript 5.5+** - Type safety
- **Vite 5.4+** - Development server and build tool
- **lucide-react** - Icon library
- **CSS Variables** - Theming and styling

### Component Structure

```
web_app/src/
├── App.tsx                    # Main app (state management)
├── components/
│   ├── ChatPanel.tsx         # Message display & input
│   ├── PresentationPanel.tsx # Slide preview
│   └── Sidebar.tsx           # Thread management
├── services/
│   └── api.ts                # Backend API client
├── main.tsx                  # React entry point
└── index.css                 # Global styles
```

## Installation

### Prerequisites

```bash
# Check Node.js version (should be 18+)
node --version

# Check npm version (should be 9+)
npm --version
```

### Install Dependencies

```bash
cd web_app
npm install
```

**Installed Packages:**
- `react@18.3.1` - UI library
- `react-dom@18.3.1` - DOM rendering
- `lucide-react@0.446.0` - Icons
- `typescript@5.5.3` - Type checking
- `vite@5.4.1` - Build tool
- `@vitejs/plugin-react@4.3.1` - React plugin
- ESLint configuration for code quality

## Running the Frontend

### Development Mode

```bash
cd web_app
npm run dev
```

**Output:**
```
  VITE v5.4.1  ready in 150 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h + enter to show help
```

Open http://localhost:5173 in your browser.

### Production Build

```bash
cd web_app
npm run build
```

Creates optimized build in `web_app/dist/` directory.

### Preview Production Build

```bash
cd web_app
npm run preview
```

### Linting

```bash
cd web_app
npm run lint
```

## API Integration

### Backend Communication

The frontend communicates with the FastAPI backend via **Server-Sent Events with NDJSON** format.

**File:** `web_app/src/services/api.ts`

### API Endpoint

**POST** `http://127.0.0.1:8000/generate`

**Request:**
```typescript
interface GenerateRequest {
  prompt: string;
}
```

**Response Stream:** NDJSON (newline-delimited JSON)

**Event Types:**

```typescript
interface TitlesGeneratedEvent {
  status: "titles_generated";
  titles: string[];
}

interface SlideGeneratedEvent {
  status: "slide_generated";
  slide: {
    title: string;
    bullets: string[];
    image_url?: string;
  };
}

interface CompletedEvent {
  status: "completed";
  filename: string;
}

interface ErrorEvent {
  status: "error";
  message: string;
}
```

### API Usage Example

```typescript
import { generateResponseStream, AiResponsePayload } from './services/api';

async function generatePresentation(prompt: string) {
  try {
    for await (const payload of generateResponseStream(prompt)) {
      console.log('Received:', payload);
      // Update UI with payload
      // payload.chatReply - AI response text
      // payload.slides - Generated slides
      // payload.notes - Napkin notes
      // payload.downloadUrl - Download link when complete
    }
  } catch (error) {
    console.error('Generation failed:', error);
  }
}
```

## Component Details

### App.tsx - Main Component

**State Management:**
- `threads[]` - Array of chat threads (each thread has messages, slides, notes)
- `selectedThreadId` - Currently active thread
- `input` - User input text
- `isLoading` - Load state during generation

**Key Functions:**
- `handleSend()` - Sends prompt to backend
- `updateThread()` - Updates thread state
- `handleNewChat()` - Creates new thread

### ChatPanel.tsx - Message Display

**Props:**
```typescript
interface ChatPanelProps {
  messages: Message[];
  isLoading: boolean;
  input: string;
  setInput: (text: string) => void;
  onSend: () => void;
}
```

**Features:**
- Auto-scroll to latest message
- User/AI message differentiation
- Loading indicator with typing animation
- Input field with Enter key support

### PresentationPanel.tsx - Slide Preview

**Props:**
```typescript
interface PresentationPanelProps {
  slides: SlideModel[];
  notes: NapkinNote[];
  downloadUrl: string | null;
}
```

**Features:**
- Grid display of generated slides
- Hover animations
- Download button
- Empty state messaging

### Sidebar.tsx - Thread Management

**Features:**
- New chat button
- Thread list
- Thread switching
- Thread deletion (optional)

## Styling System

### CSS Variables

**File:** `web_app/src/index.css`

```css
:root {
  --bg-main: #0f0f0f;           /* Main background */
  --bg-panel: #1a1a1a;          /* Panel background */
  --bg-chat: #111111;           /* Chat panel background */
  --text-main: #ffffff;         /* Main text */
  --text-muted: #888888;        /* Muted text */
  --accent-blue: #3b82f6;       /* Primary accent */
  --accent-purple: #a855f7;     /* Secondary accent */
  --border-color: #333333;      /* Border color */
}
```

### Theming

Change colors by modifying CSS variables in `index.css`. All components use these variables for consistency.

## Troubleshooting

### Frontend Won't Start

**Error:** `Command not found: npm`

**Solution:**
1. Install Node.js from https://nodejs.org/
2. Restart terminal
3. Verify: `npm --version`

**Error:** `Cannot find module 'react'`

**Solution:**
```bash
cd web_app
rm -rf node_modules package-lock.json
npm install
```

### Can't Connect to Backend

**Error:** `Failed to fetch from http://127.0.0.1:8000`

**Checklist:**
1. ✅ Backend is running: `python backend/app.py` should show "Uvicorn running"
2. ✅ Backend port is 8000: Check in backend/app.py
3. ✅ Frontend uses correct URL: Check in web_app/src/services/api.ts line ~16
4. ✅ CORS is enabled: Check backend/app.py has CORSMiddleware

**Solution:**
```bash
# Terminal 1 - Backend
uvicorn backend.app:app --reload

# Terminal 2 - Frontend
cd web_app
npm run dev
```

### CORS Errors in Console

**Error:** `Access to XMLHttpRequest blocked by CORS`

**Solution:**
Verify backend has CORS enabled:

```python
# backend/app.py should have:
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Streaming Response Not Working

**Error:** `Error: ReadableStream not yet supported`

**Solution:**
1. Use modern browser (Chrome, Firefox, Safari, Edge)
2. Check browser console for errors
3. Verify backend returns `content-type: application/x-ndjson`

### React Component Errors

**Error:** `Cannot read property 'map' of undefined`

**Solution:**
Add null checks in component props:

```typescript
// Before
{messages.map(m => <div>{m.text}</div>)}

// After
{messages?.map(m => <div>{m.text}</div>)}
```

### npm install Fails

**Error:** `npm ERR! 404 Not Found`

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Hot Module Replacement (HMR) Not Working

**Error:** `WebSocket connection to ws://localhost:5173/__vite_hmr` failed

**Solution:**
1. Clear browser cache
2. Hard refresh: Ctrl+Shift+R (or Cmd+Shift+R on Mac)
3. Restart dev server

### Build Fails

**Error:** `error TS2307: Cannot find module`

**Solution:**
```bash
# Ensure TypeScript is installed
npm install typescript --save-dev

# Rebuild
npm run build
```

## Performance Tips

### Development

- Use React DevTools browser extension to profile components
- Monitor component re-renders
- Use `React.memo()` for expensive components
- Lazy load components with `React.lazy()`

### Production

- Run `npm run build` to create optimized bundle
- Analyze bundle size: `npm install -D rollup-plugin-visualizer`
- Enable gzip compression on server
- Use CDN for static assets

## Environment Configuration

### Development

The frontend automatically connects to `http://127.0.0.1:8000` (backend).

To change backend URL, edit `web_app/src/services/api.ts`:

```typescript
const baseUrl = 'http://127.0.0.1:8000'; // Change this
```

### Production

For production deployment, use environment variables:

**Create `.env.production`:**
```env
VITE_BACKEND_URL=https://api.example.com
```

**Update api.ts:**
```typescript
const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:8000';
```

Build with: `npm run build`

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Netlify

1. Push to GitHub
2. Connect repo to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`

### AWS S3 + CloudFront

```bash
npm run build
aws s3 sync dist/ s3://my-bucket/
```

### Docker

**Dockerfile:**
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY web_app/package*.json ./
RUN npm install
COPY web_app .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## API Response Handling

### Successful Stream Response

Client receives NDJSON events:

```ndjson
{"status":"titles_generated","titles":["Title 1","Title 2"]}
{"status":"slide_generated","slide":{"title":"Slide 1","bullets":["Point 1"]}}
{"status":"completed","filename":"presentation.pptx"}
```

### Error Response

Backend returns error:

```json
{
  "status": "error",
  "message": "API rate limit exceeded"
}
```

Frontend displays error in chat.

## Testing

### Unit Tests (Optional Setup)

```bash
npm install -D vitest @testing-library/react

# Create test file
echo "" > src/App.test.tsx

# Run tests
npm run test
```

### Manual Testing Checklist

- [ ] Frontend loads without errors
- [ ] Can type in input field
- [ ] Submit button sends request
- [ ] Receives streaming response
- [ ] Slides display correctly
- [ ] Download link works
- [ ] New chat creates thread
- [ ] Thread switching works
- [ ] No console errors

## Advanced Configuration

### Vite Configuration

**File:** `web_app/vite.config.ts`

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Add options:
  server: {
    port: 5173,
    strictPort: false,
  }
})
```

### TypeScript Configuration

**File:** `web_app/tsconfig.json`

- Strict mode enabled
- Module resolution: ESNext
- Target: ES2020

## Common Questions

**Q: How often does React DevTools Extension update?**
A: Real-time during development with HMR

**Q: Can I use React Router for multiple pages?**
A: Yes, install `react-router-dom` and update App.tsx

**Q: How do I add more styling frameworks?**
A: Install Tailwind CSS: `npm install -D tailwindcss` and configure

**Q: Can I use TypeScript strict mode?**
A: Yes, enable in `tsconfig.json`: `"strict": true`

## Support

For React/Vite issues:
- React Docs: https://react.dev
- Vite Docs: https://vitejs.dev
- Socket Errors: Check browser console network tab

For API integration:
- See Backend DEVELOPMENT.md
- Check FastAPI streaming format
- Verify NDJSON parsing in services/api.ts
