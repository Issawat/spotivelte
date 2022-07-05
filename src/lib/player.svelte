<script lang="ts">
	import { onMount } from 'svelte';
	import { each } from 'svelte/internal';

	import type {
		PlayerPlugin,
		PlayerState,
		PlayerControl,
		PlayerError,
		PlayerInternal
	} from '../types/spotifyWebPlayback';
	export let playerPlugin: PlayerPlugin;
	export let playerState: PlayerState;
	export let playerControl: PlayerControl;
	export let playerError: PlayerError;
	export let playerInternal: PlayerInternal;

	$: {
		console.debug(playerState);
	}

	function togglePlay() {
		playerControl.togglePlay();
	}
	function next() {
		playerControl.nextTrack();
	}
	function prev() {
		playerControl.previousTrack();
	}
	const characters = ['1'];

	let confetti = new Array(30)
		.fill()
		.map((_, i) => {
			return {
				character: characters[i % characters.length],
				x: Math.random() * 100,
				y: -10 - Math.random() * 100,
				r: 0.1 + Math.random() * 1
			};
		})
		.sort((a, b) => a.r - b.r);

	onMount(() => {
		let frame;

		function loop() {
			frame = requestAnimationFrame(loop);

			confetti = confetti.map((emoji) => {
				emoji.y += 0.7 * emoji.r;
				if (emoji.y > 120) emoji.y = -300;
				return emoji;
			});
		}
		loop();

		return () => cancelAnimationFrame(frame);
	});

	const btnClass = 'text-4xl hover:opacity-80 mx-3 my-2';
</script>

<div class="back">
	{#each confetti as c}
		<span style="left: {c.x}%; top: {c.y}%; transform: scale({c.r})"
			><img
				class="rounded-lg"
				src={playerState?.track_window?.current_track?.album?.images?.[0]?.url}
				alt="Pls login"
			/></span
		>
	{/each}
</div>
<img
	class="bg-img"
	src={playerState?.track_window?.current_track?.album?.images?.[0]?.url}
	alt="Pls login"
/>
<div class="fore">
	<div class="flex flex-col justify-center items-center bg-black bg-opacity-70 w-[400px] h-[650px] rounded-2xl">
		<img
			class="rounded-xl"
			src={playerState?.track_window?.current_track?.album?.images?.[0]?.url}
			alt="Pls login"
		/>
		<div class="mt-5 text-2xl">{playerState?.track_window?.current_track.name ?? 'Pls login'}</div>
		<div class="text-gray-500">{playerState?.track_window?.current_track.album.name ?? 'Pls login'}</div>
		<div class="text-gray-500">
			{#each playerState?.track_window.current_track?.artists ?? [] as artist}
				{artist?.name}
			{/each}
		</div>

		<button class={btnClass} on:click={playerPlugin.login}>🔑</button>
		<button class={btnClass} on:click={playerPlugin.selectDevice}>📲</button>
		<div class="flex">
			<button class={btnClass} on:click={prev}>⏮</button>
			<button class={btnClass} on:click={togglePlay}>
				{playerState?.paused ? '▶️' : '⏸'}</button
			>
			<button class={btnClass} on:click={next}>⏭</button>
		</div>
	</div>
</div>

<style>
	:global(body) {
		overflow: hidden;
		/* background-color: rgb(62, 62, 62); */
	}

	span {
		z-index: 10;
		position: absolute;
		user-select: none;
	}
	.bg-img {
		z-index: 5;
		position: absolute;
		width: 150vw;
		height: 150vh;
		filter: blur(80px);
		opacity: 1;
	}
	.fore {
		display: flex;
		justify-content: center;
		align-items: center;
		color: white;
		position: absolute;
		z-index: 20;
		width: 100%;
		height: 100vh;
		backdrop-filter: blur(5px);
	}
</style>
