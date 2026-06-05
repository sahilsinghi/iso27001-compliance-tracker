# Privacy Architecture

## Zero Server-Side Storage

ISO 27001 Self-Check stores **all assessment data exclusively in the user's browser** via the Web Storage API (`localStorage`). No data is transmitted to any server. There is no backend, no database, no API that accepts user data, and no analytics or telemetry of any kind.

This architecture was chosen deliberately:

1. **Corporate intranet deployment**: Most Indian ISMS leads will use this tool inside a corporate network where data egress to external SaaS platforms raises DLP alerts or is explicitly prohibited by policy. A zero-egress tool can be used safely without IT security approval.

2. **Sensitive data**: An ISO 27001 gap assessment reveals an organization's security weaknesses. This data should never leave the organization's control.

3. **DPDP Act alignment**: The tool does not collect personal data (company name and assessor name are entered voluntarily and never transmitted), so it avoids all DPDP Act obligations as a data fiduciary.

## localStorage Key

All state is stored under a single versioned key:

```
iso27001_tracker_v1
```

The value is a JSON-serialized `AssessmentState` object. Schema migration is handled on load: if the version field does not match `1`, the stored state is discarded and a fresh state is initialized. This prevents corruption from breaking schema changes in future versions.

## Storage Limits

Browser `localStorage` is limited to approximately **5 MB per origin** (varies by browser). A fully-completed assessment for all 93 controls with detailed notes typically uses 50–150 KB — well within limits.

If a user reaches the localStorage limit (unlikely), the `saveState` function will throw a `QuotaExceededError`. This is not currently handled with a user-facing error; a future version should catch this and prompt the user to export and clear old data.

## Data Portability

The JSON export function (`exportJSON`) downloads the full `AssessmentState` as a timestamped `.json` file. The JSON import function (`importJSON`) validates the schema before loading. This enables:

- **Cross-device transfer**: Export on laptop, import on desktop
- **Team sharing**: ISMS lead exports state, shares file over secure channel (encrypted email, SharePoint, secure file transfer) with auditors or colleagues
- **Backup**: Regular exports serve as point-in-time snapshots

## Self-Hosting

The application is a fully static Next.js export. To self-host on a corporate intranet:

```bash
git clone https://github.com/sahilsinghi/iso27001-compliance-tracker
cd iso27001-compliance-tracker
npm install
npm run build
# Serve the .next/static directory from any static web server
# or use: npx serve .next
```

For air-gapped environments, download the repository as a ZIP from GitHub, build locally, and serve from an internal web server (Nginx, Apache, IIS). No internet connectivity is required at runtime.

## Threat Model

| Threat | Mitigation |
|--------|------------|
| Another browser tab reads the assessment | localStorage is same-origin isolated; no other site can read `iso27001_tracker_v1` |
| Shared device — another user reads assessment | User should use private/incognito mode or export and reset after each session on shared machines |
| Assessment data lost | Export JSON regularly; browser storage can be cleared by the user or browser cleanup tools |
| Sensitive assessment left in browser | Reset button clears `localStorage`. Tool should not be used on unmanaged or personal devices for sensitive assessments. |
