/**
 * All card variants supported by the editor.
 */
export type CardType = "text" | "image" | "bullet" | "twoColumn" | "hero";

/**
 * Content structure for text cards.
 */
export interface TextCardContent {
  title: string;
  body: string;
}

/**
 * Content structure for image cards.
 */
export interface ImageCardContent {
  title: string;
  imageUrl: string;
  caption: string;
}

/**
 * Content structure for bullet cards.
 */
export interface BulletCardContent {
  title: string;
  items: string[];
}

/**
 * Content structure for two-column cards.
 */
export interface TwoColumnCardContent {
  leftTitle: string;
  leftBody: string;
  rightTitle: string;
  rightBody: string;
}

/**
 * Content structure for hero cards.
 */
export interface HeroCardContent {
  headline: string;
  subheading: string;
  cta: string;
}

/**
 * Union of possible card content payloads.
 */
export type CardContent =
  | TextCardContent
  | ImageCardContent
  | BulletCardContent
  | TwoColumnCardContent
  | HeroCardContent;

/**
 * Core card model rendered by the editor.
 */
export interface EditorCard {
  id: string;
  type: CardType;
  content: CardContent;
}
