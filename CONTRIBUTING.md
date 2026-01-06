# Contributing to Open Nursing Validator

Thank you for your interest in contributing to the Open Nursing Validator! This project validates FHIR resources against the Open Nursing Core Implementation Guide (ONC-IG).

## 🎯 Ways to Contribute

### 1. Report Issues
- **Bug Reports**: Found a validation error or incorrect schema?
- **Feature Requests**: Suggest new FHIR profiles or validation rules
- **Documentation**: Help improve documentation or fix typos

### 2. Submit Pull Requests
- **New Schemas**: Add Zod validation schemas for additional FHIR profiles
- **Bug Fixes**: Fix validation logic or TypeScript issues
- **Tests**: Improve test coverage

### 3. Clinical Review
- **Validate clinical accuracy** of FHIR schemas
- **Review LOINC/SNOMED code selections**
- **Suggest improvements** based on nursing practice

---

## 🔧 Development Setup

### Prerequisites
```bash
# Node.js 18+
node --version

# Clone the repository
git clone https://github.com/ClinyQAi/nhs-unified-nursing-validator.git
cd nhs-unified-nursing-validator

# Install dependencies
npm install
```

### Run Locally
```bash
# Start the server
npm start

# Run tests
npm test

# TypeScript check
npx tsc --noEmit
```

---

## 📝 Contribution Guidelines

### Adding New Schemas

1. Create schemas in `src/schemas/oncProfiles.ts`
2. Follow existing Zod schema patterns
3. Use proper LOINC/SNOMED codes from ONC-IG
4. Export types for TypeScript support

Example:
```typescript
export const newObservationSchema = z.object({
    resourceType: z.literal('Observation'),
    status: z.enum(['final', 'preliminary']),
    code: codeableConceptSchema,
    subject: referenceSchema
});
```

### Code Style
- Use TypeScript for all source files
- Follow existing ESLint/Prettier configuration
- Run `npm run lint` before committing

### Commit Messages
Use clear, descriptive commit messages:
```
feat: Add NEWS2 observation schema
fix: Correct Braden scale score range
docs: Update API examples in README
test: Add validation tests for skin tone
```

---

## 🔍 Pull Request Process

1. **Fork** the repository
2. **Create a branch** (`git checkout -b feature/new-schema`)
3. **Make changes** and add tests
4. **Run tests** (`npm test`)
5. **Submit a PR** with clear description

### PR Review Criteria
- ✅ All tests pass
- ✅ TypeScript compiles without errors
- ✅ Follows existing code patterns
- ✅ Schemas align with ONC-IG profiles

---

## 🔗 Resources

- [Open Nursing Core IG](https://clinyqai.github.io/open-nursing-core-ig/) - FHIR profiles this validator supports
- [Zod Documentation](https://zod.dev/) - Schema validation library
- [FHIR R4 Specification](https://hl7.org/fhir/R4/)

---

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

## 📬 Questions?

- Open an [Issue](https://github.com/ClinyQAi/nhs-unified-nursing-validator/issues)
- Contact: Lincoln Gombedza - [Nursing Citizen Development](https://github.com/ClinyQAi)

Thank you for helping improve nursing informatics! 🩺
