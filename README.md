# Frontend Card Editor

Production-ready frontend built with Next.js App Router and a card-based editing experience.

## Stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- Shadcn-style UI components
- Zustand state management
- Framer Motion animations

## Features

- Fullscreen app layout with:
	- Collapsible left sidebar
	- Center card editor canvas
	- Right contextual controls panel
- Card operations:
	- Add cards
	- Delete cards
	- Drag-and-drop reorder
	- Inline editing
- Card types:
	- TextCard
	- ImageCard
	- BulletCard
	- TwoColumnCard
	- HeroCard
- Floating AI input:
	- Prompt simulation
	- Loading skeleton
	- Structured card generation
- Dark mode toggle
- Keyboard shortcut:
	- `/` adds a new text card when focus is not in an input

## Folder Structure

```text
frontend/
	src/
		app/
			globals.css
			layout.tsx
			page.tsx
		components/
			editor/
				AIInput.tsx
				CardBlock.tsx
				CardEditor.tsx
				Layout.tsx
				Sidebar.tsx
				Toolbar.tsx
			ui/
				button.tsx
				card.tsx
				input.tsx
				textarea.tsx
				theme-provider.tsx
		lib/
			utils.ts
		store/
			editor-store.ts
		types/
			cards.ts
```

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Start dev server:

```bash
npm run dev
```

3. Open http://localhost:3000

## Notes

- UI is responsive for desktop and mobile widths.
- Drag reordering is powered by `framer-motion` `Reorder.Group`.
- Data model is centralized in Zustand under `cards: EditorCard[]`.
