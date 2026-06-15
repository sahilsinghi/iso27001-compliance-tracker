# ISO 27001:2022 Annex A Control Mapping

Full reference table of all 93 controls across the four Annex A themes. Each row matches the corresponding entry in `lib/controls.json`.

> **Note:** This tool uses the ISO 27001:2022 revision (93 controls). Do not reference the deprecated ISO 27001:2013 control numbering (114 controls across 14 clauses).

---

## A.5 — Organizational Controls (37 controls)

| Ref | Control Name | Category | Criticality | Audit Relevance | Implementation Hint (summary) |
|-----|-------------|----------|-------------|-----------------|-------------------------------|
| A.5.1 | Policies for information security | Governance | High | High | Board-approved IS policy, reviewed annually, with named owner and review date |
| A.5.2 | Information security roles and responsibilities | Governance | High | High | RACI matrix, named asset owners, confirmed at onboarding and annually |
| A.5.3 | Segregation of duties | Governance | Medium | Medium | Conflicting duties identified, segregation matrix documented, compensating controls for exceptions |
| A.5.4 | Management responsibilities | Governance | Medium | Medium | Security in manager KPIs, team briefings documented, escalation paths defined |
| A.5.5 | Contact with authorities | Governance | Medium | Medium | CERT-In, MEITY, sector regulator contacts documented, reviewed annually |
| A.5.6 | Contact with special interest groups | Governance | Low | Low | CERT-In advisories, OWASP, sector ISACs subscribed; intelligence actioned and logged |
| A.5.7 | Threat intelligence | Governance | Medium | Medium | TI register updated quarterly; feeds influence risk assessments and control decisions |
| A.5.8 | Information security in project management | Governance | Medium | Medium | Security gate (architecture review, threat model, DPIA) before every IT project go-live |
| A.5.9 | Inventory of information and other associated assets | Asset Management | High | High | Asset register with owner, classification, location, disposal method; annual reconciliation |
| A.5.10 | Acceptable use of information and other associated assets | Asset Management | Medium | Medium | AUP covering devices, internet, email, AI tools; annual acknowledgement |
| A.5.11 | Return of assets | Asset Management | Medium | Medium | Formal return/disposal process integrated with HR offboarding; signed checklist per leaver |
| A.5.12 | Classification of information | Asset Management | High | High | Four-tier scheme (Public/Internal/Confidential/Restricted); decision tree for new documents |
| A.5.13 | Labelling of information | Asset Management | Medium | Medium | Visible classification labels on documents; M365/Google sensitivity labels; periodic audit |
| A.5.14 | Information transfer | Asset Management | Medium | Medium | TLS 1.2+ for Confidential data in transit; approved transfer mechanisms register; NDAs in contracts |
| A.5.15 | Access control | Access Control | High | High | Need-to-know, least privilege policy; semi-annual privileged access reviews; annual standard reviews |
| A.5.16 | Identity management | Access Control | High | High | Joiner-mover-leaver process; no shared accounts; deprovisioning within 24h of termination |
| A.5.17 | Authentication information | Access Control | High | High | MFA for remote access and privileged accounts; password manager; no plaintext transmission |
| A.5.18 | Access rights | Access Control | High | High | Formal request/approval/review/revocation; privileged register; quarterly privileged reviews |
| A.5.19 | Information security in supplier relationships | Supplier Relations | Medium | High | Security requirements agreed contractually before access; supplier register with assessment status |
| A.5.20 | Addressing information security within supplier agreements | Supplier Relations | Medium | High | Standard security schedule: data protection, incident notification, audit rights, data destruction at contract end |
| A.5.21 | Managing information security in the ICT supply chain | Supplier Relations | Medium | Medium | Critical supplier register with security ratings; supply chain in procurement criteria; SBOM |
| A.5.22 | Monitoring, review and change management of supplier services | Supplier Relations | Medium | Medium | Annual supplier security reviews; change notification process; track supplier incidents |
| A.5.23 | Information security for use of cloud services | Supplier Relations | Medium | High | Cloud policy covering residency, classification limits, exit strategy; approved cloud register; CASB |
| A.5.24 | Information security incident management planning and preparation | Incident Management | High | High | IRP with IRT roles, tabletop exercises annually; CERT-In 6-hour and DPDP notification obligations |
| A.5.25 | Assessment and decision on information security events | Incident Management | Medium | Medium | Event severity levels, response timelines, documented triage decisions |
| A.5.26 | Response to information security incidents | Incident Management | High | High | Containment, evidence preservation, stakeholder notification within required timeframes |
| A.5.27 | Learning from information security incidents | Incident Management | Medium | Medium | PIR for every significant incident; lessons fed into risk assessments; remediation tracked to closure |
| A.5.28 | Collection of evidence | Incident Management | Medium | Medium | Chain-of-custody procedures; immutable audit logs ≥12 months; forensically sound collection |
| A.5.29 | Information security during disruption | Business Continuity | Medium | Medium | Security controls in BCP; test controls in fallback environments; document relaxed controls |
| A.5.30 | ICT readiness for business continuity | Business Continuity | Medium | Medium | ICT recovery priorities from BIA; annual failover tests; hot/warm/cold standby documented |
| A.5.31 | Legal, statutory, regulatory and contractual requirements | Compliance | High | High | Register covering IT Act 2000, DPDP Act 2023, CERT-In, RBI/SEBI/IRDAI; annual review |
| A.5.32 | Intellectual property rights | Compliance | Low | Low | Software license register; annual audit; IP obligations in employment and contractor agreements |
| A.5.33 | Protection of records | Compliance | Medium | Medium | Retention periods by record category; controls against loss/falsification; documented disposal |
| A.5.34 | Privacy and protection of personally identifiable information | Compliance | High | High | DPDP Act 2023 program: RoPA, consent mechanisms, DPIAs, Data Principal rights handling |
| A.5.35 | Independent review of information security | Compliance | Medium | High | Annual ISMS audit (internal or external); findings to top management; corrective actions tracked |
| A.5.36 | Compliance with policies, rules and standards for information security | Compliance | Medium | Medium | Manager compliance reviews; compliance schedule; findings into corrective action process |
| A.5.37 | Documented operating procedures | Operations | Medium | Medium | Up-to-date procedures for all IS operations; version controlled; reviewed on change |

