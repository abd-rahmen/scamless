# 🛡️ Scamless (سكاملس)
Defensive Anti-Phishing & Fraud Protection Cyber Shield

Protecting everyday citizens and institutions against digital fraud — starting in Tunisia, built for worldwide resilience.

⚠️ Status: Hackathon MVP — built in one day at DevFest Béja 2026 (Vibe Coding Hackathon). The Pre-Entry Warning screen is a scripted demo of a future real-time protection, not live detection, and the Scam Radar uses demo data. See Scope & Limitations.

📌 Executive Summary

Phishing and financial social engineering fraud are widespread across Tunisia and the wider region. People frequently receive deceptive SMS or WhatsApp messages such as:

A bank account "anomaly" that will suspend the account within 24h, linking to a lookalike domain.
A parcel held in customs for a small unpaid fee, redirecting to a suspicious .top or .xyz site.
A "you won a prize" message asking the victim to share an SMS OTP code.
A fake family emergency asking for an urgent money transfer.

Scamless gives instant, plain-language verdicts on links and messages, demonstrates what real-time browser protection would look like, trains reflexes with a short game, and visualizes (demo) regional scam activity.

🌟 Core Features
1. 🔍 Rule-Based Link Scanner
Typosquatting & lookalike domain detection against a list of Tunisian banks, postal/fintech services, telecoms, and global brands (used as illustrative examples only).
Homograph / Punycode (xn--) detection.
Flags URL shorteners, suspicious TLDs (.xyz, .top, .click...), plain HTTP, and bare IP hostnames.
2. 🤖 AI Message Analyzer
Calls the Gemini API through a server-side route (/api/analyze, implemented as Vite middleware — see Architecture Note) to detect social engineering patterns: urgency, fear, reward bait, fake authority, credential harvesting.
Highlights the exact red-flag phrases and gives a plain "what to do now" checklist.
Offline fallback: if no API key is configured or the quota is exhausted, a server-side rule-based heuristic engine (heuristicAnalyzeMessage) takes over automatically — the app keeps working, and the key never reaches the browser.
3. 🚨 Pre-Entry Warning (Demo)
A scripted simulation showing how Scamless would intercept a user before they type card details on a fake bank page, side-by-side with the real domain.
This is a mockup of a planned browser-extension feature — not a live interception.
4. 🎯 Awareness Center & Scam Radar
"Spot the Scam" mini-game with instant feedback.
A regional scam map using demo data, not live reports.
🎨 Design
Animated SVG shield reacting to the risk score (safe / watchful / alert).
One-tap "share warning" card for WhatsApp.
Arabic (RTL), French, and English support.
Nothing pasted into the app is stored — analysis happens in memory only.
🛠️ Tech Stack

Vite + React 18 + TypeScript + Tailwind CSS, with a Node.js server-side API route for Gemini calls. (Originally scaffolded with Next.js 14; switched to Vite after a native binary download failed — no Next.js files remain.)

📂 Project Structure
hackathon/
├── .env.example
├── .gitignore               # ignores node_modules, dist, and all .env* files
├── DEMO_SCRIPT.md
├── index.html
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts           # Vite config + /api/analyze server middleware
│
├── public/
│   ├── icon.svg
│   └── manifest.json
│
└── src/
    ├── App.tsx               # main shell & screen router
    ├── index.css
    ├── main.tsx
    ├── components/
    │   ├── Navbar.tsx
    │   ├── RiskGauge.tsx
    │   ├── RiskShield.tsx
    │   ├── ShareCardModal.tsx
    │   └── screens/
    │       ├── LinkScanner.tsx
    │       ├── MessageAnalyzer.tsx
    │       ├── PreEntryWarning.tsx
    │       └── AwarenessRadar.tsx
    └── lib/
        ├── brandsData.ts
        ├── demoData.ts
        ├── linkAnalyzer.ts
        ├── messageEngine.ts
        └── translations.ts
🧪 Demo Scenarios (preloaded in the UI)
#	Scenario	Channel	Language
1	Bank "account blocked" lookalike link	SMS / Web	French
2	Fake customs fee / parcel scam	SMS	French
3	Fake prize, asking for OTP	SMS	Arabic
4	Fake family emergency transfer	WhatsApp	French
5	Fake remote job, pay-to-register	Telegram	English
6	Legitimate bank OTP notice (control case)	SMS	French

All scenarios are fictional illustrations for awareness and testing — no real institution, real victim, or real transaction is involved.

🚀 Getting Started
bash
git clone <repo-url>
cd hackathon
npm install
cp .env.example .env.local
# edit .env.local and add your own GEMINI_API_KEY (optional — the app works without it)
npm run dev

Open the local address shown in your terminal (typically http://localhost:3000, as configured in vite.config.ts).

If no API key is set, Scamless automatically falls back to its server-side rule-based engine — the app stays fully functional.

🧩 Architecture Note: /api/analyze

/api/analyze is a real server-side route, not a mock:

It's implemented in vite.config.ts via Vite's configureServer hook, using Node's Connect middleware: server.middlewares.use("/api/analyze", ...).
The frontend calls it with a normal fetch("/api/analyze", { method: "POST", ... }), a real HTTP request over TCP.
It runs strictly on the Node server side, so process.env.GEMINI_API_KEY is read on the backend and never exposed to browser code or network inspection.

Dev vs. production: in npm run dev, Vite's dev server serves both the frontend and /api/analyze in one process. In a static production build (vite build), the frontend becomes static files in dist/ — on a static-only host (e.g. GitHub Pages) /api/analyze would not exist. Deploying with working AI analysis requires a host with server support (e.g. a Vercel serverless function at api/analyze.ts, or a small Node server).

🔒 Scope & Limitations
This is a hackathon MVP, not a production security product.
The Pre-Entry Warning screen is a scripted demo, not a live browser interception (a real version would require a browser extension — see Roadmap).
The Scam Radar uses demo data only.
Brand names used in examples are for illustration; Scamless is not affiliated with any bank, telecom, or postal operator mentioned.
🗺️ Roadmap
Browser extension for real-time link interception
Mobile app
Crowdsourced, verified scam reporting
Production deployment with a persistent backend for /api/analyze
🔐 Security Notes
Only .env.example is committed — never commit a real .env or .env.local.
GEMINI_API_KEY is read server-side only, inside the Vite middleware, and is never sent to the browser.
📜 Ethical Scope

Scamless is built exclusively for defensive, educational, and protective purposes. It does not generate phishing templates and does not harvest credentials.
