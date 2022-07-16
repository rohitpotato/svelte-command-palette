# Svelte Command Palette

### Increase your productivity exponentially. 🚀🚀

## Demo

![svelte-command-palette](https://rohit-misc.s3.ap-south-1.amazonaws.com/svelte-command-palette.gif)

## Features

- Fuzzy search powered by fuse.js
- Run actions conditionally
- Super simple API, just define your actions and it just works!
- Advanced conditional actions - decide whether to run your action based on the current state of your command palette
- Access to `paletteStore` , update your update palette store from anywhere to make updates to your command-palette.
- Keyboard shortcuts - define keyboard shortcuts for your actions!

and more

## Installation

Install svelte-command-palette with npm

```bash
  npm install svelte-command-palette
```

## Usage/Examples

```javascript
<script>
    import CommandPalette, { defineActions } from 'svelte-command-palette'

    // define actions using the defineActions API

    const actions = defineActions([
        {
            id: 1,
            title: "Open Svelte Command Palette on github",
            subTitle: 'This opens github in a new tab!",
            onRun: ({ action, storeProps, storeMethods }) => {
                window.open("https://github.com/rohitpotato/svelte-command-palette"),
            },
            shortcut: "Space k"
        }
    ])
</script>

// render your command palette at the root of your application, say _layout.svelte

<CommandPalette {actions} />

```
