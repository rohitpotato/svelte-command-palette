<script lang="ts">
	const themeObjectExample = `<script lang="ts">
  import { writable } from 'svelte/store';
  
  // Create a theme store
  const isDark = writable(true);
  
  // Define theme configurations
  const themes = {
    dark: {
      inputStyle: { 
        background: '#1f2937', 
        color: '#f9fafb',
        border: '1px solid #374151'
      },
      paletteWrapperInnerStyle: { 
        background: '#1f2937',
        boxShadow: '0 25px 50px rgba(0,0,0,0.5)'
      },
      resultsContainerStyle: { background: '#1f2937' },
      resultContainerStyle: { borderRadius: '8px' },
      optionSelectedStyle: { background: '#374151' },
      titleStyle: { color: '#f9fafb' },
      subtitleStyle: { color: '#9ca3af' },
      keyboardButtonStyle: { 
        background: '#374151', 
        color: '#9ca3af',
        border: '1px solid #4b5563'
      }
    },
    light: {
      inputStyle: { 
        background: '#ffffff', 
        color: '#111827',
        border: '1px solid #e5e7eb'
      },
      paletteWrapperInnerStyle: { 
        background: '#ffffff',
        boxShadow: '0 25px 50px rgba(0,0,0,0.15)'
      },
      resultsContainerStyle: { background: '#ffffff' },
      resultContainerStyle: { borderRadius: '8px' },
      optionSelectedStyle: { background: '#f3f4f6' },
      titleStyle: { color: '#111827' },
      subtitleStyle: { color: '#6b7280' },
      keyboardButtonStyle: { 
        background: '#f3f4f6', 
        color: '#6b7280',
        border: '1px solid #e5e7eb'
      }
    }
  };
  
  $: currentTheme = $isDark ? themes.dark : themes.light;
<\/script>

<CommandPalette
  commands={actions}
  {...currentTheme}
/>`;

	const linearTheme = `// Linear-inspired theme
const linearTheme = {
  overlayStyle: {
    background: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(8px)'
  },
  paletteWrapperInnerStyle: {
    background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px'
  },
  inputStyle: {
    background: 'transparent',
    color: '#ffffff',
    fontSize: '18px'
  },
  optionSelectedStyle: {
    background: 'rgba(99, 102, 241, 0.15)',
    borderLeft: '2px solid #6366f1'
  }
};`;

	const githubTheme = `// GitHub-inspired theme
const githubTheme = {
  overlayStyle: {
    background: 'rgba(27, 31, 36, 0.5)'
  },
  paletteWrapperInnerStyle: {
    background: '#ffffff',
    border: '1px solid #d0d7de',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(140, 149, 159, 0.2)'
  },
  inputStyle: {
    background: '#f6f8fa',
    border: '1px solid #d0d7de',
    borderRadius: '6px',
    padding: '8px 12px'
  },
  optionSelectedStyle: {
    background: '#f6f8fa'
  },
  titleStyle: {
    color: '#24292f',
    fontWeight: '600'
  }
};`;
</script>

<h1>Theming</h1>

<p class="lead">
	Create beautiful, branded command palettes with full theming support.
	Switch between themes dynamically based on user preference.
</p>

<h2>Theme Object Pattern</h2>

<p>The recommended approach is to create theme objects and spread them:</p>

<div class="code-block">
	<div class="code-block-header">
		<div class="dots">
			<span class="dot"></span>
			<span class="dot"></span>
			<span class="dot"></span>
		</div>
		<span>Theme Object Pattern</span>
	</div>
	<pre><code>{themeObjectExample}</code></pre>
</div>

<h2>Theme Presets</h2>

<p>Here are some ready-to-use theme inspirations:</p>

<h3>Linear-Inspired Theme</h3>

<div class="code-block">
	<div class="code-block-header">
		<div class="dots">
			<span class="dot"></span>
			<span class="dot"></span>
			<span class="dot"></span>
		</div>
		<span>Linear Theme</span>
	</div>
	<pre><code>{linearTheme}</code></pre>
</div>

<h3>GitHub-Inspired Theme</h3>

<div class="code-block">
	<div class="code-block-header">
		<div class="dots">
			<span class="dot"></span>
			<span class="dot"></span>
			<span class="dot"></span>
		</div>
		<span>GitHub Theme</span>
	</div>
	<pre><code>{githubTheme}</code></pre>
</div>

<h2>CSS Variables</h2>

<p>You can also theme using CSS variables for a more declarative approach:</p>

<div class="code-block">
	<div class="code-block-header">
		<div class="dots">
			<span class="dot"></span>
			<span class="dot"></span>
			<span class="dot"></span>
		</div>
		<span>CSS Variables</span>
	</div>
	<pre><code>{`:root {
  --cp-bg: #1f2937;
  --cp-text: #f9fafb;
  --cp-border: #374151;
  --cp-accent: #6366f1;
}

.light {
  --cp-bg: #ffffff;
  --cp-text: #111827;
  --cp-border: #e5e7eb;
  --cp-accent: #4f46e5;
}`}</code></pre>
</div>

<h2>Tailwind Integration</h2>

<p>Use Tailwind classes directly for rapid theming:</p>

<div class="code-block">
	<div class="code-block-header">
		<div class="dots">
			<span class="dot"></span>
			<span class="dot"></span>
			<span class="dot"></span>
		</div>
		<span>Tailwind Classes</span>
	</div>
	<pre><code>{`<CommandPalette
  commands={actions}
  overlayClass="bg-black/50 backdrop-blur-sm"
  paletteWrapperInnerClass="bg-white dark:bg-gray-900 rounded-xl shadow-2xl"
  inputClass="bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500"
  resultContainerClass="hover:bg-gray-100 dark:hover:bg-gray-800"
  optionSelectedClass="bg-indigo-50 dark:bg-indigo-900/30"
/>`}</code></pre>
</div>

<style>
	.lead {
		font-size: 1.125rem;
		color: var(--color-text-secondary);
		margin-bottom: var(--space-xl);
	}
</style>

