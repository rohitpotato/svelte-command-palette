<script lang="ts">
	import { Settings, Search, User, Home, FolderPlus, Download } from 'lucide-svelte';

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

	const lucideExample = `<script lang="ts">
  import CommandPalette, { defineActions } from 'svelte-command-palette';
  import { Settings, Search, User, Home, FolderPlus, Download } from 'lucide-svelte';
<\/script>

<!-- Define snippets for each icon -->
{#snippet settingsIcon()}
  <Settings size={20} />
{/snippet}

{#snippet searchIcon()}
  <Search size={20} />
{/snippet}

{#snippet userIcon()}
  <User size={20} />
{/snippet}

{#snippet homeIcon()}
  <Home size={20} />
{/snippet}

<!-- Use snippets in your actions -->
<script>
  const actions = defineActions([
    {
      title: 'Open Settings',
      subTitle: 'Configure your preferences',
      icon: settingsIcon,
      onRun: () => goto('/settings')
    },
    {
      title: 'Search Files',
      subTitle: 'Find files in your project',
      icon: searchIcon,
      onRun: () => openSearch()
    },
    {
      title: 'View Profile',
      subTitle: 'See your account details',
      icon: userIcon,
      onRun: () => goto('/profile')
    },
    {
      title: 'Go Home',
      subTitle: 'Return to dashboard',
      icon: homeIcon,
      onRun: () => goto('/')
    }
  ]);
<\/script>

<CommandPalette commands={actions} />`;

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
	<div class="icon-type">
		<span class="icon-demo">
			<Settings size={24} />
		</span>
		<h4>Snippet</h4>
		<p>Custom SVG/Components</p>
	</div>
</div>

<h2>Using Icon Libraries (Lucide, Heroicons, etc.)</h2>

<p>
	For professional-looking icons, use third-party libraries like 
	<a href="https://lucide.dev" target="_blank" rel="noopener">Lucide</a>, 
	<a href="https://heroicons.com" target="_blank" rel="noopener">Heroicons</a>, or any Svelte icon library.
	Define your icons as Snippets and pass them to the <code>icon</code> property:
</p>

<div class="code-block">
	<div class="code-block-header">
		<div class="dots">
			<span class="dot"></span>
			<span class="dot"></span>
			<span class="dot"></span>
		</div>
		<span>Using Lucide Icons</span>
	</div>
	<pre><code>{lucideExample}</code></pre>
</div>

<h3>Live Demo</h3>

<p>Here's how Lucide icons look in practice:</p>

<div class="icon-demo-grid">
	<div class="icon-demo-item">
		<span class="icon-box"><Settings size={20} /></span>
		<span>Settings</span>
	</div>
	<div class="icon-demo-item">
		<span class="icon-box"><Search size={20} /></span>
		<span>Search</span>
	</div>
	<div class="icon-demo-item">
		<span class="icon-box"><User size={20} /></span>
		<span>User</span>
	</div>
	<div class="icon-demo-item">
		<span class="icon-box"><Home size={20} /></span>
		<span>Home</span>
	</div>
	<div class="icon-demo-item">
		<span class="icon-box"><FolderPlus size={20} /></span>
		<span>FolderPlus</span>
	</div>
	<div class="icon-demo-item">
		<span class="icon-box"><Download size={20} /></span>
		<span>Download</span>
	</div>
</div>

<div class="callout callout-info">
	<div class="callout-icon">📦</div>
	<div class="callout-content">
		<strong>Install Lucide:</strong> <code>npm install lucide-svelte</code>
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
		grid-template-columns: repeat(4, 1fr);
		gap: var(--space-md);
		margin: var(--space-lg) 0;
	}

	@media (max-width: 768px) {
		.icon-types {
			grid-template-columns: repeat(2, 1fr);
		}
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
		color: var(--color-text-primary);
	}

	.icon-type h4 {
		font-size: 0.9375rem;
		margin-bottom: var(--space-xs);
	}

	.icon-type p {
		font-size: 0.8125rem;
		margin: 0;
	}

	.icon-demo-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
		gap: var(--space-md);
		margin: var(--space-lg) 0;
	}

	.icon-demo-item {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		padding: var(--space-md);
		background: var(--color-bg-secondary);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
	}

	.icon-box {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		background: var(--color-bg-tertiary);
		border-radius: var(--radius-sm);
		color: var(--color-text-primary);
	}

	.icon-demo-item span:last-child {
		font-size: 0.875rem;
		color: var(--color-text-secondary);
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

	.callout-info {
		background: rgba(99, 102, 241, 0.1);
		border-color: rgba(99, 102, 241, 0.3);
	}

	.callout-info strong {
		color: var(--color-secondary);
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

	.callout-content code {
		background: var(--color-bg-tertiary);
		padding: 0.125rem 0.375rem;
		border-radius: 4px;
		font-size: 0.875rem;
	}
</style>

