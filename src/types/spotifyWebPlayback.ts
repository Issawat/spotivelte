import type { WebPlayback } from 'svelte-spotify-web-playback';

export type PlayerPlugin = WebPlayback;

export type PlayerProps = PlayerPlugin['$$slot_def']['all'];

export type PlayerControl = PlayerProps['player'];
export type PlayerState = PlayerProps['state'];
export type PlayerInternal = PlayerProps['internal'];
export type PlayerError = PlayerProps['error'];
