<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import { WebPlayback } from 'svelte-spotify-web-playback';
	import Player from '../lib/player.svelte';
	import type { PlayerControl, PlayerPlugin, PlayerState } from '../types/spotifyWebPlayback';
	let playerPlugin: PlayerPlugin, playerControl: PlayerControl, playerState: PlayerState;

	const client_id = 'f9b13ae6ed1c46779c523e9ca17aefe4';
	const volume = 0.5;

	const handleLogin = () => playerPlugin.login();
</script>

<WebPlayback {client_id} {volume} bind:this={playerPlugin}>
	<button on:click={handleLogin}>Login</button>
	<Player slot="all" {playerControl} {playerState} />
</WebPlayback>
