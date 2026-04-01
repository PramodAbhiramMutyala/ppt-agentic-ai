import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../shared/services/mock_ai_service.dart';
import '../models/chat_message.dart';
import '../models/chat_thread.dart';
import '../models/napkin_note.dart';
import '../models/slide_model.dart';

final mockAiServiceProvider = Provider<MockAiService>((ref) => MockAiService());

final chatControllerProvider =
    StateNotifierProvider<ChatController, ChatState>((ref) {
      return ChatController(ref.read(mockAiServiceProvider));
    });

class ChatState {
  const ChatState({
    required this.threads,
    required this.selectedThreadId,
    required this.isLoading,
    required this.latestNotes,
    required this.latestSlides,
    required this.animatedMessageId,
  });

  final List<ChatThread> threads;
  final String selectedThreadId;
  final bool isLoading;
  final List<NapkinNote> latestNotes;
  final List<SlideModel> latestSlides;
  final String? animatedMessageId;

  ChatThread get selectedThread =>
      threads.firstWhere((thread) => thread.id == selectedThreadId);

  ChatState copyWith({
    List<ChatThread>? threads,
    String? selectedThreadId,
    bool? isLoading,
    List<NapkinNote>? latestNotes,
    List<SlideModel>? latestSlides,
    String? animatedMessageId,
    bool clearAnimatedMessageId = false,
  }) {
    return ChatState(
      threads: threads ?? this.threads,
      selectedThreadId: selectedThreadId ?? this.selectedThreadId,
      isLoading: isLoading ?? this.isLoading,
      latestNotes: latestNotes ?? this.latestNotes,
      latestSlides: latestSlides ?? this.latestSlides,
      animatedMessageId: clearAnimatedMessageId
          ? null
          : animatedMessageId ?? this.animatedMessageId,
    );
  }
}

class ChatController extends StateNotifier<ChatState> {
  ChatController(this._mockAiService)
    : super(
        ChatState(
          threads: <ChatThread>[
            ChatThread(
              id: 'thread_0',
              title: 'New Chat',
              messages: const <ChatMessage>[],
              lastUpdated: DateTime.now(),
            ),
          ],
          selectedThreadId: 'thread_0',
          isLoading: false,
          latestNotes: const <NapkinNote>[],
          latestSlides: const <SlideModel>[],
          animatedMessageId: null,
        ),
      );

  final MockAiService _mockAiService;

  void createNewChat() {
    final id = 'thread_${DateTime.now().microsecondsSinceEpoch}';
    final newThread = ChatThread(
      id: id,
      title: 'New Chat',
      messages: const <ChatMessage>[],
      lastUpdated: DateTime.now(),
    );

    state = state.copyWith(
      threads: <ChatThread>[newThread, ...state.threads],
      selectedThreadId: id,
      latestNotes: const <NapkinNote>[],
      latestSlides: const <SlideModel>[],
      clearAnimatedMessageId: true,
    );
  }

  void selectThread(String threadId) {
    final target = state.threads.firstWhere((thread) => thread.id == threadId);

    state = state.copyWith(
      selectedThreadId: threadId,
      latestNotes: target.messages.where((m) => m.sender == MessageSender.ai).isNotEmpty
          ? state.latestNotes
          : const <NapkinNote>[],
      latestSlides: target.messages.where((m) => m.sender == MessageSender.ai).isNotEmpty
          ? state.latestSlides
          : const <SlideModel>[],
      clearAnimatedMessageId: true,
    );
  }

  Future<void> sendMessage(String prompt) async {
    final trimmed = prompt.trim();
    if (trimmed.isEmpty || state.isLoading) {
      return;
    }

    final now = DateTime.now();
    final userMessage = ChatMessage(
      id: 'msg_user_${now.microsecondsSinceEpoch}',
      text: trimmed,
      sender: MessageSender.user,
      createdAt: now,
    );

    final updatedMessages = <ChatMessage>[
      ...state.selectedThread.messages,
      userMessage,
    ];

    final generatedTitle = _deriveTitle(state.selectedThread.title, trimmed);
    _replaceSelectedThread(
      state.selectedThread.copyWith(
        title: generatedTitle,
        messages: updatedMessages,
        lastUpdated: now,
      ),
    );

    state = state.copyWith(isLoading: true, clearAnimatedMessageId: true);

    final payload = await _mockAiService.generateResponse(trimmed);

    final aiMessage = ChatMessage(
      id: 'msg_ai_${DateTime.now().microsecondsSinceEpoch}',
      text: payload.chatReply,
      sender: MessageSender.ai,
      createdAt: DateTime.now(),
    );

    _replaceSelectedThread(
      state.selectedThread.copyWith(
        messages: <ChatMessage>[...state.selectedThread.messages, aiMessage],
        lastUpdated: DateTime.now(),
      ),
    );

    state = state.copyWith(
      isLoading: false,
      latestNotes: payload.notes,
      latestSlides: payload.slides,
      animatedMessageId: aiMessage.id,
    );
  }

  void _replaceSelectedThread(ChatThread nextThread) {
    final threads = state.threads
        .map((thread) => thread.id == nextThread.id ? nextThread : thread)
        .toList(growable: false)
      ..sort((a, b) => b.lastUpdated.compareTo(a.lastUpdated));

    state = state.copyWith(threads: threads, selectedThreadId: nextThread.id);
  }

  String _deriveTitle(String currentTitle, String prompt) {
    if (currentTitle != 'New Chat') {
      return currentTitle;
    }

    final cleaned = prompt.replaceAll(RegExp(r'\s+'), ' ').trim();
    if (cleaned.length <= 36) {
      return cleaned;
    }
    return '${cleaned.substring(0, 33)}...';
  }
}
