---
layout: mds
title: Something
---

### You can define your actions using the `defineActions` API.

#### These actions can be direcly passed to the `<CommandPalette />`

#### Render Command Palette at the root of your application.

#### Example:

```js
  import Command Palette from 'svelte-command-palette';

  <CommandPalette
    actions={defineActions(
      [
        {
			title: 'Go to github',
			subTitle: 'Press to redirect to github',
			description: '1. something going here idk about?',
			onRun: ({ storeProps }) => {
				console.log('do something');
			},
			shortcut: 'G G'
		},
    	{
			title: 'Increment Counter',
			subTitle: 'This will increment the counter',
			description: 'Or press C C to do it form anywhere!',
			onRun: () => {
				incrementCounter();
			},
			shortcut: 'C C'
		},
      ]
    )}
  />
```
