import 'package:flutter/material.dart';

class DownloadPptButton extends StatelessWidget {
  const DownloadPptButton({super.key, required this.enabled});

  final bool enabled;

  @override
  Widget build(BuildContext context) {
    return ElevatedButton.icon(
      onPressed: enabled
          ? () {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(
                  content: Text('Mock download started: presentation.pptx'),
                ),
              );
            }
          : null,
      icon: const Icon(Icons.download_rounded),
      label: const Text('Download PPT'),
    );
  }
}
