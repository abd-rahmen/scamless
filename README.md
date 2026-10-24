# 🛡️ Scamless (سكاملس)
### Defensive Anti-Phishing & Fraud Protection Cyber Shield
*Protecting everyday citizens and institutions against digital fraud — Starting in Tunisia, built for worldwide resilience.*

[![Status](https://img.shields.io/badge/Status-Hackathon--MVP-emerald)](#)
[![Stack](https://img.shields.io/badge/Stack-Next.js%2014%20%7C%20TypeScript%20%7C%20Tailwind-cyan)](#)
[![AI](https://img.shields.io/badge/AI-Google%20Gemini%201.5%20Flash-blue)](#)
[![Privacy](https://img.shields.io/badge/Privacy-Zero--Storage%20In--Memory-green)](#)
[![Languages](https://img.shields.io/badge/i18n-AR%20(RTL)%20%7C%20FR%20%7C%20EN-orange)](#)

---

## 📌 Executive Summary

Phishing and financial social engineering fraud have exploded across North Africa and the Global South. In Tunisia, everyday citizens frequently receive deceptive SMS messages claiming:
- Their **BIAT**, **Attijari**, **BNA**, or **STB** bank account has an "anomaly" and will be suspended within 24 hours.
- A **Rapid-Poste** parcel is held in customs for unpaid fees of 4.850 DT, redirecting to a `.top` or `.xyz` clone site.
- An **Ooredoo** or **Tunisie Telecom** prize has been won, coaxing them to share a critical SMS OTP code.
- A frantic WhatsApp message from an unfamiliar number pretends to be a son or daughter with a broken phone requesting an urgent **D17** wire transfer.

**Scamless** is a defensive cybersecurity web application designed to level the playing field. It provides instant, clear, non-technical threat verdicts for links and messages, simulates pre-entry browser defense, trains citizen reflexes with an interactive game, and visualizes active fraud campaigns on a regional Scam Radar.

---

## 🌟 Core Features & Modules

### 1. 🔍 Rule-Based Link Scanner
- **Typosquatting & Lookalike Detection:** Calculates Levenshtein distance and leetspeak substitutions against official banks (e.g. `biat-securite.com`, `attijaribank-tn.xyz`, `paypa1.com`).
- **Brand Impersonation Engine:** Compares domain targets against an extensive registry of Tunisian banks (*BIAT, Attijari, BNA, STB, Amen, BH, Zitouna, UIB*), postal and fintech services (*La Poste Tunisienne, D17, Flouci, Rapid-Poste*), telecoms (*Ooredoo, Tunisie Telecom, Orange*), and global giants (*PayPal, Meta, Google, Apple*).
- **Homograph Attack Inspection:** Flags Punycode (`xn--`) and deceptive Cyrillic/Greek substitutions.
- **Concealed URL Shorteners:** Detects services masking real destinations (`bit.ly`, `tinyurl.com`, `t.co`).
- **Suspicious TLDs:** Identifies disposable high-risk extensions (`.xyz`, `.top`, `.click`, `.buzz`, `.cc`).
- **Cryptographic & Protocol Checks:** Identifies unencrypted plain HTTP connections and bare numerical IP hostnames (`http://197.14.52.12/update`).

### 2. 🤖 Gemini AI Message Social Engineering Analyzer
- **Psychological Signal Dissection:** Uses **Google Gemini 1.5 Flash** (via backend route `/api/analyze`) to expose social engineering patterns:
  - *Artificial Urgency:* Tight deadlines ("bloqué sous 24h", "عاجل").
  - *Fear & Intimidation:* Threats of court action, police, or account freezing.
  - *Reward Bait:* Fake lotteries and free mobile recharges.
  - *Fake Authority:* Impersonating postal inspectors, bank managers, or court bailiffs (*huissier de justice*).
  - *Credential Harvesting:* Soliciting OTP codes, CVV, or payment transfers.
- **Inline Red-Flag Highlighting:** Highlights exact deceptive phrases directly in the message text.
- **Action Plan ("What to do right now"):** Concrete, plain-language checklist.
- **Fail-Safe Offline Heuristic Engine:** If `GEMINI_API_KEY` is not present or quota is exhausted, an offline rule-based heuristic engine seamlessly takes over with zero downtime.

### 3. 🚨 Simulated Pre-Entry Warning (Pitch Demo)
- Demonstrates how Scamless intercepts credential submission **before** a victim types their 16-digit bank card number (PAN) or password on an impostor portal.
- Provides side-by-side contrast between the fake impostor domain (`biat-securite-login.xyz`) and the verified official portal (`biat.com.tn`).

### 4. 🎯 Awareness Center & Scam Radar
- **Spot the Scam Mini-Game:** 5 realistic, challenging scenarios with instant scoring, feedback, and clue breakdowns.
- **Regional Scam Radar:** Simulated community threat intelligence feed tracking reported scams across Tunisian governorates, spotlighting the **Béja** delivery scam hotspot.

---

## 🎨 Creative & Inclusive Design Touches
- **Reactive Risk Shield:** An animated SVG shield that changes color, expressions, and posture:
  - 🟢 **Safe:** Confident, smiling face with security crest sparkle.
  - 🟡 **Suspicious:** Vigilant, skeptical face with raised eyebrow.
  - 🔴 **Scam:** Alert, determined defensive face with glowing warning aura.
- **Radial Risk Gauge:** Smoothly animated SVG meter with risk scores from 0 to 100.
- **1-Click Family Warning Card:** Formatted warning text with 1-click clipboard copy and WhatsApp link for sharing with non-technical parents and relatives.
- **Tri-Lingual Localization:** Native support for **Arabic (العربية with proper RTL)**, **French (Français)**, and **English**, auto-detecting the message language.
- **Zero-Log Privacy Guarantee:** Pasted messages and links are analyzed in memory and never persisted.

---

## 📂 Project Architecture

```
scamless/
├── .env.example              # API key template (GEMINI_API_KEY)
├── README.md                 # Full documentation
├── DEMO_SCRIPT.md            # 2-minute pitch & live demonstration script
├── package.json              # Next.js 14, React 18, Tailwind, Lucide
├── tsconfig.json             # TypeScript configuration
├── tailwind.config.ts        # Cyber theme tokens & animations
├── public/
│   ├── manifest.json         # PWA Manifest
│   └── icon.svg              # Defensive Shield SVG Icon
└── src/
    ├── app/
    │   ├── layout.tsx        # HTML wrapper, fonts, metadata
    │   ├── page.tsx          # Main application shell & screen router
    │   ├── globals.css       # Custom animations, glow effects, RTL rules
    │   └── api/
    │       └── analyze/
    │           └── route.ts  # Gemini API backend endpoint + fallback
    ├── components/
    │   ├── Navbar.tsx        # Top header with logo, language selector, privacy pill
    │   ├── RiskShield.tsx    # Animated expressive SVG shield
    │   ├── RiskGauge.tsx     # Animated SVG radial risk gauge (0-100)
    │   ├── ShareCardModal.tsx# 1-click warning card generator for WhatsApp
    │   └── screens/
    │       ├── LinkScanner.tsx     # Screen 1: URL threat inspector
    │       ├── MessageAnalyzer.tsx # Screen 2: Gemini social engineering engine
    │       ├── PreEntryWarning.tsx # Screen 3: Interception simulation
    │       └── AwarenessRadar.tsx  # Screen 4: Mini-game & Béja Radar
    └── lib/
        ├── brandsData.ts     # Tunisian & global brand profiles
        ├── linkAnalyzer.ts   # Rule-based domain & threat analyzer
        ├── messageEngine.ts  # Social engineering analyzer & prompt builder
        ├── demoData.ts       # 6 demo scam samples, quiz scenarios, radar data
        └── translations.ts   # AR / FR / EN dictionaries & RTL helpers
```

---

## 🧪 6 Realistic Demo Scam Samples (Preloaded in UI)

| # | Scenario | Channel | Target / Lure | Language |
|---|---|---|---|---|
| **1** | **Tunisian Bank Urgent Block** | SMS / Web | BIAT / Attijari "Compte bloqué sous 24h" → `biat-securite-login.xyz` | French |
| **2** | **La Poste / Rapid-Poste** | SMS | Faux frais de douane de 4.850 DT → `poste-tn-d17-suivi.top` | French |
| **3** | **Telecom Fake Prize Bait** | SMS / Derja | Ooredoo/TT "مبروك ربحت 500 د رصيد، ابعث كود الـ OTP" | Arabic |
| **4** | **WhatsApp Family Emergency** | WhatsApp | "Coucou Maman, téléphone cassé, virement D17 urgent pour loyer" | French |
| **5** | **Fake Remote Job Offer** | Telegram | "Earn 200 DT/day liking videos, pay 35 DT registration fee" | English |
| **6** | **Legitimate Bank OTP Notice** | SMS | Authentic BIAT confirmation code with explicit "Never share this code" | French |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (tested on Node v24)
- npm 9+

### 1. Clone & Install
```bash
git clone <repo-url>
cd scamless
npm install
```

### 2. Configure Environment Variables (Optional)
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Edit `.env.local` with your Google Gemini API key:
```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
```
> **Note:** If no key is configured, Scamless automatically uses its built-in rule-based heuristic engine so the entire app works flawlessly offline or during evaluations!

### 3. Run Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🔒 Defensive Mission & Ethical Scope
Scamless is built exclusively for **defensive, educational, and protective purposes**. It does not generate phishing templates or harvest user credentials. All demo cases are clearly simulated scenarios designed to elevate public awareness and bolster digital safety in Tunisia and beyond.
