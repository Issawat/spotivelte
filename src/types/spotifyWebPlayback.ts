import type { WebPlayback } from 'svelte-spotify-web-playback';

export type PlayerPlugin = WebPlayback

export type PlayerControl = PlayerPlugin['$$slot_def']['player']['player'];
export type PlayerState = PlayerPlugin['$$slot_def']['player']['state'];
