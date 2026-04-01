import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'core/theme/app_theme.dart';
import 'features/chat/ui/chat_page.dart';

void main() {
  runApp(const ProviderScope(child: AgenticPptAiApp()));
}

class AgenticPptAiApp extends StatelessWidget {
  const AgenticPptAiApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Agentic PPT AI',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.darkTheme,
      home: const ChatPage(),
    );
  }
}
