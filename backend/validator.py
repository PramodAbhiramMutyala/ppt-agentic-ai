def validate_topic(bullets: list[str], topic: str) -> list[str] | None:
    """
    Validates that the generated bullets are focused strictly on the provided topic.
    Returns the validated bullets if sufficient, or None to force regeneration.
    """
    topic_words = topic.lower().split()
    
    valid = []
    for b in bullets:
        # Check if any topic word is present in the bullet
        if any(word in b.lower() for word in topic_words):
            valid.append(b)
            
    # At least two valid bullets required for acceptance
    if len(valid) < 2:
        return None  # force regeneration
        
    return valid
