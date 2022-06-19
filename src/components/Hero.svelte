<script lang="ts">
	export let onClick: MouseEventHandler<HTMLButtonElement>;
</script>

<main class="pt-20 flex flex-row items-baseline justify-between gap-24">
	<div class="max-w-[50%]">
		<h1 class="text-5xl text-gray-600 font-light leading-tight">
			Increase your productivity exponentially.
		</h1>
		<h3 class="text-3xl mt-6 text-gray-600">
			Use <button
				class="px-3 py-4 bg-gray-800 font-light text-white rounded-md hover:scale-110 transition-transform duration-300"
				on:click={onClick}
			>
				<span class="border-white border-2 rounded-md h-10 w-9 inline-block">⌘</span>
				<span class="border-white border-2 rounded-md h-10 w-9 ml-3 inline-block">K</span>
			</button> to bring up the command palette.
		</h3>
	</div>
	<div class="text-gray-600 font-light text-4xl leading-tight max-w-[50%]">
		Inspired by real life examples from
		<a target="_blank" class="hover:underline font-light" href="https://tailwindcss.com/docs"
			>Tailwind CSS,</a
		>
		<a target="_blank" class="hover:underline font-light" href="https://linear.com">Linear</a> and
		<a target="_blank" class="hover:underline font-light" href="https://github.com">Github</a>
	</div>
</main>
