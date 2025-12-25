# NHS Unified Nursing Validator

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![FHIR R4](https://img.shields.io/badge/FHIR-R4-blue.svg)](https://hl7.org/fhir/R4/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-brightgreen.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.4+-blue.svg)](https://www.typescriptlang.org/)

---

## Overview

The **NHS Unified Nursing Validator** is a TypeScript/Node.js REST API service that validates FHIR resources against the [Open Nursing Core Implementation Guide (ONC-IG)](https://clinyqai.github.io/open-nursing-core-ig/).

**Author:** Lincoln Gombedza - [Nursing Citizen Development](https://github.com/ClinyQAi)

---

## 🎯 Supported FHIR Profiles

| Profile | Description | FHIR Resource |
|---------|-------------|---------------|
| **Braden Scale Assessment** | Pressure ulcer risk (scores 6-23) | Observation |
| **Skin Tone Observation** | Fitzpatrick/Monk skin type | Observation |
| **Nursing Problem** | Nursing diagnoses | Condition |
| **Patient Goal** | Patient-centered goals | Goal |
| **Nursing Intervention** | Care activities | Procedure |
| **Goal Evaluation** | Outcome assessment | Observation |
| **NHS Patient** | Patient with ethnic category | Patient |

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

The API will be available at `http://localhost:3000`

---

## 📡 API Usage

### Validate a FHIR Resource

**Endpoint:** `POST /api/validate`

**Request:**
```bash
curl -X POST http://localhost:3000/api/validate \
  -H "Content-Type: application/json" \
  -d '{
    "resourceType": "Observation",
    "status": "final",
    "code": {
      "coding": [{
        "system": "http://loinc.org",
        "code": "38222-1",
        "display": "Braden scale total score"
      }]
    },
    "subject": {
      "reference": "Patient/123"
    },
    "valueInteger": 18
  }'
```

**Response (Valid):**
```json
{
  "isValid": true
}
```

**Response (Invalid):**
```json
{
  "isValid": false,
  "errors": {
    "status": { "_errors": ["Required"] }
  }
}
```

---

## 📂 Project Structure

```
nhs-unified-nursing-validator/
├── src/
│   ├── server.ts           # Entry point
│   ├── app.ts              # Express configuration
│   ├── controllers/        # Request handlers
│   ├── routes/             # API routes
│   ├── services/           # Business logic
│   ├── schemas/
│   │   ├── fhirSchemas.ts  # Base FHIR schemas
│   │   └── oncProfiles.ts  # ONC-IG specific schemas
│   ├── validators/         # Core validation
│   └── tests/              # Jest tests
├── package.json
└── tsconfig.json
```

---

## 🔗 Related Projects

- **[Open Nursing Core IG](https://clinyqai.github.io/open-nursing-core-ig/)** - The FHIR Implementation Guide this validator is built for
- **[ClinyQAi](https://github.com/ClinyQAi)** - Nursing Citizen Development organization

---

## 🧪 Testing

```bash
npm test
```

---

## 🤝 Contributing

Contributions are welcome! Please submit a pull request or open an issue.

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `npm test`
5. Submit a pull request

---

## ⚖️ License

This project is licensed under the **MIT License**.

> This work supports the Open Nursing Core Implementation Guide, inspired by research from the Foundation of Nursing Studies (FoNS).

---

## 📬 Contact

- **Author:** Lincoln Gombedza
- **Organization:** [Nursing Citizen Development](https://github.com/ClinyQAi)
- **Issues:** [GitHub Issues](https://github.com/ClinyQAi/nhs-unified-nursing-validator/issues)