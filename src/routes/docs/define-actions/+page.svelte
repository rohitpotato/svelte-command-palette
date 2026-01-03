<script lang="ts">
	const basicExample = `import { defineActions } from '$lib'; // Use 'svelte-command-palette' in your project

const actions = defineActions([
  {
    title: 'Search Users',
    subTitle: 'Find users by name or email',
    description: 'Opens the user search modal',
    icon: '👥',
    group: 'Users',
    keywords: ['find', 'lookup', 'people'],
    shortcut: 'S U',
    onRun: ({ action, storeProps, storeMethods }) => {
      openUserSearch();
      storeMethods.closePalette();
    },
    canActionRun: ({ storeProps }) => {
      // Only show if user is authenticated
      return storeProps.isAuthenticated;
    }
  }
]);`;

	const conditionalExample = `const actions = defineActions([
  {
    actionId: 'admin-panel',
    title: 'Open Admin Panel',
    icon: '🔐',
    canActionRun: ({ storeProps }) => {
      // Only admins can see this action
      return storeProps.user?.role === 'admin';
    },
    onRun: () => goto('/admin')
  },
  {
    actionId: 'dependent-action',
    title: 'Run Follow-up Task',
    subTitle: 'Requires "admin-panel" to be run first',
    canActionRun: ({ storeProps }) => {
      // Check if admin-panel was executed
      return storeProps.calledActions.includes('admin-panel');
    },
    onRun: () => runFollowUp()
  }
]);`;

	const groupedExample = `const actions = defineActions([
  // Navigation group
  { title: 'Go to Dashboard', group: 'Navigation', icon: '🏠', ... },
  { title: 'Go to Settings', group: 'Navigation', icon: '⚙️', ... },
  
  // Actions group
  { title: 'Create New Project', group: 'Actions', icon: '➕', ... },
  { title: 'Export Data', group: 'Actions', icon: '📤', ... },
  
  // Ungrouped actions appear first
  { title: 'Search Everything', icon: '🔍', ... }
]);`;
</script>

<h1>Defining Actions</h1>

<p class="lead">
	Actions are the building blocks of your command palette. Each action defines what appears 
	in the palette and what happens when it's triggered.
</p>

<h2>Basic Structure</h2>

<p>Use the <code>defineActions</code> helper to create properly typed actions:</p>

<div class="code-block">
	<div class="code-block-header">
		<div class="dots">
			<span class="dot"></span>
			<span class="dot"></span>
			<span class="dot"></span>
		</div>
		<span>actions.ts</span>
	</div>
	<pre><code>{basicExample}</code></pre>
</div>

<h2>Action Properties</h2>

<div class="table-wrapper">
	<table>
		<thead>
			<tr>
				<th>Property</th>
				<th>Type</th>
				<th>Required</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>title</code></td>
				<td><code>string</code></td>
				<td>✓</td>
				<td>Main display text for the action</td>
			</tr>
			<tr>
				<td><code>actionId</code></td>
				<td><code>string | number</code></td>
				<td></td>
				<td>Unique identifier (auto-generated if not provided)</td>
			</tr>
			<tr>
				<td><code>subTitle</code></td>
				<td><code>string</code></td>
				<td></td>
				<td>Secondary text displayed below the title</td>
			</tr>
			<tr>
				<td><code>description</code></td>
				<td><code>string</code></td>
				<td></td>
				<td>Additional description text</td>
			</tr>
			<tr>
				<td><code>icon</code></td>
				<td><code>string | Snippet</code></td>
				<td></td>
				<td>Emoji, image URL, or Svelte snippet</td>
			</tr>
			<tr>
				<td><code>group</code></td>
				<td><code>string</code></td>
				<td></td>
				<td>Group name for organizing actions</td>
			</tr>
			<tr>
				<td><code>keywords</code></td>
				<td><code>string[]</code></td>
				<td></td>
				<td>Additional search terms</td>
			</tr>
			<tr>
				<td><code>shortcut</code></td>
				<td><code>string</code></td>
				<td></td>
				<td>Keyboard shortcut (e.g., "G D", "$mod+S")</td>
			</tr>
			<tr>
				<td><code>onRun</code></td>
				<td><code>function</code></td>
				<td></td>
				<td>Callback when action is executed</td>
			</tr>
			<tr>
				<td><code>canActionRun</code></td>
				<td><code>function</code></td>
				<td></td>
				<td>Conditional check before execution</td>
			</tr>
		</tbody>
	</table>
