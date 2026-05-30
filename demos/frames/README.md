# demos/frames/

Drop your sequential JPGs in this folder.

## Naming convention

```
frame-001.jpg
frame-002.jpg
...
frame-240.jpg
```

Zero-padded to 3 digits. The page loads them with the pattern
`frames/frame-${String(n).padStart(3, '0')}.jpg`.

## Defaults

- **Count**: 240 frames (matches the standard EZGif extraction at 30 FPS for ~8 seconds of video). Change `TOTAL_FRAMES` in `showcase.html` if your sequence is different.
- **Format**: JPG. PNG works too if you change the file extension in `FRAME_PATH`.
- **Size**: aim for ~150–200 KB per frame. 240 × 200 KB = ~48 MB total. Anything above ~300 KB per frame and the first paint gets sluggish.
- **Dimensions**: any aspect ratio. The canvas does a cover-fit so frames fill the viewport without distortion.

## Switching modes

In `showcase.html` near the top of the `<script>` block:

```js
const MODE = 'procedural';   // change to 'frames' when your JPGs are here
```

Set to `'frames'`, reload, done.

If a frame fails to load (404, network error), the page automatically falls back to the procedural placeholder for that one frame index — so a partial set still works.

## Optimization tips

- **Re-encode** with `cwebp` or `mozjpeg` for ~30% smaller files at same visual quality
- If you have a video, you can also use **WebCodecs** to decode on-the-fly (more advanced — ask Claude if you want to go there)
- For a final production page, consider a **CDN** for the frames folder (Cloudflare, BunnyCDN — both free at this volume)

## Why not real 3D?

See `REFERENCES.md` at the repo root. Short version: real-time WebGL gives worse fidelity for product shots than pre-rendered for an order of magnitude more code.
