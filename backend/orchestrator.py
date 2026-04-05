import sys
import os

# Ensure the root project directory is in the Python path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.agents import generate_titles, generate_bullets, generate_image_query
from backend.validator import validate_topic

def generate_presentation_stream(user_prompt: str):
    """
    Generator flow that yields intermediate slide rendering explicitly
    so UIs can animate slide by slide.
    """
    print(f"=== Starting Presentation Generation for: '{user_prompt}' ===\n")
    titles = generate_titles(user_prompt)
    presentation = []
    
    yield {"status": "titles_generated", "titles": titles}
    
    for attempt_idx, title in enumerate(titles):
        print(f"--- Processing Slide: {title} ---")
        attempt = 1
        bullets = generate_bullets(title, user_prompt, attempt=attempt)
        validated = validate_topic(bullets, user_prompt)
        
        while validated is None and attempt < 3:
            print(f"    [Warning] Validation failed on attempt {attempt}. Retrying...")
            attempt += 1
            bullets = generate_bullets(title, user_prompt, attempt=attempt)
            validated = validate_topic(bullets, user_prompt)
            
        if validated is None:
            print("    [Error] Maximum retries reached. Topic drifted too far.")
            validated = [f"Information about {user_prompt} is being compiled."]
            
        image_query = generate_image_query(title, user_prompt)
        
        assets_dir = os.path.join(os.path.dirname(__file__), "assets")
        os.makedirs(assets_dir, exist_ok=True)
        import re
        safe_title = re.sub(r'\W+', '', title)
        img_path = os.path.join(assets_dir, f"{safe_title}.png")
        from backend.agents import download_slide_image
        final_img_path = download_slide_image(image_query, img_path)
        
        slide_data = {
            "title": title,
            "bullets": validated,
            "image_query": image_query,
            "image_path": final_img_path
        }
        presentation.append(slide_data)
        
        yield {"status": "slide_generated", "slide": slide_data, "index": attempt_idx}
        print(f"    [Success] Slide Content validated and ready.\n")

    print(f"=== Presentation Data Extracted for: '{user_prompt}' ===\n")
    from backend.export import create_presentation
    output_file = create_presentation(user_prompt, presentation)
    print(f"\n[PPT Generator] Successfully generated PowerPoint file: '{output_file}'!")
    
    yield {"status": "completed", "file": output_file}

def generate_presentation(user_prompt: str) -> dict:
    """
    Backward compatible synchronous caller.
    """
    presentation = []
    for item in generate_presentation_stream(user_prompt):
        if item["status"] == "slide_generated":
            presentation.append(item["slide"])
    return presentation

if __name__ == "__main__":
    # Test Run
    final_output = generate_presentation("Baahubali movie")
