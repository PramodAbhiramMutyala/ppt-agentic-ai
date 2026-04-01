import '../../core/constants/app_constants.dart';
import '../../features/chat/models/ai_response_payload.dart';
import '../../features/chat/models/napkin_note.dart';
import '../../features/chat/models/slide_model.dart';

class MockAiService {
  Future<AiResponsePayload> generateResponse(String prompt) async {
    await Future<void>.delayed(AppConstants.mockResponseDelay);

    final concisePrompt = prompt.trim();

    return AiResponsePayload(
      chatReply:
          'Great direction. I created a structured storyline with clear sections, speaker-friendly bullets, and a practical slide flow for "$concisePrompt".',
      notes: <NapkinNote>[
        NapkinNote(
          heading: 'Problem Framing',
          bullets: <String>[
            'Define the audience pain point and why it matters now.',
            'Quantify impact with one metric and one real-world example.',
          ],
        ),
        NapkinNote(
          heading: 'Solution Narrative',
          bullets: <String>[
            'Explain the core concept in one sentence.',
            'Show 3 value pillars: speed, quality, and operational scale.',
            'Highlight where AI agents reduce manual handoffs.',
          ],
        ),
        NapkinNote(
          heading: 'Execution Plan',
          bullets: <String>[
            'Phase 1: pilot scope, datasets, and ownership.',
            'Phase 2: rollout KPIs and governance checkpoints.',
          ],
        ),
      ],
      slides: <SlideModel>[
        SlideModel(
          title: 'Slide 1 - Why This Matters',
          points: <String>[
            'Market context and timing',
            'Current friction in existing process',
            'Opportunity statement',
          ],
        ),
        SlideModel(
          title: 'Slide 2 - Proposed Approach',
          points: <String>[
            'Agentic workflow overview',
            'Inputs, orchestration, and outputs',
            'Human-in-the-loop checkpoints',
          ],
        ),
        SlideModel(
          title: 'Slide 3 - Implementation Roadmap',
          points: <String>[
            'Pilot timeline and milestones',
            'Metrics for success',
            'Risk mitigation and next steps',
          ],
        ),
      ],
    );
  }
}
