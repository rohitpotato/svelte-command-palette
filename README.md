# Svelte Command Palette

### Increase your productivity exponentially. 🚀🚀

## Demo

![svelte-command-palette](https://rohit-misc.s3.ap-south-1.amazonaws.com/svelte-command-palette.gif?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAcaCmFwLXNvdXRoLTEiSDBGAiEArQtcSxpqlkpMiIXIRbzim6ygEdu%2FiWM0JafqMC67%2F%2FMCIQCyrjWfyugvigPDcM3KKLDMpybs7WuY6ia33eTzPtydBCrkAghAEAMaDDg0NzkwMjcyNzUyNCIMU0ZdGeUyXrP3cS%2BAKsECrRS0rQ1645z%2F1SjI2gh2nTd5z4HWvh4VO68TdetQudGZhAvWtAbqUi58xbKG10FtENPhIu%2FRxwOeDOF%2BWxXaEFisWKEcruAG1oo4s%2BMn%2BVGJwgIqNrXAG8XfuSviCT68XXPp2YZEnZ4RzFtxNxpsYfkEghpwtbXjATxmwnADyZQ4cogwScgUxZ7HaJkEm%2BSbEmSfj0nJ1AuY%2F%2BmP7AMHSvVA4ut7MaFtOtOb4jtSamsxmAv6JNeCmceGtAdzxXp0KWahWecXII4dR8fhY8ECygj3hQx23d90XBhmzzJvNW9EZj%2BTwSL4N43kjo4Bf9rDUuHdvs5nXHfYy%2B9tDj0P%2FmxE2A06zc8bq3wRHMa6oS5HCz5i2YdxkmcDo%2Fiwf%2FN%2BmzQyH%2FHkmcSUcu%2FQl7qx0M5lvhK91cujDasj8gOOM6hzMKOKr5YGOrIC8ycy1e2b2krfyhpHtYjRX1MkiOQ25oqZDwOZarY1iwrwNrvc%2FPzZoQvY%2FAFrf8%2BfbRUU6yC5RtJVBOzD8Fc207FethWt%2FLpPEHcB8APtM2wX%2FGFbTVUsNyb4zsTGfdgBdzY6HJbho0%2Fqsy7%2F%2FF0FKgInX3FLec3EFK3t%2BD10%2B6O72yO%2BsseBujEiqpOdnJahnUwycc9b4BQcltw3miOr7LOZUKqebSm8wt4z2VPBsTYTl8PMtfYr1%2BXzhTqTnfkgI3V9aYM4zagE4geh5SsJ5Jw%2FVKP8ueONkSylwupnI01PPRjs9KtYHLU7PIXRooUtbU21iK7JHn%2Fp0FmJEa50EhY30lGsB1ZaOaFO%2B2XzEH%2FYnuNCpiXyveUky9Y0h%2FTfd2bLdlGwLEc8sHRoHUqS7lVe&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220711T064152Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA4K2XQ3VSAZXZYFHE%2F20220711%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=553d6bef29fd1c97022ab3a4db0af5505b9b6d89d925ddf7e3745375588c8f62)

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

<CommandPalette {actions}>

```
