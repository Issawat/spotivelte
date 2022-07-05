<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import { WebPlayback } from 'svelte-spotify-web-playback';
	import Player from '../lib/player.svelte';
	import type { PlayerPlugin } from '../types/spotifyWebPlayback';
	let playerPlugin: PlayerPlugin;

	const client_id = 'f9b13ae6ed1c46779c523e9ca17aefe4';
</script>

<WebPlayback {client_id} bind:this={playerPlugin}>
	<Player
		slot="all"
		let:player
		let:state
		let:error
		let:internal
		{playerPlugin}
		playerState={state}
		playerControl={player}
		playerError={error}
		playerInternal={internal}
	/>
</WebPlayback>
