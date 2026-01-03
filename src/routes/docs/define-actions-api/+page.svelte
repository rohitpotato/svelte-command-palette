<script lang="ts">
	const fullExample = `import { defineActions } from '$lib';
import type { action } from '$lib';

const actions = defineActions([
  {
    // Required
    title: 'Go to Dashboard',
    
    // Optional - Unique identifier
    actionId: 'nav-dashboard',
    
    // Optional - Secondary text
    subTitle: 'View your analytics',
    
    // Optional - Additional description  
    description: 'Opens the main dashboard with all your metrics',
    
    // Optional - Icon (emoji or image URL)
    icon: '📊',
    
    // Optional - Group header
    group: 'Navigation',
    
    // Optional - Search keywords
    keywords: ['analytics', 'metrics', 'home', 'main'],
    
    // Optional - Keyboard shortcut
    shortcut: 'G D',
    
    // Optional - Action handler
    onRun: ({ action, storeProps, storeMethods }) => {
      console.log('Executing:', action.title);
      goto('/dashboard');
    },
    
    // Optional - Conditional execution
    canActionRun: ({ action, storeProps, storeMethods }) => {
      return storeProps.isAuthenticated;
    }
  }
]);`;

	const typeDefinition = `interface action {
  title: string;
  actionId?: string | number;
  subTitle?: string;
  description?: string;
  icon?: string;
  group?: string;
  keywords?: string[];
  shortcut?: string;
  onRun?: (params: onRunParams) => void;
  canActionRun?: (params: onRunParams) => boolean;
}

interface onRunParams {
  action: action;
  storeProps: storeParams;
  storeMethods: StoreMethods;
}`;
</script>

<h1>defineActions API</h1>

<p class="lead">
	The <code>defineActions</code> helper function creates properly typed action arrays
	for the command palette.
</p>

<h2>Function Signature</h2>

<div class="code-block">
	<div class="code-block-header">
		<div class="dots">
			<span class="dot"></span>
			<span class="dot"></span>
			<span class="dot"></span>
		</div>
		<span>Signature</span>
	</div>
	<pre><code>function defineActions(actions: action[]): action[]</code></pre>
</div>

<h2>Full Example</h2>

<div class="code-block">
	<div class="code-block-header">
		<div class="dots">
			<span class="dot"></span>
			<span class="dot"></span>
			<span class="dot"></span>
		</div>
		<span>Complete Action</span>
	</div>
	<pre><code>{fullExample}</code></pre>
</div>

<h2>Type Definition</h2>

<div class="code-block">
	<div class="code-block-header">
		<div class="dots">
			<span class="dot"></span>
			<span class="dot"></span>
			<span class="dot"></span>
		</div>
		<span>TypeScript Types</span>
	</div>
	<pre><code>{typeDefinition}</code></pre>
</div>

<h2>Property Reference</h2>

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
				<td>Unique identifier (auto-generated if omitted)</td>
			</tr>
			<tr>
				<td><code>subTitle</code></td>
				<td><code>string</code></td>
				<td></td>
				<td>Secondary text below title</td>
			</tr>
			<tr>
				<td><code>description</code></td>
				<td><code>string</code></td>
				<td></td>
				<td>Additional descriptive text</td>
			</tr>
			<tr>
				<td><code>icon</code></td>
				<td><code>string</code></td>
				<td></td>
				<td>Emoji or image URL</td>
			</tr>
			<tr>
				<td><code>group</code></td>
				<td><code>string</code></td>
				<td></td>
				<td>Group header name</td>
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
				<td>Keyboard shortcut (tinykeys format)</td>
			</tr>
			<tr>
				<td><code>onRun</code></td>
				<td><code>function</code></td>
				<td></td>
				<td>Callback when action executes</td>
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

<p>Both <code>onRun</code> and <code>canActionRun</code> receive:</p>

<div class="table-wrapper">
	<table>
		<thead>
			<tr>
				<th>Parameter</th>
				<th>Type</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>action</code></td>
				<td><code>action</code></td>
				<td>The current action being executed</td>
			</tr>
			<tr>
				<td><code>storeProps</code></td>
				<td><code>storeParams</code></td>
				<td>Current palette state (commands, results, etc.)</td>
			</tr>
			<tr>
				<td><code>storeMethods</code></td>
				<td><code>StoreMethods</code></td>
				<td>Methods to control the palette</td>
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

	.table-wrapper {
		overflow-x: auto;
		margin: var(--space-lg) 0;
	}
</style>

