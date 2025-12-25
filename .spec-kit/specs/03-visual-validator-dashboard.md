# Spec 03: Visual Validator Dashboard

## Status
- [x] Specify
- [x] Plan
- [x] Tasks
- [x] Implement

## Overview
A "Premium" single-page web interface for the NHS Unified Nursing Validator. It allows users to interactively validate FHIR resources without using command-line tools.

## User Journeys
1. **Clinical Analyst**: Copies a JSON snippet of a Braden Scale assessment from their EHR, pastes it into the dashboard, and clicks "Validate". They immediately see a clear green "Valid" or red "Errors Found" status with specific guidance on what to fix.

## Functional Requirements
- **JSON Editor**: A syntax-highlighting text area for pasting FHIR JSON.
- **Validation Engine**: Real-time or button-triggered calls to the `/validate-nursing-data` API.
- **Visual Feedback**:
    - "Pass" state: High-contrast green styling, success checkmark.
    - "Fail" state: List of specific Zod errors mapped to FHIR paths.
- **Templates**: Buttons to pre-load valid examples (NEWS2, Braden Scale, Skin Tone).
- **Branding**: NHS-inspired (Blue/White) but with a modern, "Premium" feel (Glassmorphism, smooth transitions).

## Design Constraints
- **Responsiveness**: Must work perfectly on tablets and desktops.
- **No Login**: Initially public-facing for ease of use.
- **Tech Stack**: React + Vite + Vanilla CSS (Premium Aesthetics).

## Success Metrics
- A user can validate a resource in under 5 seconds from landing on the page.
- Errors are displayed in a human-readable format, not just raw Zod JSON.
