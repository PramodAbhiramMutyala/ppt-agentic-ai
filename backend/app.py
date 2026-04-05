import sys
import os

# Ensure the root project directory is in the Python path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fastapi.responses import StreamingResponse, FileResponse
from backend.orchestrator import generate_presentation_stream
import json

app = FastAPI(title="Agentic PPT AI Server")

# Allow web clients (including the React frontend) to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class GenerateRequest(BaseModel):
    prompt: str

@app.post("/generate")
def generate_ppt(request: GenerateRequest):
    def event_generator():
        for event in generate_presentation_stream(request.prompt):
            yield json.dumps(event) + "\n"
            
    return StreamingResponse(
        event_generator(), 
        media_type="application/x-ndjson",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no"
        }
    )

@app.get("/download/{filename}")
def download_ppt(filename: str):
    file_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), filename)
    if os.path.exists(file_path):
        return FileResponse(file_path, filename=filename, media_type="application/vnd.openxmlformats-officedocument.presentationml.presentation")
    return {"error": "File not found"}

if __name__ == "__main__":
    import uvicorn
    # Make sure we run on 8000 so the frontend can hit it
    uvicorn.run(app, host="127.0.0.1", port=8000)