---

## A.6 — People Controls (8 controls)

| Ref | Control Name | Category | Criticality | Audit Relevance | Implementation Hint (summary) |
|-----|-------------|----------|-------------|-----------------|-------------------------------|
| A.6.1 | Screening | HR Security | Medium | Medium | Background verification (identity, address, criminal, education, employment) before engagement |
| A.6.2 | Terms and conditions of employment | HR Security | Medium | Medium | IS responsibilities and NDA in employment contracts; consequences of violations stated |
| A.6.3 | Information security awareness, education and training | HR Security | High | High | Annual mandatory training; phishing simulations ≥2/year; completion tracking |
| A.6.4 | Disciplinary process | HR Security | Low | Low | Graduated disciplinary process for IS violations; referenced in employee handbook |
| A.6.5 | Responsibilities after termination or change of employment | HR Security | Medium | Medium | Post-employment confidentiality obligations; exit interview security reminder; access revoked same day |
| A.6.6 | Confidentiality or non-disclosure agreements | HR Security | Medium | Medium | NDA for all parties with data access; register of signed agreements; templates reviewed annually |
| A.6.7 | Remote working | HR Security | Medium | Medium | VPN/zero-trust, MDM-enrolled devices, clean-desk at home, public Wi-Fi prohibition |
| A.6.8 | Information security event reporting | HR Security | High | High | Easy reporting channel, 2-hour target, no-blame culture, measure reports as security culture metric |

---

## A.7 — Physical Controls (14 controls)

