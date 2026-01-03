# Svelte Command Palette

#### Increase your productivity exponentially. 🚀🚀

A beautiful, accessible, and fully customizable command palette for Svelte 5 applications.

**~2.1KB Minified | ~700B Gzipped**

[![npm version](https://badge.fury.io/js/svelte-command-palette.svg)](https://www.npmjs.com/package/svelte-command-palette)

## Demo

![svelte-command-palette](https://rohit-misc.s3.ap-south-1.amazonaws.com/svelte-command-palette.gif)

## ✨ Features

- 🔍 **Fuzzy Search** - Powered by Fuse.js for intelligent searching
- ⌨️ **Keyboard Shortcuts** - Define custom shortcuts for any action
- 🎨 **Fully Customizable** - Style every element with classes or inline styles
- 📱 **Mobile Responsive** - Bottom sheet UI on mobile devices
- ♿ **Accessible** - Full ARIA support and keyboard navigation
- 🎯 **Conditional Actions** - Run actions based on current state
- 📦 **Action Grouping** - Organize actions into logical groups
- 🔔 **Event Callbacks** - `onOpen`, `onClose`, `onActionSelect` hooks
- 🎭 **Custom Empty State** - Render custom UI when no results found
- 🌙 **Dark Mode Ready** - Built-in dark mode support
- 📝 **TypeScript** - Full type definitions included

## What's New in v2.0

- **Svelte 5 Support** - Fully migrated to Svelte 5 with runes (`$props`, `$state`, `$effect`, `$derived`)
- **Customizable Trigger Shortcut** - Change the default `$mod+k` to any shortcut
- **Component Callbacks** - `onOpen`, `onClose`, `onActionSelect` props
- **Action Icons** - Add icons to your actions
- **Action Grouping** - Group related actions together
- **Custom Empty State** - Provide a custom snippet for empty results
- **Focus Trap** - Keyboard focus stays within the palette
- **Improved Accessibility** - Better ARIA attributes and keyboard handling
- **Type Exports** - Export `action` type for TypeScript users

## Installation

```bash
npm install svelte-command-palette
```

```bash
pnpm add svelte-command-palette
```

```bash
yarn add svelte-command-palette
```

## Quick Start

```svelte
<script>
  import CommandPalette, { defineActions, createStoreMethods } from 'svelte-command-palette';

  const storeMethods = createStoreMethods();

  const actions = defineActions([
    {
      title: 'Go to Dashboard',
      subTitle: 'Navigate to the main dashboard',
      onRun: () => {
        window.location.href = '/dashboard';
      },
      shortcut: '$mod+d',
      keywords: ['home', 'main'],
      group: 'Navigation'
    },
    {
      title: 'Toggle Dark Mode',
      subTitle: 'Switch between light and dark themes',
      onRun: () => {
        document.documentElement.classList.toggle('dark');
      },
      shortcut: '$mod+Shift+d',
      icon: '🌙',
      group: 'Settings'
    },
    {
      title: 'Open GitHub',
      subTitle: 'View source code on GitHub',
      onRun: () => {
        window.open('https://github.com/rohitpotato/svelte-command-palette');
      },
      icon: '📦'
    }
  ]);
</script>

<button onclick={() => storeMethods.openPalette()}>
  Open Command Palette
</button>

<CommandPalette 
  commands={actions}
  placeholder="What would you like to do?"
  shortcut="$mod+k"
  onOpen={() => console.log('Palette opened')}
  onClose={() => console.log('Palette closed')}
  onActionSelect={(action) => console.log('Selected:', action.title)}
/>
```

## API Reference

### CommandPalette Component Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `commands` | `action[]` | `[]` | Array of actions to display |
| `placeholder` | `string` | `"Search for an action..."` | Input placeholder text |
| `shortcut` | `string` | `"$mod+k"` | Keyboard shortcut to open palette |
| `onOpen` | `() => void` | - | Callback when palette opens |
| `onClose` | `() => void` | - | Callback when palette closes |
| `onActionSelect` | `(action) => void` | - | Callback when action is selected |
| `unstyled` | `boolean` | `false` | Disable default styles |
| `emptyState` | `Snippet` | - | Custom empty state content |

### Styling Props

All styling props accept either a class name (`string`) or style object (`Properties`).

| Class Prop | Style Prop | Description |
|------------|------------|-------------|
| `overlayClass` | `overlayStyle` | Backdrop overlay |
| `paletteWrapperInnerClass` | `paletteWrapperInnerStyle` | Main palette container |
| `inputClass` | `inputStyle` | Search input |
| `resultsContainerClass` | `resultsContainerStyle` | Results list container |
| `resultContainerClass` | `resultContainerStyle` | Individual result item |
| `optionSelectedClass` | `optionSelectedStyle` | Active/selected result |
| `titleClass` | `titleStyle` | Result title |
| `subtitleClass` | `subtitleStyle` | Result subtitle |
| `descriptionClass` | `descriptionStyle` | Result description |
| `keyboardButtonClass` | `keyboardButtonStyle` | Keyboard shortcut badges |

### Action API

Define actions using the `defineActions` helper:

```typescript
type action = {
  actionId?: string | number;        // Unique identifier (auto-generated if not provided)
  title: string;                      // Main display text (required)
  subTitle?: string;                  // Secondary text
  description?: string;               // Additional description
  keywords?: string[];                // Search keywords
  shortcut?: string;                  // Keyboard shortcut (e.g., "$mod+k")
  icon?: string;                      // Icon (emoji or string)
  group?: string;                     // Group name for organizing actions
  onRun?: (params) => void;          // Callback when action is executed
  canActionRun?: (params) => boolean; // Conditional execution
};
```

#### `onRun` and `canActionRun` Parameters

```typescript
type onRunParams = {
  action: action;                     // The current action
  storeProps: storeParams;           // Current store state
  storeMethods: StoreMethods;        // Store manipulation methods
};
```

### Store Methods

Access palette controls from anywhere in your app:

```javascript
import { createStoreMethods } from 'svelte-command-palette';

const methods = createStoreMethods();

// Available methods:
methods.openPalette();           // Open the palette
methods.closePalette();          // Close the palette
methods.togglePalette();         // Toggle open/close
methods.resetPaletteStore();     // Reset to initial state
methods.getAllCalledActions();   // Get history of executed actions
methods.storeCalledAction(id);   // Add action to history
methods.revertLastAction(id);    // Remove last action from history
methods.resetActionLog();        // Clear action history
```

### Direct Store Access

For advanced use cases, access the store directly:

```javascript
import { paletteStore } from 'svelte-command-palette';

// Subscribe to changes
paletteStore.subscribe(state => {
  console.log('Palette visible:', state.isVisible);
  console.log('Search text:', state.textInput);
  console.log('Results:', state.results);
});

// Update directly
paletteStore.update(state => ({
  ...state,
  isVisible: true
}));
```

## Examples

### Conditional Actions

```javascript
const actions = defineActions([
  {
    title: 'Admin Panel',
    subTitle: 'Only visible to admins',
    canActionRun: ({ storeProps }) => {
      return storeProps.user?.role === 'admin';
    },
    onRun: () => {
      window.location.href = '/admin';
    }
  }
]);
```

### Action Groups

```javascript
const actions = defineActions([
  { title: 'Dashboard', group: 'Navigation', onRun: () => goto('/') },
  { title: 'Settings', group: 'Navigation', onRun: () => goto('/settings') },
  { title: 'Profile', group: 'User', onRun: () => goto('/profile') },
  { title: 'Logout', group: 'User', onRun: () => signOut() }
]);
```

### Custom Empty State

```svelte
<CommandPalette commands={actions}>
  {#snippet emptyState()}
    <div class="empty-state">
      <p>No results found</p>
      <button onclick={() => createNewAction()}>Create new action</button>
    </div>
  {/snippet}
</CommandPalette>
```

### Custom Styling

```svelte
<CommandPalette
  commands={actions}
  overlayClass="bg-black/50 backdrop-blur-sm"
  paletteWrapperInnerClass="bg-gray-900 rounded-xl shadow-2xl"
  inputClass="bg-transparent text-white placeholder-gray-400"
  resultContainerClass="hover:bg-gray-800 transition-colors"
  optionSelectedClass="bg-blue-600"
  inputStyle={{ fontSize: '18px' }}
/>
```

### Keyboard Shortcuts

Use [tinykeys](https://github.com/jamiebuilds/tinykeys) syntax for shortcuts:

```javascript
const actions = defineActions([
  { title: 'Save', shortcut: '$mod+s', onRun: save },      // Cmd+S / Ctrl+S
  { title: 'Undo', shortcut: '$mod+z', onRun: undo },      // Cmd+Z / Ctrl+Z
  { title: 'Search', shortcut: '$mod+Shift+f', onRun: search }, // Cmd+Shift+F
  { title: 'Help', shortcut: 'F1', onRun: showHelp }       // F1
]);
```

## Keyboard Navigation

| Key | Action |
|-----|--------|
| `Cmd/Ctrl + K` | Open/close palette (customizable) |
| `↑` / `↓` | Navigate through results |
| `Enter` | Execute selected action |
| `Escape` | Close palette |
| `Tab` | Cycle through focusable elements |

## TypeScript

Full TypeScript support with exported types:

```typescript
import type { action, commands, storeParams, ActionId, onRunParams } from 'svelte-command-palette';

const myAction: action = {
  title: 'My Action',
  onRun: ({ action, storeProps, storeMethods }: onRunParams) => {
    console.log(action.title);
  }
};
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting a PR.

```bash
# Clone the repo
git clone https://github.com/rohitpotato/svelte-command-palette.git

# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test

# Run unit tests only
npm run test:unit

# Run E2E tests only
npm run test:e2e
```

## License

MIT © [Rohit Kashyap](https://rohitpotato.vercel.app/)

## Links

- [Documentation](https://svelte-command-palette.vercel.app/docs)
- [GitHub](https://github.com/rohitpotato/svelte-command-palette)
- [npm](https://www.npmjs.com/package/svelte-command-palette)
