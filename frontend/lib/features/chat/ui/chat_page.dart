import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/constants/app_constants.dart';
import '../../../core/theme/app_theme.dart';
import '../../download/download_button.dart';
import '../../napkin_view/napkin_card.dart';
import '../../ppt_preview/ppt_preview_section.dart';
import '../controllers/chat_controller.dart';
import '../models/chat_message.dart';
import '../widgets/chat_input_bar.dart';
import '../widgets/chat_sidebar.dart';
import '../widgets/empty_state.dart';
import '../widgets/loading_shimmer.dart';
import '../widgets/message_bubble.dart';
import '../widgets/typing_dots.dart';

class ChatPage extends ConsumerStatefulWidget {
  const ChatPage({super.key});

  @override
  ConsumerState<ChatPage> createState() => _ChatPageState();
}

class _ChatPageState extends ConsumerState<ChatPage> {
  final TextEditingController _inputController = TextEditingController();
  final ScrollController _scrollController = ScrollController();
  int _messageCount = 0;

  @override
  void dispose() {
    _inputController.dispose();
    _scrollController.dispose();
    super.dispose();
  }

  void _onSend() {
    final text = _inputController.text;
    _inputController.clear();
    ref.read(chatControllerProvider.notifier).sendMessage(text);
  }

  void _scrollToBottom() {
    if (!_scrollController.hasClients) {
      return;
    }
    _scrollController.animateTo(
      _scrollController.position.maxScrollExtent + 220,
      duration: const Duration(milliseconds: 280),
      curve: Curves.easeOutCubic,
    );
  }

  @override
  Widget build(BuildContext context) {
    final state = ref.watch(chatControllerProvider);
    final controller = ref.read(chatControllerProvider.notifier);
    final messages = state.selectedThread.messages;

    if (_messageCount != messages.length || state.isLoading) {
      _messageCount = messages.length;
      WidgetsBinding.instance.addPostFrameCallback((_) => _scrollToBottom());
    }

    return LayoutBuilder(
      builder: (context, constraints) {
        final isMobile = constraints.maxWidth < AppConstants.mobileBreakpoint;

        final content = _MainPanel(
          isLoading: state.isLoading,
          messages: messages,
          notesAvailable: state.latestNotes.isNotEmpty,
          slidesAvailable: state.latestSlides.isNotEmpty,
          animatedMessageId: state.animatedMessageId,
          inputController: _inputController,
          scrollController: _scrollController,
          onSend: _onSend,
          notesWidget: NapkinCard(notes: state.latestNotes),
          previewWidget: PptPreviewSection(slides: state.latestSlides),
          downloadWidget: DownloadPptButton(enabled: state.latestSlides.isNotEmpty),
        );

        if (isMobile) {
          return Scaffold(
            appBar: AppBar(
              backgroundColor: AppTheme.panel,
              title: const Text('Agentic PPT AI'),
            ),
            drawer: Drawer(
              backgroundColor: AppTheme.panel,
              child: SafeArea(
                child: ChatSidebar(
                  threads: state.threads,
                  selectedThreadId: state.selectedThreadId,
                  onSelectThread: (id) {
                    Navigator.of(context).pop();
                    controller.selectThread(id);
                  },
                  onCreateThread: () {
                    Navigator.of(context).pop();
                    controller.createNewChat();
                  },
                ),
              ),
            ),
            body: content,
          );
        }

        return Scaffold(
          body: Row(
            children: <Widget>[
              ChatSidebar(
                threads: state.threads,
                selectedThreadId: state.selectedThreadId,
                onSelectThread: controller.selectThread,
                onCreateThread: controller.createNewChat,
              ),
              Expanded(child: content),
            ],
          ),
        );
      },
    );
  }
}

class _MainPanel extends StatelessWidget {
  const _MainPanel({
    required this.isLoading,
    required this.messages,
    required this.notesAvailable,
    required this.slidesAvailable,
    required this.animatedMessageId,
    required this.inputController,
    required this.scrollController,
    required this.onSend,
    required this.notesWidget,
    required this.previewWidget,
    required this.downloadWidget,
  });

  final bool isLoading;
  final List<ChatMessage> messages;
  final bool notesAvailable;
  final bool slidesAvailable;
  final String? animatedMessageId;
  final TextEditingController inputController;
  final ScrollController scrollController;
  final VoidCallback onSend;
  final Widget notesWidget;
  final Widget previewWidget;
  final Widget downloadWidget;

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: <Color>[Color(0xFF0E1117), Color(0xFF0A0D13)],
        ),
      ),
      child: Column(
        children: <Widget>[
          Expanded(
            child: ListView(
              controller: scrollController,
              padding: const EdgeInsets.fromLTRB(16, 18, 16, 12),
              children: <Widget>[
                if (messages.isEmpty) const EmptyChatState(),
                ...messages.map(
                  (message) => MessageBubble(
                    message: message,
                    animateText: message.id == animatedMessageId,
                  ),
                ),
                if (isLoading) ...<Widget>[
                  const SizedBox(height: 6),
                  const Align(
                    alignment: Alignment.centerLeft,
                    child: Card(
                      child: Padding(
                        padding: EdgeInsets.all(12),
                        child: TypingDots(),
                      ),
                    ),
                  ),
                  const SizedBox(height: 10),
                  const LoadingShimmer(),
                ],
                if (notesAvailable) ...<Widget>[
                  const SizedBox(height: 18),
                  notesWidget,
                ],
                if (slidesAvailable) ...<Widget>[
                  const SizedBox(height: 12),
                  previewWidget,
                  const SizedBox(height: 12),
                  Align(alignment: Alignment.centerLeft, child: downloadWidget),
                ],
                const SizedBox(height: 16),
              ],
            ),
          ),
          Container(
            decoration: BoxDecoration(
              color: Colors.black.withValues(alpha: 0.18),
              border: Border(
                top: BorderSide(color: Colors.white.withValues(alpha: 0.08)),
              ),
            ),
            child: ChatInputBar(
              controller: inputController,
              onSend: onSend,
              isLoading: isLoading,
            ),
          ),
        ],
      ),
    );
  }
}
