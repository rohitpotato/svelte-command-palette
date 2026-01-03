<script lang="ts">
	interface Props {
		openCommandPalette?: () => void;
	}

	let { openCommandPalette = () => {} }: Props = $props();
</script>

<section class="hero">
	<div class="hero-glow"></div>
	<div class="hero-content stagger">
		<div class="hero-badge">
			<span class="badge">✨ Now with Svelte 5 support</span>
		</div>
		
		<h1 class="hero-title">
			The <span class="text-gradient">Command Palette</span><br/>
			Your Users Deserve
		</h1>
		
		<p class="hero-description">
			A beautiful, accessible, and fully customizable command palette for Svelte applications. 
			Boost productivity with keyboard shortcuts and fuzzy search.
		</p>

		<div class="hero-actions">
			<button class="btn btn-primary btn-lg" onclick={openCommandPalette}>
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<circle cx="11" cy="11" r="8"/>
					<path d="m21 21-4.3-4.3"/>
				</svg>
				Try it now
				<span class="kbd-group">
					<kbd class="kbd">⌘</kbd>
					<kbd class="kbd">K</kbd>
				</span>
			</button>
			<a href="/docs" class="btn btn-secondary btn-lg">
				Read the docs
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M5 12h14M12 5l7 7-7 7"/>
				</svg>
			</a>
		</div>

		<div class="hero-stats">
			<div class="stat">
				<span class="stat-value">5KB</span>
				<span class="stat-label">Gzipped</span>
			</div>
			<div class="stat-divider"></div>
			<div class="stat">
				<span class="stat-value">A11y</span>
				<span class="stat-label">Accessible</span>
			</div>
			<div class="stat-divider"></div>
			<div class="stat">
				<span class="stat-value">100%</span>
				<span class="stat-label">TypeScript</span>
			</div>
		</div>
	</div>

	<div class="hero-visual animate-fade-in">
		<div class="demo-window">
			<div class="demo-header">
				<div class="demo-dots">
					<span></span>
					<span></span>
					<span></span>
				</div>
				<span class="demo-title">Command Palette</span>
			</div>
			<div class="demo-content">
				<div class="demo-search">
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<circle cx="11" cy="11" r="8"/>
						<path d="m21 21-4.3-4.3"/>
					</svg>
					<span>Search for actions...</span>
					<kbd class="kbd">Esc</kbd>
				</div>
				<div class="demo-results">
					<div class="demo-result active">
						<span class="demo-result-icon">🚀</span>
						<div class="demo-result-content">
							<span class="demo-result-title">Deploy to production</span>
							<span class="demo-result-subtitle">Push changes to live server</span>
						</div>
						<div class="demo-result-kbd">
							<kbd class="kbd">D</kbd>
							<kbd class="kbd">P</kbd>
						</div>
					</div>
					<div class="demo-result">
						<span class="demo-result-icon">🎨</span>
						<div class="demo-result-content">
							<span class="demo-result-title">Toggle dark mode</span>
							<span class="demo-result-subtitle">Switch between light and dark</span>
						</div>
						<div class="demo-result-kbd">
							<kbd class="kbd">⌘</kbd>
							<kbd class="kbd">D</kbd>
						</div>
					</div>
					<div class="demo-result">
						<span class="demo-result-icon">📦</span>
						<div class="demo-result-content">
							<span class="demo-result-title">Install dependencies</span>
							<span class="demo-result-subtitle">Run npm install</span>
						</div>
						<div class="demo-result-kbd">
							<kbd class="kbd">I</kbd>
							<kbd class="kbd">D</kbd>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.hero {
		position: relative;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 8rem 1.5rem 4rem;
		overflow: hidden;
	}

	.hero-glow {
		position: absolute;
		top: -50%;
		left: 50%;
		transform: translateX(-50%);
		width: 100%;
		max-width: 800px;
		height: 600px;
		background: radial-gradient(ellipse 60% 50% at 50% 0%, rgba(255, 62, 0, 0.15), transparent);
		pointer-events: none;
	}

	.hero-content {
		position: relative;
		max-width: 720px;
		text-align: center;
		margin-bottom: 4rem;
	}

	.hero-badge {
		margin-bottom: 1.5rem;
	}

	.hero-title {
		margin-bottom: 1.5rem;
		font-size: clamp(2.5rem, 6vw, 4.5rem);
		line-height: 1.1;
		letter-spacing: -0.03em;
	}

	.hero-description {
		max-width: 560px;
		margin: 0 auto 2rem;
		font-size: 1.125rem;
		line-height: 1.7;
		color: var(--color-text-secondary);
	}

	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1rem;
		margin-bottom: 3rem;
	}

	.btn-lg {
		padding: 0.875rem 1.5rem;
		font-size: 1rem;
	}

	.btn-primary .kbd-group {
		display: flex;
		gap: 0.25rem;
		margin-left: 0.5rem;
		padding-left: 0.75rem;
		border-left: 1px solid rgba(255, 255, 255, 0.2);
	}

	.btn-primary .kbd {
		background: rgba(255, 255, 255, 0.15);
		border-color: rgba(255, 255, 255, 0.2);
		color: white;
		box-shadow: none;
	}

	.hero-stats {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 2rem;
	}

	.stat {
		text-align: center;
	}

	.stat-value {
		display: block;
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--color-text-primary);
	}

	.stat-label {
		font-size: 0.875rem;
		color: var(--color-text-tertiary);
	}

	.stat-divider {
		width: 1px;
		height: 40px;
		background: var(--color-border);
	}

	/* Demo Window */
	.hero-visual {
		position: relative;
		width: 100%;
		max-width: 560px;
		perspective: 1000px;
	}

	.demo-window {
		background: var(--color-bg-secondary);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		overflow: hidden;
		box-shadow: 
			0 25px 50px -12px rgba(0, 0, 0, 0.4),
			0 0 0 1px rgba(255, 255, 255, 0.05);
		animation: float 6s ease-in-out infinite;
	}

	.demo-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem 1rem;
		background: var(--color-bg-tertiary);
		border-bottom: 1px solid var(--color-border);
	}

	.demo-dots {
		display: flex;
		gap: 0.375rem;
	}

	.demo-dots span {
		width: 12px;
		height: 12px;
		border-radius: 50%;
	}

	.demo-dots span:nth-child(1) { background: #ff5f57; }
	.demo-dots span:nth-child(2) { background: #ffbd2e; }
	.demo-dots span:nth-child(3) { background: #28c840; }

	.demo-title {
		font-size: 0.8125rem;
		color: var(--color-text-tertiary);
	}

	.demo-content {
		padding: 0.5rem;
	}

	.demo-search {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.875rem 1rem;
		border-bottom: 1px solid var(--color-border);
		color: var(--color-text-tertiary);
	}

	.demo-search span {
		flex: 1;
	}

	.demo-results {
		padding: 0.5rem 0;
	}

	.demo-result {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem 1rem;
		border-radius: var(--radius-md);
		transition: background var(--transition-fast);
	}

	.demo-result.active {
		background: var(--color-bg-hover);
	}

	.demo-result-icon {
		font-size: 1.25rem;
		width: 36px;
		height: 36px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--color-bg-tertiary);
		border-radius: var(--radius-sm);
	}

	.demo-result-content {
		flex: 1;
	}

	.demo-result-title {
		display: block;
		font-weight: 500;
		color: var(--color-text-primary);
	}

	.demo-result-subtitle {
		font-size: 0.8125rem;
		color: var(--color-text-tertiary);
	}

	.demo-result-kbd {
		display: flex;
		gap: 0.25rem;
	}

	@media (max-width: 768px) {
		.hero {
			padding: 6rem 1rem 2rem;
		}

		.hero-content {
			margin-bottom: 2rem;
		}

		.hero-actions {
			flex-direction: column;
		}

		.btn-lg {
			width: 100%;
			justify-content: center;
		}

		.hero-stats {
			gap: 1.5rem;
		}

		.stat-value {
			font-size: 1.25rem;
		}

		.demo-window {
			animation: none;
		}
	}
</style>
