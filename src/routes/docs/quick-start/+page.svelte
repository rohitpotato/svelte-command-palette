<script lang="ts">
	const basicSetup = `<script lang="ts">
  import CommandPalette, { defineActions, createStoreMethods } from '$lib';
  // Use 'svelte-command-palette' in your project

  // Define your actions
  const actions = defineActions([
    {
      title: 'Go to Home',
      subTitle: 'Navigate to homepage',
      icon: '🏠',
      onRun: () => window.location.href = '/',
      shortcut: 'G H'
    },
    {
      title: 'Toggle Dark Mode',
      subTitle: 'Switch theme',
      icon: '🌙',
      onRun: () => document.body.classList.toggle('dark'),
      shortcut: 'T D'
    }
  ]);

  // Optional: Get store methods to control palette programmatically
  const { openPalette } = createStoreMethods();
<\/script>

<!-- Render CommandPalette at the root of your app -->
<CommandPalette
  commands={actions}
  placeholder="What do you want to do?"
/>

<!-- Optional: Button to open palette -->
<button on:click={openPalette}>
  Open Command Palette
</button>`;

	const layoutExample = `<!-- src/routes/+layout.svelte -->
<script>
  import CommandPalette, { defineActions } from '$lib';
  import '../app.css';

  const actions = defineActions([
    // Your global actions here
  ]);
<\/script>

<CommandPalette commands={actions} />
<slot />`;
</script>

<h1>Quick Start</h1>

<p class="lead">
	Get a fully functional command palette running in under 5 minutes.
</p>

<h2>Step 1: Basic Setup</h2>

<p>Import the component and define your actions:</p>

<div class="code-block">
	<div class="code-block-header">
		<div class="dots">
			<span class="dot"></span>
			<span class="dot"></span>
			<span class="dot"></span>
		</div>
		<span>+page.svelte</span>
	</div>
	<pre><code>{basicSetup}</code></pre>
</div>

<h2>Step 2: Add to Layout (Recommended)</h2>

<p>For app-wide access, add CommandPalette to your root layout:</p>

<div class="code-block">
	<div class="code-block-header">
		<div class="dots">
			<span class="dot"></span>
			<span class="dot"></span>
			<span class="dot"></span>
		</div>
		<span>+layout.svelte</span>
	</div>
	<pre><code>{layoutExample}</code></pre>
</div>

<h2>Step 3: Try It Out</h2>

<p>Press <kbd class="kbd">⌘</kbd> + <kbd class="kbd">K</kbd> (or <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">K</kbd> on Windows/Linux) to open the command palette!</p>

<div class="next-steps">
	<h2>Next Steps</h2>
	<div class="next-steps-grid">
		<a href="/docs/define-actions" class="next-step-card">
			<span class="next-step-icon">📝</span>
			<h3>Define Actions</h3>
			<p>Learn about all action properties</p>
		</a>
		<a href="/docs/shortcuts" class="next-step-card">
			<span class="next-step-icon">⌨️</span>
			<h3>Keyboard Shortcuts</h3>
			<p>Set up custom shortcuts</p>
		</a>
		<a href="/docs/styling" class="next-step-card">
			<span class="next-step-icon">🎨</span>
			<h3>Styling</h3>
			<p>Customize the appearance</p>
		</a>
	</div>
</div>

<style>
	.lead {
		font-size: 1.125rem;
		color: var(--color-text-secondary);
		margin-bottom: var(--space-xl);
	}

	.next-steps {
		margin-top: var(--space-2xl);
	}

	.next-steps-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: var(--space-md);
		margin-top: var(--space-lg);
	}

	.next-step-card {
		display: flex;
		flex-direction: column;
		padding: var(--space-lg);
		background: var(--color-bg-secondary);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		text-decoration: none;
		transition: all var(--transition-fast);
	}

	.next-step-card:hover {
		border-color: var(--color-accent);
		transform: translateY(-2px);
	}

	.next-step-icon {
		font-size: 2rem;
		margin-bottom: var(--space-sm);
	}

	.next-step-card h3 {
		font-size: 1rem;
		color: var(--color-text-primary);
		margin-bottom: var(--space-xs);
	}

	.next-step-card p {
		font-size: 0.875rem;
		color: var(--color-text-secondary);
		margin: 0;
	}
</style>

