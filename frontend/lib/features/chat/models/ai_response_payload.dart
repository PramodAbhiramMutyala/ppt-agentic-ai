import 'napkin_note.dart';
import 'slide_model.dart';

class AiResponsePayload {
  const AiResponsePayload({
    required this.chatReply,
    required this.notes,
    required this.slides,
  });

  final String chatReply;
  final List<NapkinNote> notes;
  final List<SlideModel> slides;
}
