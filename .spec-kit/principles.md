# Project Principles - NHS Unified Nursing Validator

These principles guide the development and evolution of the NHS Unified Nursing Validator.

## 🩺 Clinical Accuracy
- **ONC-IG as Source of Truth**: All validation logic must strictly align with the [Open Nursing Core Implementation Guide](https://clinyqai.github.io/open-nursing-core-ig/).
- **Standardized Coding**: Use standard healthcare terminologies (LOINC, SNOMED-CT) as defined in the IG.
- **FHIR R4**: Maintain full compatibility with the HL7 FHIR R4 specification.

## 🛠️ Technical Excellence
- **TypeScript First**: Leverage strong typing to prevent runtime errors and catch schema mismatches.
- **Spec-Driven Development**: Requirements must be documented in the `.spec-kit/specs` folder before implementation.
- **Robust CI/CD**: No code should be merged without passing automated tests and linting.
- **Minimalist Runtime**: Use lean production images and optimized multi-stage builds.

## 🤝 Open Source & Community
- **Documented Intent**: Code should be readable and its intent clearly explained in `README.md` and `CONTRIBUTING.md`.
- **Contribution Friendly**: Maintain a low barrier to entry for external contributors while keeping quality high.
- **Transparency**: The development process, including plans and tasks, should be visible to the community.

## 🏗️ Architecture
- **Stateless API**: Maintain a stateless approach for easy scaling on cloud platforms (Azure Container Apps).
- **Zod for Validation**: Use Zod as the primary engine for runtime schema verification.
- **Separation of Concerns**: Keep business logic (services), validation logic (schemas/validators), and transport logic (routes/controllers) distinct.
