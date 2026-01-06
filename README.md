# Open Nursing Validator

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![FHIR R4](https://img.shields.io/badge/FHIR-R4-blue.svg)](https://hl7.org/fhir/R4/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-brightgreen.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.4+-blue.svg)](https://www.typescriptlang.org/)
[![Status](https://img.shields.io/badge/Status-Production%20Ready-success)](https://github.com/ClinyQAi/nhs-unified-nursing-validator)

The **Open Nursing Validator** is an intelligent, open-source validation engine tailored for the [Open Nursing Core Implementation Guide (ONC-IG)](https://clinyqai.github.io/open-nursing-core-ig/). 

Built by **Nursing Citizen Developers**, it bridges the gap between technical FHIR standards and clinical reality, ensuring that nursing data is both interoperable and clinically accurate.

---

## 🌟 Key Features

### 🧠 Smart Profile Detection
Submitting raw FHIR resources? No problem. The validator automatically detects clinical codes (e.g., `88330-6` for NEWS2) and injects the correct ONC profile metadata before validation.

### 💬 Nurse-Friendly Error Messages
We translate technical validation errors into plain English.
- **Before:** `valueInteger: too_big (maximum: 6)`
- **After:** _"MUST Score cannot exceed 6"_

### 🏗️ Robust Architecture
- **Inheritance-Based Schemas:** Specialized profiles extend foundational resource schemas.
- **Centralized Terminology:** Single source of truth for all LOINC/SNOMED codes.
- **Interactive Dashboard:** Includes a React-based UI for testing and visualization.

---

## 🎯 Supported Clinical Profiles

We currently support full validation for **15+ nursing assessments** and resources:

| Category | Profiles |
|----------|----------|
| **Vitals & Acuity** | NEWS2 Score, Glasgow Coma Scale (GCS) |
| **Skin & Wound** | Braden Scale, Waterlow (Planned), Wound Assessment, Skin Tone (Fitzpatrick) |
| **Nutrition & Elimination** | MUST Score, Bristol Stool Chart |
| **Pain & Comfort** | Pain Assessment (NRS 0-10), Abbey Pain Scale |
| **Functional Status** | Clinical Frailty Scale, Oral Health (ROAG) |
| **Care Planning** | Nursing Problem (Condition), Patient Goal, Nursing Intervention (Procedure), Goal Evaluation |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/ClinyQAi/nhs-unified-nursing-validator.git
cd nhs-unified-nursing-validator
npm install
```

### Run the Server

```bash
npm start
```

The API will be available at `http://localhost:3000`.

### Run the Interactive Dashboard

```bash
cd client
npm install
npm run dev
```

---

## 📡 API Usage

### Validate a Resource

**Endpoint:** `POST /api/validate`

**Example Request:**
```bash
curl -X POST http://localhost:3000/api/validate \
  -H "Content-Type: application/json" \
  -d '{
    "resourceType": "Observation",
    "status": "final",
    "code": { "coding": [{ "system": "http://loinc.org", "code": "88330-6" }] },
    "subject": { "reference": "Patient/123" },
    "valueInteger": 3,
    "effectiveDateTime": "2024-01-20T10:00:00Z"
  }'
```

**Response:**
```json
{
  "isValid": true
}
```

---

## 📂 Project Structure

```
nhs-unified-nursing-validator/
├── src/
│   ├── schemas/            # Zod Schemas
│   │   ├── oncProfiles.ts    # Nursing Profile Definitions
│   │   ├── oncTerminology.ts # Centralized Codes (LOINC/SNOMED)
│   │   └── fhirSchemas.ts    # Base FHIR Resources
│   ├── utils/
│   │   ├── profileInjector.ts # Auto-detection logic
│   │   └── errorMapper.ts     # Friendly error translation
│   ├── validators/         # Validation Logic
│   └── tests/              # Jest Unit Tests
├── client/                 # React Interactive Dashboard
└── package.json
```

---

## 🔗 Related Projects

- **[Open Nursing Core IG](https://clinyqai.github.io/open-nursing-core-ig/)** - The official HL7 FHIR Implementation Guide.
- **[ClinyQAi](https://github.com/ClinyQAi)** - Open source tools for nursing innovation.

---

## 🤝 Contributing

We welcome contributions from nurses, developers, and everyone in between!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-profile`)
3. Commit your changes
4. Run tests: `npm test`
5. Open a Pull Request

---

## ⚖️ License

This project is licensed under the **MIT License**.

> **Note:** This work is inspired by research from the **Foundation of Nursing Studies (FoNS)** and powered by the Nursing Citizen Development movement.