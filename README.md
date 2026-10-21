# 🐕 DOGE BUY — Retro Pixel-Art Dogecoin Demo (Single-Screen)

A funny, Dogecoin-themed, **one-viewport** website with a retro arcade / pixel-art aesthetic
and a fully functional DOGE *calculator* — in **demo mode only**.

> ⚠️ **Demo / parody project.** No real payments, no payment provider is contacted, no
> cryptocurrency is bought, sold or transferred, and **no card details or wallet seed
> phrases are ever collected**. The DOGE price used by the calculator is a user-controlled
> **demo price**, not a market quote. Not financial advice. Not affiliated with Dogecoin or PayPal.

---

## ✨ What's on the single screen

| Region | Contents |
|---|---|
| **Top bar** | Pixel Shiba + frog logo, `DOGE BUY` wordmark, `DEMO` chip, HOME / BUY DOGE / ABOUT / FAQ, `TO THE MOON!` button |
| **Left** | Big pixel Shiba mascot with sunglasses + “GOOD DOGE ONLY!” speech bubble, three feature highlights |
| **Centre** | `BUY DOGECOIN` pixel headline, ribbon subtitle, cream purchase panel (amount → payment method → estimate → Buy Now) |
| **Right** | Pixel frog mascot with speech bubble, Dogecoin pile, “Small Steps Big Doge!!” scribble |
| **Footer strip** | 4 step icons + “Much wow. Such demo. Very simple.” |

* `BUY DOGECOIN` and the ribbon are now hidden behind the top-left mascot stack on small screens.

### Layout rules
- `body { height:100vh / 100dvh; overflow:hidden }` → **no vertical or horizontal page scrolling**.
- CSS **Grid** for the 3-column stage + panel columns, **Flexbox** for the header, perks, footer and controls.
- Everything is sized with `clamp()` using `vh`/`vw` units, so it scales with the viewport.
- The receipt/summary block has its own `max-height` + internal scroll so the layout can never break.
- Under **1000 px wide** (or very short windows, < 520 px tall) the page switches to a stacked,
  scrollable layout — usability beats forcing an unreadable single screen, and no control is clipped.

---

## 📁 Project structure

```
/
├── index.html          ← single-screen markup (links ./style.css, ./script.js, ./assets/*)
├── style.css           ← layout, pixel-art scenery, responsive rules
├── script.js           ← calculator, quick amounts, payment selection, demo confirmation, modal
├── README.md
└── assets/             ← all graphics
    ├── Background.png      ★ Full-stage artwork background (sunset valley, doge, frog, coins)
    ├── LOGO.png            ★ Main banner logo (FROGINALS wordmark + mascots, transparent PNG)
    ├── rocket.svg          Rocket with doge pilot (animated, overlays the background)
    ├── coin.svg            Gold Dogecoin with Ð (panel, footer, favicon)
    ├── paypal.svg          PayPal mark (decorative)
    ├── card.svg            Pixel credit / debit card
    ├── wallet.svg          Pixel wallet
    ├── shiba-face.svg      Small Shiba head (footer step 4)
    ├── sparkle.svg         Pixel star (perk icon)
    ├── paw.svg             Paw print (footer tagline)
    └── doge-mascot.svg / frog-mascot.svg / coin-pile.svg / cloud.svg / mountain.svg
                            (legacy pixel art, superseded by Background.png — kept for reuse)
```

> **Note:** place the two supplied PNGs at `assets/Background.png` and `assets/LOGO.png`.
> If you keep them in the project root instead (`./Background.png`, `./LOGO.png`),
> the site detects that automatically and falls back to those paths.

The background is applied with `background-size: cover` + `center bottom` positioning, so it
always fills the stage with no stretching or distortion (edges crop gracefully on narrow
screens, where it switches to `center top`). The logo is rendered at its original aspect
ratio (`width:auto; object-fit:contain`) with `image-rendering:pixelated` so its pixel edges
stay sharp — the file itself is untouched.

All paths are **relative** (e.g. `assets/coin.svg`, `style.css`), so they work from `file://`
and from a GitHub Pages project URL such as `https://<user>.github.io/<repo>/`.

---

## ▶️ Run and test locally

**Option 1 — just open it**
Double-click `index.html`. Everything works from `file://` (only Google Fonts comes from a CDN).

**Option 2 — local server (closest to GitHub Pages)**
```bash
cd path/to/doge-buy
python3 -m http.server 8000      # then open http://localhost:8000
# or:  npx serve .
# or:  npx http-server -p 8000
```
**VS Code:** *Live Server* extension → right-click `index.html` → “Open with Live Server”.

### Test checklist
1. Type an amount → “You Receive” updates instantly.
2. Click **$10 / $25 / $50 / $100** → input + estimate update, the button highlights.
3. Drag the **demo price** slider → price label, echo text and estimate all update; **Reset demo price** returns to $0.2200.
4. Switch **PayPal ↔ Credit / Debit Card** → the highlight ring moves.
5. Click **Buy Now** → a dark, clearly labelled *“DEMO ONLY — NOTHING WAS PURCHASED”* summary appears inside the panel.
6. Enter `0` → inline validation message appears.
7. Click **ABOUT** / **FAQ** → a modal opens (no page scroll needed); close with ✕, backdrop or `Esc`.
8. Click **TO THE MOON!** → the USD field is focused and selected.
9. Resize 1440 → 1280 → 1024 → 768 → 390 px: check nothing overlaps or clips. Below 1000 px the layout stacks and scrolls.

---

## 🚀 Publish on GitHub Pages

```bash
git init
git add index.html style.css script.js README.md assets
git commit -m "DOGE BUY single-screen demo site"
git branch -M main
git remote add origin https://github.com/<your-user>/<your-repo>.git
git push -u origin main
```

Then **Settings → Pages → Source: “Deploy from a branch” → Branch: `main` / `/ (root)` → Save.**
Live at `https://<your-user>.github.io/<your-repo>/` after a minute or two.

---

## 🛠 Tech & 🔒 Safety

Plain HTML5 + CSS3 + vanilla JS. No frameworks, no build step, no package installs, no APIs.
Only external resource: Google Fonts (*Press Start 2P*, *Nunito*) — delete those two `<link>`
tags for a fully offline build. All artwork is hand-written SVG in `assets/`.

- No card fields, bank data, passwords, private keys or seed phrases — anywhere.
- No wallet connection, no blockchain call, no outbound request of any kind.
- “Buy Now” never claims a purchase; it always says the action is demo-only.

Much wow. Such demo. Very simple. 🐾
