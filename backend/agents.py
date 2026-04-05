def get_planner_prompt(user_prompt: str) -> str:
    return f"""You are a Presentation Planner.

User Topic: {user_prompt}

Task:
Generate 5 slide titles STRICTLY about the given topic.

Rules:
- Every title must directly relate to the topic
- Do NOT generalize
- Do NOT switch domain
- Maintain logical storytelling

Example for Baahubali:
["Introduction to Baahubali", "Storyline Overview", "Main Characters", "Visual Effects and Direction", "Impact on Indian Cinema"]

Output ONLY a Python list of strings.
"""


def get_writer_prompt(user_prompt: str, title: str) -> str:
    return f"""You are a Presentation Content Writer.

Topic: {user_prompt}
Slide Title: {title}

Task:
Generate bullet points ONLY about this topic.

STRICT RULES:
- Write exactly 4 bullets
- Each ≤ 12 words
- MUST stay within topic
- NO generic AI/system content
- NO unrelated examples
- NO questions
- Each bullet must be specific

Example (Baahubali):
- Epic historical fantasy film directed by S. S. Rajamouli
- Story follows rise of Mahendra Baahubali
- Known for grand visuals and battle sequences
- Became one of highest-grossing Indian films

BAD:
- Autonomous systems execute tasks ❌
- AI improves workflows ❌

Output ONLY a Python list of strings.
"""


def get_image_prompt(user_prompt: str, title: str) -> str:
    return f"""Generate image prompt STRICTLY based on topic.

Topic: {user_prompt}
Slide Title: {title}

STRICT RULES:
- Output ONLY the prompt string.
- NO conversational text.
- NO lists or formatting.

Example (Baahubali):
"epic Indian warrior king, cinematic battle scene, royal armor, dramatic lighting"
"""

import ast
import json
import re
from huggingface_hub import InferenceClient
from backend.config import HUGGINGFACE_API_KEY

# Suggested Models dictionary for easy switching (available on free Hugging Face Inference API)
MODELS = {
    # High-quality logic and planning
    "llama3": "meta-llama/Meta-Llama-3-8B-Instruct",
    # Powerful alternative for robust text generation and reasoning
    "mixtral": "mistralai/Mixtral-8x7B-Instruct-v0.1",
    # Efficient open-weight alternative for instruction following
    "gemma": "google/gemma-7b-it"
}

# Pre-select which model to use below
DEFAULT_MODEL = MODELS["llama3"]

# Initialize Client (Note: `model` is passed during the generation function)
client = InferenceClient(token=HUGGINGFACE_API_KEY)

def _generate_text(prompt: str, model_id: str = DEFAULT_MODEL) -> str:
    if not HUGGINGFACE_API_KEY or HUGGINGFACE_API_KEY == "your_huggingface_api_key_here":
        print("    [Warning] Using mock generation. Please set valid HUGGINGFACE_API_KEY in .env")
        return '["Mock Item 1", "Mock Item 2", "Mock Item 3", "Mock Item 4"]'
        
    messages = [{"role": "user", "content": prompt}]
    try:
        response = client.chat_completion(model=model_id, messages=messages, max_tokens=250)
        return response.choices[0].message.content
    except Exception as e:
        print(f"    [Error] LLM Call Failed: {e}")
        return "[]"

def _parse_list(text: str) -> list[str]:
    # Extract list from output just in case the LLM includes code fences
    start = text.find('[')
    end = text.rfind(']') + 1
    if start != -1 and end != -1:
        list_str = text[start:end]
        
        # Try JSON parser (handles unescaped double quotes better if properly formatted)
        try:
            return json.loads(list_str)
        except Exception:
            pass
            
        # Try AST literal eval
        try:
            return ast.literal_eval(list_str)
        except Exception:
            pass
            
        # Regex fallback: forcefully extract quoted strings if all parsers fail
        print("    [Warning] Falling back to regex parser for LLM list output...")
        matches = re.findall(r'"(.*?)"|\'(.*?)\'', list_str)
        extracted = [m[0] or m[1] for m in matches if m[0] or m[1]]
        if extracted:
            return extracted
            
    print("    [Error] Parse Failure: AI did not return a valid list format.")
    return ["Parse Failure: AI did not return a valid list."]

def generate_titles(user_prompt: str) -> list[str]:
    print(f"[Planner Agent] Generating titles for: {user_prompt}")
    prompt = get_planner_prompt(user_prompt)
    output = _generate_text(prompt)
    return _parse_list(output)

def generate_bullets(title: str, user_prompt: str, attempt: int = 1) -> list[str]:
    print(f"[Writer Agent] Generating bullets for: '{title}' (Attempt {attempt})")
    prompt = get_writer_prompt(user_prompt, title)
    output = _generate_text(prompt)
    return _parse_list(output)

def generate_image_query(title: str, user_prompt: str) -> str:
    print(f"[Image Agent] Generating image prompt for: '{title}'")
    prompt = get_image_prompt(user_prompt, title)
    output = _generate_text(prompt)
    return output.strip().strip("\"'").strip("`")

def download_slide_image(image_query: str, save_path: str) -> str:
    print(f"    [Image Builder] Sourcing generated image from HuggingFace API...")
    if not HUGGINGFACE_API_KEY or HUGGINGFACE_API_KEY == "your_huggingface_api_key_here":
        return None
        
    try:
        # Using a highly capable SDXL image model available on the Inference API
        image = client.text_to_image(image_query, model="stabilityai/stable-diffusion-xl-base-1.0")
        image.save(save_path)
        return save_path
    except Exception as e:
        print(f"    [Error] Image Generation API Call Failed: {e}")
        return None
