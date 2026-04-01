enum MessageSender { user, ai }

class ChatMessage {
  const ChatMessage({
    required this.id,
    required this.text,
    required this.sender,
    required this.createdAt,
  });

  final String id;
  final String text;
  final MessageSender sender;
  final DateTime createdAt;
}
