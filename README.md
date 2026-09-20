# website

Personal portfolio for [@tunnellight392](https://github.com/tunnellight392) — a static
site, served by GitHub Pages.

**Live at:** https://tunnellight392.github.io/website/

## Files

| Path                 | What it is                                                   |
| -------------------- | ------------------------------------------------------------ |
| `index.html`         | The whole page. All copy lives here.                          |
| `styles.css`         | Design tokens at the top, then components.                    |
| `main.js`            | Theme toggle, platform filter, screenshot lightbox.           |
| `assets/favicon.svg` | Tab icon.                                                     |
| `assets/screens/`    | App screenshots, downscaled to 720px tall.                    |
| `.nojekyll`          | Tells Pages to serve the files as-is, without running Jekyll. |

No build step, no dependencies, no package manager. Edit a file, commit, push — Pages
redeploys within a minute or so.

## Turning on GitHub Pages

Once this is pushed: **Settings → Pages → Source: Deploy from a branch**, branch `main`,
folder `/ (root)`. Save, then wait for the first deploy.

## Editing

**Adding a project.** Copy any `<li class="card">` block in `index.html` and change its
contents. One attribute matters: `data-platform`, set to `android`, `ios` or `wear` — it
drives the filter buttons.

If you add a project, bump the counts in the filter buttons and in the `.figures` block
in the hero, since both are written into the markup by hand.

**Adding screenshots.** Only `converter-app` and `simple-data-face` ship images today, so
only those two appear in the Screens section. To add another app:

1. Capture on a device or emulator, then downscale before committing — these were run
   through `sips -Z 720 shot.png --out shot.png`, which takes a 1080×1920 capture to about
   60&nbsp;KB. Name them `<app>-<nn>_<what>.png` in `assets/screens/`.
2. Copy a `<li class="shot">` block in the Screens section of `index.html`. Each one needs
   a `data-src` and `data-caption` on the button (the lightbox reads both), a real `alt`
   describing what the screen shows, and `width`/`height` matching the file so the page
   doesn't jump while images load.
3. Wrap the group in its own `<div class="shots">` with a heading, the way Unit Converter
   and Simple Data Face are.

**Changing colours.** Every colour is a custom property declared in three places in
`styles.css`: the base `:root` block (light), the `prefers-color-scheme: dark` block, and
the `[data-theme="dark"]` block. Change a token in all three and it updates everywhere.

## A note on the content

The copy describes what the repositories actually contain — the feature lists come from
the source, `strings.xml` and the Play Store listing kept in `converter-app`. If an app
changes, the page won't notice; update it here.
