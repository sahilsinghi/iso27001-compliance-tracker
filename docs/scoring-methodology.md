# Scoring Methodology

## Status Weights

Each control state contributes to the implementation score as follows:

| Status | Score Weight | Rationale |
|--------|-------------|-----------|
| Implemented | 1.0 (100%) | Control fully in place with evidence |
| In Progress | 0.5 (50%) | Implementation underway, partial credit |
| Not Started | 0.0 (0%) | No implementation |
| Not Applicable | Excluded | Removed from denominator entirely |

## Per-Theme Percentage

For each of the four Annex A themes:

```
theme_score = sum(status_weight for all applicable controls in theme)
theme_percentage = (theme_score / applicable_control_count) * 100
```

Where `applicable_control_count` excludes Not Applicable controls. If all controls in a theme are marked N/A, the theme percentage is 100% (fully scoped out).

## Composite Implementation Percentage

```
composite = (sum of all applicable control weights) / (total applicable controls) * 100
```

The composite is a weighted average across all four themes, with weights proportional to control count per theme. Organizational (37 controls) has the most influence on composite score.

## Per-Theme Maturity Tiers

| Tier | Threshold | Description |
|------|-----------|-------------|
| Basic | 0–40% | Minimal or no controls in place; significant remediation required |
| Developing | 41–65% | Some controls implemented; material gaps remain |
| Mature | 66–85% | Most controls implemented; ready for gap closure sprint |
| Optimized | 86–100% | Near-complete implementation; focus on evidence and documentation |

These thresholds are aligned to common grading used by ISO 27001 lead auditors conducting preliminary assessments.

## Stage-1 Audit Readiness Verdict

Stage-1 audit is a documentation review — auditors check that policies and procedures exist and are adequate before proceeding to Stage-2 (implementation testing).

| Verdict | Criteria |
|---------|----------|
| **Ready** | Composite ≥ 75% AND every applicable theme ≥ 60% |
| **Borderline** | Composite 50–74%, OR composite ≥ 75% but one or more themes < 60% |
| **Not Ready** | Composite < 50% |

**Caution**: Reaching "Ready" in this tool does not guarantee passing a real Stage-1 audit. It indicates your documentation posture is likely sufficient to proceed. A real Stage-1 auditor will inspect your policy library, scope statement, Statement of Applicability, and risk register in detail.

## Gap Prioritization

Gaps (controls that are Not Started or In Progress) are scored as:

```
gap_score = criticality_weight × status_gap_weight

status_gap_weight:
  Not Started  = 1.0
  In Progress  = 0.5
```

Criticality weights (1–3) per control reflect common audit emphasis:
- **3 (High)**: Foundational governance, access control, incident management, key technical controls
- **2 (Medium)**: Process controls, operational procedures, supplier management
- **1 (Low)**: Supporting administrative controls

Gaps are ranked by `gap_score` descending. Controls with the same gap score are ordered by criticality descending. The top 15 are surfaced in the dashboard.
