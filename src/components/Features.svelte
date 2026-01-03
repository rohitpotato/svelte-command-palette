<script lang="ts">
	const features = [
		{
			icon: '⌨️',
			title: 'Keyboard First',
			description: 'Full keyboard navigation with customizable shortcuts. Works seamlessly with your existing keybindings.'
		},
		{
			icon: '🔍',
			title: 'Fuzzy Search',
			description: 'Powered by Fuse.js for intelligent, typo-tolerant search across titles, descriptions, and keywords.'
		},
		{
			icon: '🎨',
			title: 'Fully Customizable',
			description: 'Style every element with CSS classes or inline styles. Or go completely unstyled for total control.'
		},
		{
			icon: '♿',
			title: 'Accessible',
			description: 'ARIA compliant with focus management, screen reader support, and keyboard trap handling.'
		},
		{
			icon: '📦',
			title: 'Lightweight',
			description: 'Only ~5KB gzipped with zero dependencies besides Svelte itself. No bloat, just features.'
		},
		{
			icon: '🔷',
			title: 'TypeScript Ready',
			description: 'Written in TypeScript with full type definitions. Enjoy autocomplete and type safety.'
		}
	];
</script>

<section class="features section">
	<div class="container">
		<div class="features-header">
			<span class="badge">Features</span>
			<h2>Everything you need,<br/>nothing you don't</h2>
			<p>Built with developer experience in mind. Get up and running in minutes.</p>
		</div>

		<div class="feature-grid">
			{#each features as feature}
				<div class="card feature-card">
					<div class="feature-icon">
						{feature.icon}
					</div>
					<h3>{feature.title}</h3>
					<p>{feature.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.features {
		position: relative;
	}

	.features-header {
		text-align: center;
		max-width: 600px;
		margin: 0 auto var(--space-3xl);
	}

	.features-header .badge {
		margin-bottom: var(--space-md);
	}

	.features-header h2 {
		margin-bottom: var(--space-md);
	}

	.features-header p {
		font-size: 1.125rem;
	}

	.feature-card {
		padding: var(--space-xl);
	}

	.feature-card h3 {
		font-size: 1.125rem;
		margin-bottom: var(--space-sm);
	}

	.feature-card p {
		font-size: 0.9375rem;
		line-height: 1.6;
	}

	.feature-icon {
		width: 48px;
		height: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.5rem;
		background: var(--color-accent-subtle);
		border-radius: var(--radius-md);
		margin-bottom: var(--space-md);
	}
</style>

