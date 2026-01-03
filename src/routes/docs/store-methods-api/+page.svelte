<script lang="ts">
	const basicUsage = `import { createStoreMethods } from '$lib';

// Create store methods instance
const { openPalette, closePalette, togglePalette } = createStoreMethods();

// Open programmatically
function handleButtonClick() {
  openPalette();
}

// Close with custom logic
function handleSave() {
  saveData();
  closePalette();
}

// Toggle visibility
function handleKeyPress(event) {
  if (event.key === 'p' && event.metaKey) {
    togglePalette();
  }
}`;

	const withStore = `<script lang="ts">
  import { paletteStore, createStoreMethods } from '$lib';
  
  const { openPalette, closePalette } = createStoreMethods();
  
  // React to store changes
  $: if ($paletteStore.isVisible) {
    console.log('Palette opened');
  }
  
  // Access called actions history
  $: recentActions = $paletteStore.calledActions;
<\/script>

<button on:click={openPalette}>
  Open Palette
</button>

{#if recentActions.length > 0}
  <p>Last action: {recentActions[recentActions.length - 1]}</p>
{/if}`;

	const inActions = `const actions = defineActions([
  {
    title: 'Close and Navigate',
    onRun: ({ storeMethods }) => {
      // storeMethods is available in callbacks
      storeMethods.closePalette();
      goto('/dashboard');
    }
  },
  {
    title: 'Keep Open',
    onRun: ({ action, storeProps }) => {
      // Access current state
      console.log('Current search:', storeProps.textInput);
      console.log('Active command:', storeProps.activeCommandId);
      // Don't close - palette stays open
    }
  }
]);`;
</script>

<h1>createStoreMethods API</h1>

<p class="lead">
	The <code>createStoreMethods</code> function provides methods to programmatically 
	control the command palette's visibility.
</p>

<h2>Basic Usage</h2>

<div class="code-block">
	<div class="code-block-header">
		<div class="dots">
			<span class="dot"></span>
			<span class="dot"></span>
			<span class="dot"></span>
		</div>
		<span>Store Methods</span>
	</div>
	<pre><code>{basicUsage}</code></pre>
</div>

<h2>Available Methods</h2>

<div class="methods-grid">
	<div class="method-card">
		<h3><code>openPalette()</code></h3>
		<p>Opens the command palette and focuses the search input</p>
		<code class="method-return">Returns: void</code>
	</div>
	<div class="method-card">
		<h3><code>closePalette()</code></h3>
		<p>Closes the palette and clears the search input</p>
		<code class="method-return">Returns: void</code>
	</div>
	<div class="method-card">
		<h3><code>togglePalette()</code></h3>
		<p>Toggles the palette visibility</p>
		<code class="method-return">Returns: void</code>
	</div>
</div>

<h2>With Palette Store</h2>

<p>Combine with <code>paletteStore</code> for reactive state:</p>

<div class="code-block">
	<div class="code-block-header">
		<div class="dots">
			<span class="dot"></span>
			<span class="dot"></span>
			<span class="dot"></span>
		</div>
		<span>Reactive Store</span>
	</div>
	<pre><code>{withStore}</code></pre>
</div>

<h2>Inside Action Callbacks</h2>

<p>Store methods are automatically available in action callbacks:</p>

<div class="code-block">
	<div class="code-block-header">
		<div class="dots">
			<span class="dot"></span>
			<span class="dot"></span>
			<span class="dot"></span>
		</div>
		<span>Action Callbacks</span>
	</div>
	<pre><code>{inActions}</code></pre>
</div>

<h2>Store Properties</h2>

<p>The <code>paletteStore</code> contains:</p>

<div class="table-wrapper">
	<table>
		<thead>
			<tr>
				<th>Property</th>
				<th>Type</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>isVisible</code></td>
				<td><code>boolean</code></td>
				<td>Whether palette is currently open</td>
			</tr>
			<tr>
				<td><code>textInput</code></td>
				<td><code>string</code></td>
				<td>Current search query</td>
			</tr>
			<tr>
				<td><code>commands</code></td>
				<td><code>action[]</code></td>
				<td>All registered actions</td>
			</tr>
			<tr>
				<td><code>results</code></td>
				<td><code>action[]</code></td>
				<td>Filtered search results</td>
			</tr>
			<tr>
				<td><code>activeCommandId</code></td>
				<td><code>string | number | null</code></td>
				<td>Currently highlighted action</td>
			</tr>
			<tr>
				<td><code>calledActions</code></td>
				<td><code>Array&lt;ActionId&gt;</code></td>
				<td>History of executed action IDs</td>
			</tr>
		</tbody>
	</table>
</div>

<style>
	.lead {
		font-size: 1.125rem;
		color: var(--color-text-secondary);
		margin-bottom: var(--space-xl);
	}

	.methods-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: var(--space-md);
		margin: var(--space-lg) 0;
	}

	.method-card {
		padding: var(--space-lg);
		background: var(--color-bg-secondary);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
	}

	.method-card h3 {
		font-size: 1rem;
		margin-bottom: var(--space-sm);
	}

	.method-card p {
		font-size: 0.875rem;
		margin-bottom: var(--space-sm);
	}

	.method-return {
		font-size: 0.75rem;
		color: var(--color-text-tertiary);
	}

	.table-wrapper {
		overflow-x: auto;
		margin: var(--space-lg) 0;
	}
</style>

