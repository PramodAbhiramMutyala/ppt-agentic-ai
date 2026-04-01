import 'package:flutter/material.dart';

import '../chat/models/slide_model.dart';
import '../../shared/widgets/section_card.dart';

class PptPreviewSection extends StatelessWidget {
  const PptPreviewSection({super.key, required this.slides});

  final List<SlideModel> slides;

  @override
  Widget build(BuildContext context) {
    return SectionCard(
      title: 'PPT Preview',
      child: SizedBox(
        height: 220,
        child: ListView.separated(
          scrollDirection: Axis.horizontal,
          itemCount: slides.length,
          separatorBuilder: (_, __) => const SizedBox(width: 12),
          itemBuilder: (context, index) {
            final slide = slides[index];
            return Container(
              width: 280,
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(14),
                border: Border.all(color: Colors.white.withValues(alpha: 0.12)),
                color: Colors.white.withValues(alpha: 0.02),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  Text(
                    slide.title,
                    style: Theme.of(context).textTheme.titleSmall?.copyWith(
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  const SizedBox(height: 10),
                  ...slide.points.map(
                    (point) => Padding(
                      padding: const EdgeInsets.only(bottom: 8),
                      child: Text('- $point'),
                    ),
                  ),
                ],
              ),
            );
          },
        ),
      ),
    );
  }
}
