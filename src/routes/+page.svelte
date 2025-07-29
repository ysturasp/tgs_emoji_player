<script lang="ts">
	import TgsSticker from '$lib/components/TgsSticker.svelte';
	import { onMount } from 'svelte';

	let stickerFiles: string[] = [];
	let selectedSticker = $state('');
	let loading = $state(true);
	let showTooltip = $state(true);

	async function loadStickersList() {
		try {
			const response = await fetch('/api/stickers');
			if (response.ok) {
				const stickers = await response.json();
				stickerFiles = stickers;
				if (stickers.length > 0) {
					selectedSticker = stickers[0];
				}
			} else {
				console.error('Failed to load stickers list');
			}
		} catch (error) {
			console.error('Error loading stickers:', error);
		} finally {
			loading = false;
		}
	}

	onMount(async () => {
		await loadStickersList();
		
		if (typeof window !== 'undefined') {
			document.documentElement.classList.add('dark');

			const tooltipShown = localStorage.getItem('tooltipShown');
			if (tooltipShown) {
				showTooltip = false;
			}
		}
	});

	function selectSticker(file: string) {
		selectedSticker = file;
	}

	function hideTooltip() {
		showTooltip = false;
		if (typeof window !== 'undefined') {
			localStorage.setItem('tooltipShown', 'true');
		}
	}
</script>

<svelte:head>
	<title>TGS Sticker Player</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 transition-all duration-500">
	<!-- Тултип -->
	{#if showTooltip}
		<div class="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
			<div class="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg relative">
				<div class="text-sm font-medium">
					Наведите курсор на стикер для воспроизведения 🎬
				</div>
				<button 
					onclick={hideTooltip}
					class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 transition-colors"
				>
					×
				</button>
				<!-- Стрелка -->
				<div class="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-blue-500"></div>
			</div>
		</div>
	{/if}

	<!-- Header -->
	<header class="backdrop-blur-md bg-gray-900/80 border-b border-gray-700/50 sticky top-0 z-40">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex items-center justify-center h-16">
				<div class="flex items-center space-x-3">
					<div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
						<svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
							<path d="M10 2L3 7v11a1 1 0 001 1h3v-6h6v6h3a1 1 0 001-1V7l-7-5z"/>
						</svg>
					</div>
					<h1 class="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
						TGS Player
					</h1>
				</div>
			</div>
		</div>
	</header>
	
	<!-- Список всех стикеров -->
	<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
		<div class="bg-gray-800/70 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-700/50 p-6">
			{#if loading}
				<div class="text-center py-12">
					<div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
					<p class="mt-4 text-gray-400">Загружаем стикеры...</p>
				</div>
			{:else if stickerFiles.length === 0}
				<div class="text-center py-12">
					<svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
					</svg>
					<p class="mt-4 text-gray-400">Стикеры не найдены</p>
				</div>
			{:else}
				<h3 class="text-lg font-semibold text-white mb-6 flex items-center">
					<svg class="w-5 h-5 mr-2 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
						<path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"/>
					</svg>
					Все стикеры ({stickerFiles.length})
				</h3>
				
				<div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 2xl:grid-cols-12 gap-4">
					{#each stickerFiles as file}
						<div class="group relative aspect-square rounded-xl overflow-hidden transition-all transform hover:scale-105 hover:shadow-lg bg-gradient-to-br from-gray-700 to-gray-800">
							{#key file}
								<TgsSticker
									src="/stickers/{file}"
									autoplay={false}
									once={false}
									playOnHover={true}
									width="100%"
									height="100%"
									quality={2}
									lazy={true}
								/>
							{/key}
							
							<!-- Название файла при наведении -->
							<div class="absolute inset-x-0 bottom-0 bg-black/75 text-white text-xs p-1 opacity-0 group-hover:opacity-100 transition-opacity">
								{file.replace('.tgs', '')}
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</main>
</div>
