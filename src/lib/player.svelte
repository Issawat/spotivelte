<script lang="ts">
	import type { PlayerControl, PlayerState } from '../types/spotifyWebPlayback';
	export let playerControl: PlayerControl, playerState: PlayerState;

	const { togglePlay } = playerControl ?? {};
</script>

<div>Player page</div>
