# 🌱 MarketQuest

A gentle, gamified path to learning the Indian stock market — designed to not overwhelm.

Built as a single-page web app. No backend, no database, no signup. Progress is saved on your device only.

---

## Features

- **35 bite-sized quests** organized into 10 themed worlds (5-10 minutes each)
- **Streaks, XP, levels, and 15 badges** to build a daily habit
- **Foundation checklist** — the 6 financial prerequisites before risking money
- **Built-in trade journal** for paper trading practice
- **Auto-building glossary** that grows as you complete quests
- **3 themes** (warm, dark, ocean)
- **Mobile-friendly** responsive design
- **All your data stays on your device** — nothing is sent anywhere

The curriculum is honest: it follows SEBI's actual guidance, mentions the 91% loss statistic for F&O traders, warns about pump-and-dump scams, and never recommends specific stocks.

---

## How to deploy on GitHub Pages (the simple way — no command line needed)

This takes about 5 minutes. No coding required.

### Step 1: Create a free GitHub account
Go to [github.com](https://github.com) and sign up if you don't have one.

### Step 2: Create a new repository
1. Click the **+** icon at the top right → **New repository**
2. Name it something like `marketquest` (lowercase, no spaces)
3. Set it to **Public**
4. **Don't** check any of the "Add README" boxes
5. Click **Create repository**

### Step 3: Upload the files
On the new empty repository page:

1. Click the link **"uploading an existing file"** (or use the "Add file" → "Upload files" button)
2. Drag all 4 files from this folder into the upload zone:
   - `index.html`
   - `styles.css`
   - `content.js`
   - `app.js`
3. Scroll down and click **Commit changes**

### Step 4: Turn on GitHub Pages
1. Go to your repository's **Settings** tab (top right)
2. In the left sidebar, click **Pages**
3. Under **Source**, choose **Deploy from a branch**
4. Set branch to **main** and folder to **/ (root)**
5. Click **Save**

Wait 1-2 minutes. Refresh the page. You'll see a message like:

> Your site is live at `https://yourusername.github.io/marketquest/`

That's the link to share with the learner. Bookmark it on the phone home screen — it works like an app.

### Step 5 (optional): Make updates later
To update content or fix anything, just go back to the repo, click any file, click the pencil icon, edit, and commit. Changes go live in ~1 minute.

---

## Alternative: Deploy on Netlify (also free, drag-and-drop)

If GitHub feels intimidating, Netlify is even simpler:

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the entire `marketquest` folder onto the page
3. Done. You get a URL instantly like `https://random-name-123.netlify.app`

You can claim a custom subdomain (free) by signing up.

---

## Try it locally first (optional)

Just open `index.html` in any browser by double-clicking. No setup needed. Works offline once loaded.

If you want to serve it via a tiny local server (cleaner for testing):
```bash
cd marketquest
python3 -m http.server 8000
# Open http://localhost:8000
```

---

## Curriculum overview

The 10 worlds, in deliberate order:

1. **What even IS a stock?** — demystify basics, no jargon
2. **How markets actually work** — exchanges, brokers, orders, costs
3. **Risk: the only thing that matters** — 5 quests, the most important world
4. **Your brain, your enemy** — psychology, biases, FOMO, revenge trades
5. **Reading charts** — just the useful 20% of TA
6. **Reading businesses** — fundamentals, P/E, ROCE
7. **Your first paper trade** — practice with fake money
8. **Build your strategy** — write your own playbook
9. **Stay alive** — drawdowns, when not to trade, scam-spotting
10. **Going live (carefully)** — the pre-live checklist, first 20 trades

The order matters. Risk management comes BEFORE chart reading. Most beginners learn this in reverse and pay tuition to the market.

---

## How to use it

- **5 minutes a day is enough.** Quests are designed to be tiny. Daily streak > marathon sessions.
- **Don't skip ahead.** Quests unlock sequentially. The order is intentional.
- **Visit the Foundation tab early.** Those 6 prerequisites (emergency fund, insurance, debt cleared, etc.) matter more than any quest.
- **The Journal tab waits.** It's for after Quest 25, when paper trading begins.
- **No pressure.** No deadlines. The app celebrates streaks, but missing a day is fine — just pick up tomorrow.

---

## What this app deliberately does NOT do

- Recommend specific stocks
- Connect to a brokerage
- Show live prices
- Send tips or signals
- Sell anything
- Track user data online

This is intentional. The curriculum's whole purpose is to build confidence for independent decisions — not dependence on someone else's calls.

---

## Privacy

Everything lives in the browser's localStorage. Nothing is sent to any server. Clearing browser data resets the app. The "Export my data" button in the menu lets users back up progress as a JSON file.

---

## Tech notes

- Vanilla HTML/CSS/JS — no frameworks, no build step
- Single page application
- ~150KB total, loads instantly
- Works offline after first load
- Compatible with all modern browsers (Chrome, Safari, Firefox, Edge)
- Mobile-first responsive

---

Made with care. Trade safely. 🌱
