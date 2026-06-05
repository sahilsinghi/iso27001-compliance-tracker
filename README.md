# ISO 27001 Self-Check

**Track your ISO/IEC 27001:2022 compliance posture across all 93 Annex A controls.**

Built for in-house ISMS leads, junior GRC analysts, and external auditors at Indian IT services firms and SaaS companies preparing for first-time ISO 27001 certification.

**Live app → [iso27001-compliance-tracker.vercel.app](https://iso27001-compliance-tracker.vercel.app)**

---

## What It Does

- **All 93 Annex A controls** preloaded across four themes — Organizational (37), People (8), Physical (14), Technological (34)
- **Per-control tracking**: set status (Not Started / In Progress / Implemented / Not Applicable), attach evidence references, add implementation notes
- **Implementation hints**: every control includes a plain-English guidance paragraph drawn from ISO 27002:2022 practice
- **Scoring engine**: composite implementation %, per-theme maturity ratings (Basic → Developing → Mature → Optimized), Stage-1 audit-readiness verdict (Ready / Borderline / Not Ready)
- **Gap analyzer**: top 15 unimplemented controls ranked by criticality weight so you know what to fix first
- **Charts**: theme maturity radar, status distribution by theme, overall donut
- **PDF executive report**: multi-page A4 with cover page, per-theme maturity table, gap list, and per-control detail tables — suitable for sharing with a CISO or external auditor
- **JSON export / import**: back up your assessment, transfer across devices, or share with colleagues via secure file transfer
- **Privacy-first**: all data in `localStorage`, zero server-side storage, zero analytics, zero third-party scripts

---

## ISO 27001:2022 Annex A Themes

| Theme | Controls | Description |
|-------|----------|-------------|
| A.5 Organizational | 37 | Governance, policies, access control, incident management, supplier relations, compliance |
| A.6 People | 8 | Screening, employment terms, security awareness, remote working, event reporting |
| A.7 Physical | 14 | Perimeters, secure areas, equipment protection, environmental threats, media handling |
| A.8 Technological | 34 | Endpoint security, vulnerability management, cryptography, network security, secure development |

This tool uses the **2022 revision** (93 controls). Do not confuse with ISO 27001:2013 (114 controls across 14 clauses) — the two are not interchangeable. Organizations had until October 2025 to transition.

---

## Scoring Methodology

**Status weights**: Implemented = 100%, In Progress = 50%, Not Started = 0%, N/A = excluded from denominator.

**Per-theme maturity tiers**:

| Tier | Threshold |
|------|-----------|
| Basic | 0–40% |
| Developing | 41–65% |
| Mature | 66–85% |
| Optimized | 86–100% |

**Stage-1 audit-readiness verdict**:

| Verdict | Criteria |
|---------|----------|
| Ready | Composite ≥ 75% AND every applicable theme ≥ 60% |
| Borderline | Composite 50–74%, or one theme below 60% |
| Not Ready | Composite < 50% |

A Stage-1 audit is a documentation review. A Stage-2 audit tests whether controls are actually implemented. This tool helps you prepare for Stage-1. Full methodology: [`docs/scoring-methodology.md`](docs/scoring-methodology.md).

---

## Checklist (Definition of Done)

- [x] Live production URL on Vercel with four-theme navigation
- [x] All 93 ISO 27001:2022 Annex A controls with exact references, names, and implementation hints
- [x] localStorage autosave — close browser, return later, pick up where you left off
- [x] Composite % and per-theme maturity compute correctly across edge cases
- [x] Stage-1 readiness verdict with pass/borderline/fail indicator
- [x] PDF executive report with cover, executive summary, theme dashboards, gap list, per-control tables
- [x] Search by control number (e.g., `A.8.13`) or keyword (e.g., `backup`)
- [x] Filter controls by status
- [x] JSON export / import — sample committed under `/examples/`
- [x] 17 Vitest unit tests covering scoring engine and gap analyzer
- [x] README with methodology, scoring thresholds, and privacy architecture
- [x] Sample assessment for Acme Health Pvt Ltd committed under `/examples/`

---

## Tech Stack

| Category | Tool |
|----------|------|
| Framework | Next.js 16 App Router, TypeScript strict mode |
| Styling | Tailwind CSS + shadcn/ui |
| Charts | Recharts |
| PDF | jsPDF + jsPDF-AutoTable |
| State | React useReducer + localStorage |
| Testing | Vitest |
| Hosting | Vercel (hobby tier) |

---

## Run Locally

```bash
git clone https://github.com/sahilsinghi/iso27001-compliance-tracker
cd iso27001-compliance-tracker
npm install
npm run dev        # http://localhost:3000
npm test           # run Vitest suite (17 tests)
npm run build      # production build
```

---

## Privacy Architecture

All assessment data lives in your browser's `localStorage` under the key `iso27001_tracker_v1`. Nothing is transmitted to any server. No analytics. No third-party scripts. The tool works behind a corporate firewall with no outbound data. See [`docs/privacy-architecture.md`](docs/privacy-architecture.md).

---

## Companion Tool

This project is part of a GRC portfolio. See also:

**[DPDP Act 2023 Self-Check](https://github.com/sahilsinghi/dpdp-compliance-tool)** — India's Digital Personal Data Protection Act 2023 compliance tracker

Several controls map directly across both tools:
- A.8.10 Information deletion ↔ DPDP right to erasure
- A.5.34 Privacy and PII protection ↔ DPDP Data Fiduciary obligations
- A.5.33 Records protection ↔ DPDP data retention requirements

---

## Disclaimer

This tool is an **internal preparation aid only**. ISO 27001:2022 certification requires Stage-1 (documentation review) and Stage-2 (implementation testing) audits conducted by a certification body accredited by a member of the International Accreditation Forum (IAF), such as JAS-ANZ, UKAS, or DAkkS. No self-assessment tool can substitute for this process.

Implementation hints in this tool are paraphrased from ISO 27002:2022 guidance and do not reproduce the standard text verbatim.

---

## License

MIT © [Sahil Singhi](https://github.com/sahilsinghi)
