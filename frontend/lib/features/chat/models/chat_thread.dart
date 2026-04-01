import 'chat_message.dart';

class ChatThread {
  const ChatThread({
    required this.id,
    required this.title,
    required this.messages,
    required this.lastUpdated,
  });

  final String id;
  final String title;
  final List<ChatMessage> messages;
  final DateTime lastUpdated;

  ChatThread copyWith({
    String? id,
    String? title,
    List<ChatMessage>? messages,
    DateTime? lastUpdated,
  }) {
    return ChatThread(
      id: id ?? this.id,
      title: title ?? this.title,
      messages: messages ?? this.messages,
      lastUpdated: lastUpdated ?? this.lastUpdated,
    );
  }
}