| Ref | Control Name | Category | Criticality | Audit Relevance | Implementation Hint (summary) |
|-----|-------------|----------|-------------|-----------------|-------------------------------|
| A.7.1 | Physical security perimeters | Physical Security | Medium | Medium | Defined perimeters (Public/Internal/Restricted zones); stronger controls for server rooms |
| A.7.2 | Physical entry | Physical Security | Medium | Medium | Access cards/biometrics for secure areas; visitor log and escort; quarterly access reviews |
| A.7.3 | Securing offices, rooms and facilities | Physical Security | Medium | Medium | Locked cabinets, clean-desk, locked server rooms, alarm, CCTV; periodic walkthrough |
| A.7.4 | Physical security monitoring | Physical Security | Medium | Medium | CCTV with ≥30-day retention; access log anomaly review; coverage of server/comms rooms |
| A.7.5 | Protecting against physical and environmental threats | Physical Security | Medium | Medium | Threat assessment per facility (flooding, fire, power, civil unrest); documented mitigations |
| A.7.6 | Working in secure areas | Physical Security | Low | Low | No cameras/phones in server rooms; lone-worker protocols; restricted knowledge of secure areas |
| A.7.7 | Clear desk and clear screen | Physical Security | Medium | Medium | Clear-desk policy enforced; auto-lock 10 min; periodic compliance audits |
| A.7.8 | Equipment siting and protection | Physical Security | Low | Low | Racks in locked rooms with temp/humidity control; workstations screened from shoulder-surfing |
| A.7.9 | Security of assets off-premises | Physical Security | Medium | Medium | Full-disk encryption, remote wipe, VPN mandatory, cable locks; 2h reporting SLA for lost devices |
| A.7.10 | Storage media | Physical Security | Medium | Medium | Media register; removable media encrypted; secure disposal via NIST 800-88; certificates retained |
| A.7.11 | Supporting utilities | Physical Security | Medium | Medium | UPS ≥30 min runtime; generator backup; temperature/humidity monitoring with alerts |
| A.7.12 | Cabling security | Physical Security | Low | Low | Cable trays/conduits; power and data separated; labeled; access to patch panels restricted |
| A.7.13 | Equipment maintenance | Physical Security | Low | Low | Maintenance log per asset; only authorized engineers; data sanitized before off-site maintenance |
| A.7.14 | Secure disposal or re-use of equipment | Physical Security | Medium | Medium | NIST 800-88 overwriting or physical shredding; certificate of destruction from vendor |

---

## A.8 — Technological Controls (34 controls)

