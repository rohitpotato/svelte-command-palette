<script context="module">
	export async function load({ fetch }) {
		let data = await fetch('/code/code.json?file=define-actions.html');
		data = await data.json();
		return {
			props: {
				html: data.html
			}
		};
	}
</script>