<script>
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	export let src;
	export let autoplay = true;
	export let once = false;
	export let playOnHover = false;
	export let width = '64px';
	export let height = '64px';
	export let quality = 2;
	export let lazy = false;

	/** @type {HTMLDivElement | null} */
	let tgsElement = null;
	let tgsPlayerLoaded = false;
	let isReady = false;
	let isVisible = false;
	/** @type {IntersectionObserver | null} */
	let observer = null;

	async function loadTgsPlayer() {
		if (!browser || tgsPlayerLoaded) {
			return;
		}

		try {
			// @ts-ignore
			if (!window.RLottie) {
				const tgsScript = document.createElement('script');
				tgsScript.src = '/js/tgsticker.js';
				tgsScript.async = false;
				
				await new Promise((resolve, reject) => {
					tgsScript.onload = resolve;
					tgsScript.onerror = reject;
					document.head.appendChild(tgsScript);
				});
			}

			if (!customElements.get('tgs-player')) {
				const playerScript = document.createElement('script');
				playerScript.src = '/js/tgs-player.js';
				playerScript.async = false;
				
				await new Promise((resolve, reject) => {
					playerScript.onload = resolve;
					playerScript.onerror = reject;
					document.head.appendChild(playerScript);
				});
			}

			tgsPlayerLoaded = true;
		} catch (error) {
			console.error('Failed to load TGS player:', error);
		}
	}

	function handleMouseEnter() {
		// @ts-ignore
		if (playOnHover && browser && window.RLottie && tgsElement) {
			const picture = tgsElement.querySelector('picture');
			if (picture) {
				try {
					// @ts-ignore
					window.RLottie.playOnce(picture);
				} catch (e) {
					console.warn('TGS animation error:', e);
				}
			}
		}
	}

	function setupIntersectionObserver() {
		if (!browser || !lazy || !tgsElement) return;

		observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && !isVisible) {
						isVisible = true;
						loadAndRender();
						observer?.unobserve(entry.target);
					}
				});
			},
			{
				rootMargin: '50px',
				threshold: 0.1
			}
		);

		observer.observe(tgsElement);
	}

	async function loadAndRender() {
		await loadTgsPlayer();
		isReady = true;
	}

	onMount(async () => {
		if (!browser) return;
		
		if (lazy) {
			setupIntersectionObserver();
		} else {
			await loadAndRender();
		}
	});

	onDestroy(() => {
		if (observer) {
			observer.disconnect();
		}
	});
</script>

<div
	class="tgs-wrapper"
	style="width: {width}; height: {height};"
	bind:this={tgsElement}
	onmouseenter={handleMouseEnter}
>
	{#if isReady}
		<!-- svelte-ignore a11y-unknown-element -->
		<tgs-player
			{src}
			autoplay={autoplay ? '' : undefined}
			once={once ? '' : undefined}
			data-quality={quality}
		></tgs-player>
	{:else}
		<div class="loading-placeholder">
			{#if lazy && !isVisible}
				<!-- Заглушка для ленивой загрузки -->
				<div class="w-full h-full bg-gray-700 rounded flex items-center justify-center">
					<svg class="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
						<path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"/>
					</svg>
				</div>
			{:else}
				<!-- Индикатор загрузки -->
				<div class="animate-pulse bg-gray-600 rounded w-full h-full flex items-center justify-center">
					<div class="w-4 h-4 bg-gray-500 rounded-full animate-bounce"></div>
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	.tgs-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		border-radius: 8px;
		line-height: 0;
	}

	.loading-placeholder {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tgs-wrapper :global(tgs-player) {
		width: 100%;
		height: 100%;
		display: block;
		line-height: 0;
	}

	.tgs-wrapper :global(picture) {
		width: 100%;
		height: 100%;
		display: block;
		line-height: 0;
	}

	.tgs-wrapper :global(canvas) {
		width: 100% !important;
		height: 100% !important;
		max-width: 100%;
		max-height: 100%;
		object-fit: cover;
		display: block;
		image-rendering: -webkit-optimize-contrast;
		image-rendering: crisp-edges;
		image-rendering: pixelated;
	}
</style>
