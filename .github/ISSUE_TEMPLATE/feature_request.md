---
name: Feature request
about: Suggest an idea for this project
title: ''
labels: ''
assignees: ''

---

Feature Request: Evidence-Based Drug Interaction & Clinical Verification

Is your feature request related to a problem? Please describe.

Rx/Check currently needs a more reliable and transparent way to identify drug interactions, dosage concerns, contraindications, allergies, and patient-specific risks.

I’m concerned that showing an AI-generated interaction result without clearly displaying the supporting clinical evidence could reduce user trust and may create safety risks if the application is eventually used beyond an educational/research prototype.

Users also need to understand why a medicine has been flagged, how severe the issue is, and whether the result requires pharmacist/clinician verification.

Describe the solution you'd like

Add an Evidence-Based Clinical Verification Layer to Rx/Check.

The proposed workflow is:

Patient + Prescription Input
↓
Validated Drug Database
↓
Drug–Drug Interaction Engine
↓
Patient-Specific Safety Checks
↓
AI Explanation
↓
Severity + Clinical Evidence
↓
Pharmacist/Clinician Verification
↓
Recommendation / Alert

For every detected issue, the result card should display:

- Drug name(s)
- Dose and frequency
- Interaction/error type
- Severity: High / Moderate / Low
- Clear explanation of the potential concern
- Patient-specific factors contributing to the alert
- Clinical evidence/reference
- Date/source information where available
- Recommended next action
- "Pharmacist/Clinician verification required" where appropriate

The system should distinguish between:

- Confirmed database finding
- Potential interaction
- AI-generated explanation
- Clinical recommendation requiring professional verification

Add an Evidence button to each result card so users can inspect the source behind an alert.

Suggested additional functionality

1. Interaction details

Example:

Warfarin + Ibuprofen

🔴 Potential interaction — High

Concern: Increased bleeding risk.

Why flagged: Both medicines can contribute to bleeding risk.

Action: Clinical/pharmacist review recommended.

Evidence: [Clinical reference]

---

2. Patient-specific checking

Use the collected patient information to check:

- Age
- Weight
- Allergy history
- Pregnancy status
- Kidney disease
- Liver disease
- Existing medicines
- Duplicate therapy

The system should avoid making an autonomous prescribing decision.

3. Confidence and verification

Display:

OCR confidence: 96%

Interaction evidence: Verified against configured reference database

AI explanation: Generated from the detected interaction

Clinical verification: Required

4. Safe fallback

If the drug or interaction cannot be confidently identified:

«⚠️ Unable to confidently verify this medicine. Please rescan the prescription or enter the medicine manually.»

The app should not invent a drug, dosage, interaction, or recommendation.

Describe alternatives you've considered

Alternative 1 — AI-only interaction detection

Use an LLM to identify interactions directly from the prescription.

This would be simpler, but it could introduce hallucinated drug names, interactions, or dosage information. Therefore, AI should explain validated information rather than act as the sole clinical source.

Alternative 2 — Static interaction rules

Maintain a small local database of known interactions.

This would work well for a prototype but would not scale adequately for comprehensive clinical coverage and would require a reliable update mechanism.

Alternative 3 — External clinical database/API

Connect Rx/Check to an authoritative and appropriately licensed drug-information source.

This would provide a stronger foundation for production use, subject to licensing, validation, privacy, security, and applicable regulatory requirements.

Additional context

Rx/Check is intended as a clinical/pharmacy safety tool prototype.

The application should maintain a clear distinction between:

Information → Safety Alert → Clinical Verification → Recommendation

The app should not present itself as replacing a pharmacist or physician.

The final report should contain:

- Rx/Check application name
- Patient details
- Prescription medicines
- OCR confidence
- Detected errors/interactions
- Severity
- Clinical explanation
- Evidence/source
- Suggested alternatives
- Verification status
- Overall risk score
- Risk level
- Timestamp
- Truemeds/Tata 1mg links for applicable medicine suggestions
- Clear educational/research or clinical-use disclaimer

This feature would make the application's drug-interaction workflow more transparent, auditable, and suitable for future validation.
