# Rx/Check — AI Prescription Error Detector

Expo/React Native starter implementing the requested clinical/editorial mobile flow: Home → Patient → Prescription → AI Scan → Results → Final Report.

## Included
- Camera + gallery entry, including multi-photo selection.
- OCR confidence display and editable OCR results.
- Rescan resets only the photo-derived medicine list while retaining patient data.
- Dose validation and standard mg unit field.
- Demo interaction engine and patient-context flags.
- Severity cards, semicircle score gauge, alternatives, PDF export.
- Truemeds + Tata 1mg search links in the report.
- OCR byte-cap and image-header validation.
- Generic gateway error mapping.
- Vitest regression suite + GitHub Actions PR workflow.

## Important clinical limitation
The bundled interaction rules are deliberately a small **demo rule set**. They are not an authoritative clinical database and must not be used for real dispensing decisions. For clinical deployment, connect the interaction/dosing engine to a properly licensed, authoritative source, add validation/quality controls, auditability, privacy/security controls, and complete the applicable medical-device/software regulatory assessment.

## Run
```bash
npm install
npx expo start
```

For an OCR backend, set `EXPO_PUBLIC_OCR_GATEWAY` to your HTTPS OCR endpoint. The gateway should accept multipart `image` uploads and return JSON shaped like:
```json
{"patient":{"name":"...","age":"..."},"medicines":[{"id":"x","name":"Drug","dose":"10","unit":"mg","freq":"1","ocrConfidence":0.96}]}
```

The client enforces a 5 MiB cap and validates PNG/JPEG/WebP magic headers before sending.
