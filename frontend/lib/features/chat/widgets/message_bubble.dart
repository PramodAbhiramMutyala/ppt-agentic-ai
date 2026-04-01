import 'dart:async';

import 'package:flutter/material.dart';

import '../../../core/theme/app_theme.dart';
import '../../../core/utils/date_time_formatter.dart';
import '../models/chat_message.dart';

class MessageBubble extends StatelessWidget {
  const MessageBubble({
    super.key,
    required this.message,
    this.animateText = false,
  });

  final ChatMessage message;
  final bool animateText;

  @override
  Widget build(BuildContext context) {
    final isUser = message.sender == MessageSender.user;

    return Align(
      alignment: isUser ? Alignment.centerRight : Alignment.centerLeft,
      child: Container(
        constraints: const BoxConstraints(maxWidth: 760),
        margin: const EdgeInsets.symmetric(vertical: 6),
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
        decoration: BoxDecoration(
          color: isUser ? AppTheme.userBubble : AppTheme.aiBubble,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: Colors.white.withValues(alpha: 0.08)),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            animateText && !isUser
                ? _TypewriterText(text: message.text)
                : Text(message.text),
            const SizedBox(height: 6),
            Text(
              formatHourMinute(message.createdAt),
              style: Theme.of(context).textTheme.labelSmall?.copyWith(
                color: Colors.white.withValues(alpha: 0.6),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _TypewriterText extends StatefulWidget {
  const _TypewriterText({required this.text});

  final String text;

  @override
  State<_TypewriterText> createState() => _TypewriterTextState();
}

class _TypewriterTextState extends State<_TypewriterText> {
  late final ValueNotifier<String> _visibleText = ValueNotifier<String>('');
  Timer? _timer;
  int _index = 0;

  @override
  void initState() {
    super.initState();

    // Render text progressively so the newest AI answer feels alive.
    _timer = Timer.periodic(const Duration(milliseconds: 12), (timer) {
      if (!mounted || _index >= widget.text.length) {
        timer.cancel();
        return;
      }

      _index++;
      _visibleText.value = widget.text.substring(0, _index);
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    _visibleText.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return ValueListenableBuilder<String>(
      valueListenable: _visibleText,
      builder: (context, value, _) => Text(value),
    );
  }
}
