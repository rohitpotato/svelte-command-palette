<script lang="ts">
	const npmInstall = `npm install svelte-command-palette`;
	const yarnInstall = `yarn add svelte-command-palette`;
	const pnpmInstall = `pnpm add svelte-command-palette`;
</script>

<h1>Installation</h1>

<p class="lead">
	Get started with Svelte Command Palette in just a few minutes.
</p>

<h2>Requirements</h2>

<ul>
	<li>Svelte 5.0 or higher</li>
	<li>SvelteKit 2.0 or higher (recommended)</li>
	<li>Node.js 18 or higher</li>
</ul>

<h2>Package Installation</h2>

<p>Install the package using your preferred package manager:</p>

<h3>npm</h3>
<div class="code-block">
	<div class="code-block-header">
		<div class="dots">
			<span class="dot"></span>
			<span class="dot"></span>
			<span class="dot"></span>
		</div>
		<span>Terminal</span>
	</div>
	<pre><code>{npmInstall}</code></pre>
</div>

<h3>yarn</h3>
<div class="code-block">
	<div class="code-block-header">
		<div class="dots">
			<span class="dot"></span>
			<span class="dot"></span>
			<span class="dot"></span>
		</div>
		<span>Terminal</span>
	</div>
	<pre><code>{yarnInstall}</code></pre>
</div>

<h3>pnpm</h3>
<div class="code-block">
	<div class="code-block-header">
		<div class="dots">
			<span class="dot"></span>
			<span class="dot"></span>
			<span class="dot"></span>
		</div>
		<span>Terminal</span>
	</div>
	<pre><code>{pnpmInstall}</code></pre>
</div>

<h2>Dependencies</h2>

<p>The package has minimal dependencies:</p>

<div class="table-wrapper">
	<table>
		<thead>
			<tr>
				<th>Package</th>
				<th>Purpose</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>fuse.js</code></td>
				<td>Fuzzy search functionality</td>
			</tr>
			<tr>
				<td><code>tinykeys</code></td>
				<td>Keyboard shortcut handling</td>
			</tr>
			<tr>
				<td><code>csstype</code></td>
				<td>TypeScript CSS property types</td>
			</tr>
		</tbody>
	</table>
</div>

<h2>Next Steps</h2>

<p>After installation, head to the <a href="/docs/quick-start">Quick Start guide</a> to set up your first command palette.</p>

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