</div>

<h2>Callback Parameters</h2>

<p>Both <code>onRun</code> and <code>canActionRun</code> receive an object with:</p>

<div class="callback-params">
	<div class="param-card">
		<h4><code>action</code></h4>
		<p>The current action object being executed</p>
	</div>
	<div class="param-card">
		<h4><code>storeProps</code></h4>
		<p>Current state of the palette store (commands, results, calledActions, etc.)</p>
	</div>
	<div class="param-card">
		<h4><code>storeMethods</code></h4>
		<p>Methods to control the palette (openPalette, closePalette, togglePalette)</p>
	</div>
</div>

<h2>Conditional Actions</h2>

<p>Use <code>canActionRun</code> to conditionally enable or disable actions:</p>

<div class="code-block">
	<div class="code-block-header">
		<div class="dots">
			<span class="dot"></span>
			<span class="dot"></span>
			<span class="dot"></span>
		</div>
		<span>Conditional Actions</span>
	</div>
	<pre><code>{conditionalExample}</code></pre>
</div>

<div class="callout">
	<div class="callout-icon">💡</div>
	<div class="callout-content">
		<strong>Tip:</strong> When <code>canActionRun</code> returns <code>false</code>, the action 
		still appears in search results but won't execute. You can show a message using <code>alert()</code> 
		before returning <code>false</code>.
	</div>
</div>

<h2>Grouped Actions</h2>

<p>Organize related actions using the <code>group</code> property:</p>

<div class="code-block">
	<div class="code-block-header">
		<div class="dots">
			<span class="dot"></span>
			<span class="dot"></span>
			<span class="dot"></span>
		</div>
		<span>Grouped Actions</span>
	</div>
	<pre><code>{groupedExample}</code></pre>
</div>

<h2>Keyboard Shortcuts</h2>

<p>Shortcuts use the <a href="https://github.com/jamiebuilds/tinykeys" target="_blank" rel="noopener">tinykeys</a> format:</p>

<div class="shortcuts-examples">
	<div class="shortcut-example">
		<code>"G D"</code>
		<span>Press G, then D (sequence)</span>
	</div>
	<div class="shortcut-example">
		<code>"$mod+S"</code>
		<span>Cmd/Ctrl + S (modifier)</span>
	</div>
	<div class="shortcut-example">
		<code>"Shift+Alt+P"</code>
		<span>Multiple modifiers</span>
	</div>
	<div class="shortcut-example">
		<code>"ArrowUp"</code>
		<span>Special keys</span>
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

	.callback-params {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: var(--space-md);
		margin: var(--space-lg) 0;
	}

	.param-card {
		padding: var(--space-md);
		background: var(--color-bg-secondary);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
	}

	.param-card h4 {
		margin-bottom: var(--space-xs);
		font-size: 0.9375rem;
	}

	.param-card p {
		font-size: 0.875rem;
		margin: 0;
	}

	.callout {
		display: flex;
		gap: var(--space-md);
		padding: var(--space-md);
		background: var(--color-accent-subtle);
		border: 1px solid rgba(255, 62, 0, 0.2);
		border-radius: var(--radius-md);
		margin: var(--space-lg) 0;
	}

	.callout-icon {
		font-size: 1.25rem;
	}

	.callout-content {
		flex: 1;
	}

	.callout-content strong {
		color: var(--color-accent);
	}

	.shortcuts-examples {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: var(--space-md);
		margin: var(--space-lg) 0;
	}

	.shortcut-example {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		padding: var(--space-md);
		background: var(--color-bg-secondary);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
	}

	.shortcut-example code {
		font-size: 0.9375rem;
		color: var(--color-accent);
	}

	.shortcut-example span {
		font-size: 0.8125rem;
		color: var(--color-text-tertiary);
	}
</style>

