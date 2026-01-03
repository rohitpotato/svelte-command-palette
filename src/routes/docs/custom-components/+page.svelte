<script lang="ts">
	const emptyStateExample = `<script lang="ts">
  import CommandPalette, { defineActions } from '$lib';
<\/script>

<CommandPalette commands={actions}>
  {#snippet emptyState()}
    <div class="custom-empty">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="11" cy="11" r="8"/>
        <path d="m21 21-4.3-4.3"/>
      </svg>
      <h3>No results found</h3>
      <p>Try searching for something else</p>
      <button on:click={() => console.log('Create new')}>
        Create new action
      </button>
    </div>
  {/snippet}
</CommandPalette>`;

	const iconExamples = `const actions = defineActions([
  // Emoji icons
  {
    title: 'Settings',
    icon: '⚙️',
    onRun: () => openSettings()
  },
  
  // Image URL icons
  {
    title: 'GitHub',
    icon: 'https://github.githubassets.com/favicons/favicon.svg',
    onRun: () => window.open('https://github.com')
  },
  
  // Local image icons
  {
    title: 'Profile',
    icon: '/icons/user.svg',
    onRun: () => openProfile()
  }
]);`;

	const groupExample = `const actions = defineActions([
  // Navigation group
  {
    title: 'Go to Dashboard',
    group: 'Navigation',
    icon: '🏠',
    onRun: () => goto('/dashboard')
  },
  {
    title: 'Go to Settings',
    group: 'Navigation', 
    icon: '⚙️',
    onRun: () => goto('/settings')
  },
  
  // Actions group
  {
    title: 'Create New Project',
    group: 'Actions',
    icon: '➕',
    onRun: () => createProject()
  },
  {
    title: 'Export Data',
    group: 'Actions',
    icon: '📤',
    onRun: () => exportData()
  },
  
  // Ungrouped items appear at the top
  {
    title: 'Quick Search',
    icon: '🔍',
    onRun: () => quickSearch()
  }
]);`;
</script>

<h1>Custom Components</h1>

<p class="lead">
	Extend the command palette with custom empty states, icons, and grouped actions.
</p>

<h2>Custom Empty State</h2>

<p>Provide a custom UI when no search results are found:</p>

<div class="code-block">
	<div class="code-block-header">
		<div class="dots">
			<span class="dot"></span>
			<span class="dot"></span>
			<span class="dot"></span>
		</div>
		<span>Custom Empty State</span>
	</div>
	<pre><code>{emptyStateExample}</code></pre>
</div>

<h2>Action Icons</h2>

<p>Add visual icons to your actions using emojis or image URLs:</p>

<div class="code-block">
	<div class="code-block-header">
		<div class="dots">
			<span class="dot"></span>
			<span class="dot"></span>
			<span class="dot"></span>
		</div>
		<span>Icon Types</span>
	</div>
	<pre><code>{iconExamples}</code></pre>
</div>

<div class="icon-types">
	<div class="icon-type">
		<span class="icon-demo">🚀</span>
		<h4>Emoji</h4>
		<p>Simple and universal</p>
	</div>
	<div class="icon-type">
		<span class="icon-demo">
			<img src="https://github.githubassets.com/favicons/favicon.svg" alt="GitHub" width="24" height="24" />
		</span>
		<h4>URL</h4>
		<p>External images</p>
	</div>
	<div class="icon-type">
		<span class="icon-demo">📁</span>
		<h4>Local</h4>
		<p>Static assets</p>
	</div>
</div>

<h2>Action Groups</h2>

<p>Organize related actions under group headers:</p>

<div class="code-block">
	<div class="code-block-header">
		<div class="dots">
			<span class="dot"></span>
			<span class="dot"></span>
			<span class="dot"></span>
		</div>
		<span>Grouped Actions</span>
	</div>
	<pre><code>{groupExample}</code></pre>
</div>

<div class="callout">
	<div class="callout-icon">💡</div>
	<div class="callout-content">
		<strong>Tip:</strong> Actions without a <code>group</code> property appear at the top of the list.
		Groups are displayed in the order they first appear in your actions array.
	</div>
</div>

<style>
	.lead {
		font-size: 1.125rem;
		color: var(--color-text-secondary);
		margin-bottom: var(--space-xl);
	}

	.icon-types {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--space-md);
		margin: var(--space-lg) 0;
	}

	.icon-type {
		text-align: center;
		padding: var(--space-lg);
		background: var(--color-bg-secondary);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
	}

	.icon-demo {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 48px;
		margin: 0 auto var(--space-sm);
		font-size: 1.5rem;
		background: var(--color-bg-tertiary);
		border-radius: var(--radius-md);
	}

	.icon-type h4 {
		font-size: 0.9375rem;
		margin-bottom: var(--space-xs);
	}

	.icon-type p {
		font-size: 0.8125rem;
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
</style>

