import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

HUGGINGFACE_API_KEY = os.getenv("HUGGINGFACE_API_KEY")

if not HUGGINGFACE_API_KEY or HUGGINGFACE_API_KEY == "your_huggingface_api_key_here":
    print("WARNING: HUGGINGFACE_API_KEY is not set or is using the default placeholder in .env")
