<script lang="ts">
	import Counter from './Counter.svelte';
	import KeyboardShortcut from './KeyboardShortcut.svelte';
	export let incrementCounter = () => {};
	export let runConditionalAction = () => {};
	export let openCommandPalette = () => {};
	export let counter: number = 0;
</script>

<main class="pt-20 grid grid-cols-2 gap-12 pb-20">
	<div class="">
		<h1 class="text-5xl text-gray-600 font-light leading-tight">
			Increase your productivity exponentially.
		</h1>
		<h3 class="text-2xl mt-6 text-gray-600">
			Use <KeyboardShortcut
				on:onShortcutClick={openCommandPalette}
				shortcuts={['⌘', 'K']}
				theme="primary"
			/> to bring up the command palette.
		</h3>
	</div>
	<div>
		<h1 class="text-4xl text-gray-600 font-light leading-tight">Keyboard Shorcuts</h1>
		<div class="mt-4">
			<h3 class="text-lg mt-6 text-gray-600">
				Press or hold <KeyboardShortcut
					shortcuts={['C', 'C']}
					theme="secondary"
					on:onShortcutClick={incrementCounter}
				/> to increment the counter
			</h3>
			<Counter {counter} />
		</div>
	</div>
	<div>
		<h1 class="text-4xl text-gray-600 font-light leading-tight">Conditional Actions</h1>
		<div class="mt-4">
			<h3 class="text-lg mt-6 text-gray-600">
				This will only run when the counter is greater than 2.
			</h3>
		</div>
		<div class="mt-4 flex items-center flex-col justify-center bg-slate-50 shadow text-xl p-20">
			{#if counter < 3}
				<div class:text-red-500={counter < 3}>
					Just need {3 - counter} more
				</div>
			{/if}
			{#if counter > 2}
				<div class="mt-4">
					Press <KeyboardShortcut
						on:onShortcutClick={runConditionalAction}
						shortcuts={['F', 'B', 'I']}
						theme="secondary"
					/> to run this action
				</div>
			{/if}
		</div>
	</div>
	<div>
		<h1 class="text-4xl text-gray-600 font-light leading-tight">Advanced Conditional Actions</h1>
		<div class="mt-4">
			<h3 class="text-lg mt-6 text-gray-600">
				You can run an action based on the current state of your command palette. Press <KeyboardShortcut
					shortcuts={['C', 'I', 'A']}
					theme="secondary"
				/> to run this action
			</h3>
		</div>
		<div class="mt-8">
			<div class="text-lg">
				You must run <KeyboardShortcut
					on:onShortcutClick={runConditionalAction}
					shortcuts={['F', 'B', 'I']}
					theme="secondary"
				/> atleast once to enable this action
			</div>
			<div class="text-base mt-4">
				Note: You can update your
				<div class="inline text-xl font-bold p-1 rounded font-mono">paletteStore</div>
				from anywhere!
			</div>
		</div>
	</div>
</main>
