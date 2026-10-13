# PKU-Replay-Saver

Download a complete lecture or its first five minutes, with a progress bar directly
below the video. Saves standard MP4 for Safari/QuickTime and Chrome/Edge, or original
TS. Uses your current login; no FFmpeg, Python, WASM, or server is needed.

## Install

1. Install **Tampermonkey** in your browser.
2. Open **PKU-Replay-Saver.user.js** on GitHub and click **Raw** to install it.
   Alternatively, import the downloaded file through Tampermonkey's dashboard,
   or paste its contents into a new script and save.
3. Reload your logged-in video page and start playback.

When updating an existing installation manually, replace that script's contents.
If scripts don't run in Chrome/Edge, enable **Allow user scripts** in Tampermonkey's
extension settings.

## Download

Click **Download first 5 minutes** to check picture and sound, or **Download full
video** to save the entire recording. The test clip ends at an HLS segment boundary,
so it can be a few seconds longer than five minutes.

Keep the page open until completion. If **Save finished video** appears, click it to
save the completed file. **Cancel** stops the download.

If the stream isn't detected, open **Stream settings** and paste its `.m3u8` URL
from browser DevTools. Complete, combined audio/video HLS recordings are supported;
live streams, DRM, and separate audio playlists are unsupported.

## Credits

Includes [mux.js](https://github.com/videojs/mux.js) 6.3.0 (Apache-2.0) and
[Mediabunny](https://github.com/Vanilagy/mediabunny) 1.61.4 (MPL-2.0).
The downloader's own code is MIT licensed. Full terms are in `LICENSE` and
`THIRD-PARTY-LICENSES.txt`.
# PKU-Replay-Saver
