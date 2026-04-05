export interface SlideModel {
  title: string;
  points: string[];
}

export interface NapkinNote {
  heading: string;
  bullets: string[];
}

export interface AiResponsePayload {
  chatReply: string;
  notes: NapkinNote[];
  slides: SlideModel[];
  downloadUrl: string | null;
}

export async function* generateResponseStream(prompt: string): AsyncGenerator<AiResponsePayload> {
  const baseUrl = 'http://127.0.0.1:8000';
  const response = await fetch(`${baseUrl}/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt })
  });

  if (!response.body) throw new Error('ReadableStream not yet supported in this browser.');

  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8');
  let currentText = '';

  const notes: NapkinNote[] = [];
  const slides: SlideModel[] = [];
  let chatReply = "Planning presentation logic...";
  let downloadUrl: string | null = null;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    currentText += decoder.decode(value, { stream: true });
    let lines = currentText.split('\n');

    currentText = lines.pop() || ''; // keep the last incomplete chunk

    for (let line of lines) {
      if (!line.trim()) continue;
      
      const data = JSON.parse(line);
      const status = data.status;

      if (status === 'titles_generated') {
        chatReply = "Titles generated! Creating slides and rendering images...";
      } else if (status === 'slide_generated') {
        const s = data.slide;
        const bullets = s.bullets || [];
        slides.push({ title: s.title || '', points: bullets });
        notes.push({ heading: s.title || '', bullets });
      } else if (status === 'completed') {
        chatReply = "Great direction. I've successfully orchestrated your presentation! A physical PowerPoint is ready to be downloaded.";
        if (data.file) {
          downloadUrl = `${baseUrl}/download/${data.file}`;
        }
      }

      yield {
        chatReply,
        notes: [...notes],
        slides: [...slides],
        downloadUrl
      };
    }
  }
}