| Ref | Control Name | Category | Criticality | Audit Relevance | Implementation Hint (summary) |
|-----|-------------|----------|-------------|-----------------|-------------------------------|
| A.8.1 | User endpoint devices | Endpoint Security | High | High | Full-disk encryption, EDR, MDM, OS patching SLA, screen lock; block unmanaged devices |
| A.8.2 | Privileged access rights | Access Control | High | High | PAM with JIT access, no standing privilege, separate accounts, MFA, session recording |
| A.8.3 | Information access restriction | Access Control | High | High | RBAC; application-level access controls; tested in security reviews and after role changes |
| A.8.4 | Access to source code | Access Control | Medium | Medium | Need-to-know repo access; branch protection; code review required; secret scanning in CI |
| A.8.5 | Secure authentication | Access Control | High | High | MFA for all external systems; disable legacy auth; account lockout; phishing-resistant MFA for privileged |
| A.8.6 | Capacity management | Operations | Low | Low | Monitor and alert at 70-80% utilization; quarterly capacity plan; security review for new workloads |
| A.8.7 | Protection against malware | Endpoint Security | High | High | EDR on all endpoints; email gateway; web proxy filtering; signatures auto-updated ≤24h |
| A.8.8 | Management of technical vulnerabilities | Vulnerability Management | High | High | Weekly scans (internet-facing), monthly (internal); SLAs: Critical ≤7d, High ≤30d, Medium ≤90d |
| A.8.9 | Configuration management | Operations | Medium | Medium | CIS Benchmark baselines; IaC enforcement; drift detection; annual baseline review |
| A.8.10 | Information deletion | Data Management | Medium | High | Deletion at end-of-retention; DPDP right to erasure within 72h; deletion logs; backup purge |
| A.8.11 | Data masking | Data Management | Medium | Medium | Masking/pseudonymization in non-production; dynamic masking for limited-visibility outputs |
| A.8.12 | Data leakage prevention | Data Management | Medium | Medium | DLP covering email, web, endpoint, print; daily alert review; USB write blocked |
| A.8.13 | Information backup | Operations | High | High | 3-2-1 rule; quarterly restore tests documented; backups encrypted; RPO/RTO defined per tier |
| A.8.14 | Redundancy of information processing facilities | Operations | Medium | Medium | Multi-AZ for cloud; redundant links; load balancers; annual failover tests aligned to BIA |
| A.8.15 | Logging | Monitoring | High | High | Auth, privileged access, firewall, application error logs; ≥12 months online; tamper-evident |
| A.8.16 | Monitoring activities | Monitoring | Medium | Medium | SIEM with alert rules; alert tiers with SLAs; weekly tuning; MTTD tracked as KPI |
| A.8.17 | Clock synchronization | Operations | Low | Low | NTP hierarchy from authoritative source; drift monitoring; alert threshold >1s for critical systems |
| A.8.18 | Use of privileged utility programs | Access Control | Medium | Medium | Approved utility list; production use requires manager approval; all usage logged |
| A.8.19 | Installation of software on operational systems | Operations | Medium | Medium | Application allowlisting; change management for production; scan for malware before install |
| A.8.20 | Networks security | Network Security | High | High | Network zones (DMZ, production, dev, user); deny-by-default firewalls; annual rule set review |
| A.8.21 | Security of network services | Network Security | Medium | Medium | Security clauses in ISP/network provider contracts; SLA monitoring; provider certs verified annually |
| A.8.22 | Segregation of networks | Network Security | Medium | Medium | VLANs/subnets for production, dev, guest, IoT, management; pen-test confirmed isolation |
| A.8.23 | Web filtering | Network Security | Medium | Medium | DNS or proxy filtering; malware/phishing categories blocked; threat feeds updated daily |
| A.8.24 | Use of cryptography | Cryptography | High | High | AES-256 at rest, TLS 1.2+ in transit; KMS for key management; prohibited algorithms listed |
| A.8.25 | Secure development lifecycle | Secure Development | High | High | Threat modeling, SAST/DAST/SCA in CI/CD; security gate: 0 critical findings before deploy |
| A.8.26 | Application security requirements | Secure Development | Medium | Medium | OWASP Top 10 baseline; security requirements as acceptance criteria; ASVS level defined |
| A.8.27 | Secure system architecture and engineering principles | Secure Development | Medium | Medium | Zero-trust, least privilege, defense in depth; architecture decision records with security rationale |
| A.8.28 | Secure coding | Secure Development | Medium | Medium | Language-specific secure coding standards; SAST enforcement; annual developer training |
| A.8.29 | Security testing in development and acceptance | Secure Development | Medium | Medium | DAST in staging; annual pen test; security acceptance criteria in definition of done |
| A.8.30 | Outsourced development | Secure Development | Medium | Medium | Security clauses in outsourcing contracts; code review rights; background checks for prod access |
| A.8.31 | Separation of development, test and production environments | Secure Development | Medium | Medium | Separate AWS/cloud accounts per environment; production access requires elevated approval |
| A.8.32 | Change management | Operations | Medium | Medium | CAB with security impact assessment; emergency change retrospective within 72h |
| A.8.33 | Test information | Data Management | Medium | Medium | No real personal data in test; synthetic data or DPO-approved masking; post-test deletion |
| A.8.34 | Protection of information systems during audit testing | Operations | Low | Low | Agree scope with system owner; read-only audit access; audit tool approval before use |

---

## DPDP Act 2023 Cross-Mapping

Key controls that overlap with India's Digital Personal Data Protection Act 2023:

| ISO 27001:2022 Control | DPDP Act 2023 Obligation |
|------------------------|--------------------------|
| A.8.10 Information deletion | Section 12 — Right to erasure by Data Principal |
| A.5.34 Privacy and protection of PII | Section 8 — Data Fiduciary obligations |
| A.5.33 Protection of records | Data retention requirements under Rules |
| A.5.19 Supplier security | Section 8(2) — Data Processor obligations |
| A.6.3 Security awareness training | Section 8(5) — Security safeguards obligation |
| A.5.24 Incident management | Section 8(6) — Breach notification obligation |
| A.5.14 Information transfer | Section 16 — Cross-border data transfer restrictions |
| A.8.11 Data masking | Data minimisation principle |

See also: [DPDP Act 2023 Self-Check](https://github.com/sahilsinghi/dpdp-compliance-tool)
