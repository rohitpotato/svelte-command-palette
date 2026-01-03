<script lang="ts">
	const basicExample = `<script lang="ts">
  import CommandPalette, { defineActions } from '$lib';

  const actions = defineActions([
    {
      title: 'Go to Dashboard',
      subTitle: 'Navigate to the main dashboard',
      icon: '🏠',
      onRun: () => goto('/dashboard'),
      shortcut: 'G D'
    },
    {
      title: 'Toggle Theme',
      subTitle: 'Switch between light and dark mode',
      icon: '🎨',
      group: 'Preferences',
      onRun: () => toggleTheme(),
      shortcut: 'T T'
    }
  ]);
<\/script>

<CommandPalette
  commands={actions}
  placeholder="Search actions..."
  shortcut="$mod+k"
  onOpen={() => console.log('opened')}
  onClose={() => console.log('closed')}
/>`;

	const styledExample = `<CommandPalette
  commands={actions}
  unstyled={false}
  placeholder="What do you want to do?"
  
  <!-- Style classes (Tailwind, etc.) -->
  inputClass="bg-gray-100 dark:bg-gray-800"
  resultContainerClass="hover:bg-blue-50"
  
  <!-- Or inline styles -->
  inputStyle={{ background: '#1a1a24', color: '#fff' }}
  overlayStyle={{ backdropFilter: 'blur(8px)' }}
  optionSelectedStyle={{ background: 'rgba(99, 102, 241, 0.1)' }}
/>`;
</script>

<h1>CommandPalette API</h1>

<p class="lead">
	The <code>CommandPalette</code> component is the main entry point for the command palette. 
	It handles rendering, keyboard navigation, and action execution.
</p>

<h2>Basic Usage</h2>

<p>Import and render the CommandPalette at the root of your application:</p>

<div class="code-block">
	<div class="code-block-header">
		<div class="dots">
			<span class="dot"></span>
			<span class="dot"></span>
			<span class="dot"></span>
		</div>
		<span>+page.svelte</span>
	</div>
	<pre><code>{basicExample}</code></pre>
</div>

<h2>Props</h2>

<div class="table-wrapper">
	<table>
		<thead>
			<tr>
				<th>Prop</th>
				<th>Type</th>
				<th>Default</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>commands</code></td>
				<td><code>action[]</code></td>
				<td><code>[]</code></td>
				<td>Array of action objects to display in the palette</td>
			</tr>
			<tr>
				<td><code>placeholder</code></td>
				<td><code>string</code></td>
				<td><code>"Search..."</code></td>
				<td>Placeholder text for the search input</td>
			</tr>
			<tr>
				<td><code>shortcut</code></td>
				<td><code>string</code></td>
				<td><code>"$mod+k"</code></td>
				<td>Keyboard shortcut to toggle the palette</td>
			</tr>
			<tr>
				<td><code>unstyled</code></td>
				<td><code>boolean</code></td>
				<td><code>false</code></td>
				<td>Disable all default styles</td>
			</tr>
		</tbody>
	</table>
</div>

<h2>Event Callbacks</h2>

<div class="table-wrapper">
	<table>
		<thead>
			<tr>
				<th>Prop</th>
				<th>Type</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>onOpen</code></td>
				<td><code>() => void</code></td>
				<td>Called when the palette opens</td>
			</tr>
			<tr>
				<td><code>onClose</code></td>
				<td><code>() => void</code></td>
				<td>Called when the palette closes</td>
			</tr>
			<tr>
				<td><code>onActionSelect</code></td>
				<td><code>(action) => void</code></td>
				<td>Called when an action is selected (before <code>onRun</code>)</td>
			</tr>
		</tbody>
	</table>
</div>

<h2>Styling Props</h2>

<p>Every visual element can be styled via class or inline style props:</p>

<div class="code-block">
	<div class="code-block-header">
		<div class="dots">
			<span class="dot"></span>
			<span class="dot"></span>
			<span class="dot"></span>
		</div>
		<span>Styled Example</span>
	</div>
	<pre><code>{styledExample}</code></pre>
</div>

<div class="table-wrapper">
	<table>
		<thead>
			<tr>
				<th>Class Prop</th>
				<th>Style Prop</th>
				<th>Target Element</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>inputClass</code></td>
				<td><code>inputStyle</code></td>
				<td>Search input field</td>
			</tr>
			<tr>
				<td><code>overlayClass</code></td>
				<td><code>overlayStyle</code></td>
				<td>Background overlay</td>
			</tr>
			<tr>
				<td><code>paletteWrapperInnerClass</code></td>
				<td><code>paletteWrapperInnerStyle</code></td>
				<td>Main palette container</td>
			</tr>
			<tr>
				<td><code>resultsContainerClass</code></td>
				<td><code>resultsContainerStyle</code></td>
				<td>Results list container</td>
			</tr>
			<tr>
				<td><code>resultContainerClass</code></td>
				<td><code>resultContainerStyle</code></td>
				<td>Individual result item</td>
			</tr>
			<tr>
				<td><code>optionSelectedClass</code></td>
				<td><code>optionSelectedStyle</code></td>
				<td>Active/selected result</td>
			</tr>
			<tr>
				<td><code>titleClass</code></td>
				<td><code>titleStyle</code></td>
				<td>Result title</td>
			</tr>
			<tr>
				<td><code>subtitleClass</code></td>
				<td><code>subtitleStyle</code></td>
				<td>Result subtitle</td>
			</tr>
			<tr>
				<td><code>descriptionClass</code></td>
				<td><code>descriptionStyle</code></td>
				<td>Result description</td>
			</tr>
			<tr>
				<td><code>keyboardButtonClass</code></td>
				<td><code>keyboardButtonStyle</code></td>
				<td>Keyboard shortcut badges</td>
			</tr>
		</tbody>
	</table>
</div>

<h2>Keyboard Navigation</h2>

<p>The palette supports the following keyboard shortcuts out of the box:</p>

<div class="shortcuts-grid">
	<div class="shortcut-item">
		<div class="shortcut-keys">
			<kbd class="kbd">⌘</kbd><kbd class="kbd">K</kbd>
		</div>
		<span>Toggle palette (customizable)</span>
	</div>
	<div class="shortcut-item">
		<div class="shortcut-keys">
			<kbd class="kbd">↑</kbd><kbd class="kbd">↓</kbd>
		</div>
		<span>Navigate results</span>
	</div>
	<div class="shortcut-item">
		<div class="shortcut-keys">
			<kbd class="kbd">Enter</kbd>
		</div>
		<span>Execute selected action</span>
	</div>
	<div class="shortcut-item">
		<div class="shortcut-keys">
			<kbd class="kbd">Esc</kbd>
		</div>
		<span>Close palette</span>
	</div>
</div>

<style>
	.lead {
		font-size: 1.125rem;
		color: var(--color-text-secondary);
		margin-bottom: var(--space-xl);
	}

	.table-wrapper {
		overflow-x: auto;
		margin: var(--space-lg) 0;
	}

	.shortcuts-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: var(--space-md);
		margin: var(--space-lg) 0;
	}

	.shortcut-item {
		display: flex;
		align-items: center;
		gap: var(--space-md);
		padding: var(--space-md);
		background: var(--color-bg-secondary);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
	}

	.shortcut-keys {
		display: flex;
		gap: 0.25rem;
	}

	.shortcut-item span {
		font-size: 0.875rem;
		color: var(--color-text-secondary);
	}
</style>
