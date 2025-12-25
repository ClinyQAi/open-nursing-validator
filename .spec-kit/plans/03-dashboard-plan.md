# Plan 03: Unified Dashboard Implementation

## Status
- [/] Approved

## Approach
1.  **Frontend Setup**:
    - Use `create-vite` to initialize a React + TypeScript project in the `client/` subdirectory.
    - Implement a "Single Source of Truth" validation call to the `/validate-nursing-data` endpoint.
2.  **UI/UX Design**:
    - Use a "Glassmorphism" panel for the JSON editor.
    - Implement NHS Blue (`#005EB8`) as the primary brand color with high-contrast variants.
    - Use `lucide-react` for iconography (Check circles, Alarms, Clipboard).
3.  **Integration**:
    - Configure Vite to build to the root `dist/client` directory.
    - Update `src/app.ts` to serve the static frontend files when a user hits the root `/` in a browser.
4.  **Deployment**:
    - Update `Dockerfile` to perform a two-stage build:
        - Stage A: Build React Frontend.
        - Stage B: Build Express Backend.
        - Stage C: Serve both from the production container.

## Technical Details
- **Frontend**: React 18, Vite, CSS Modules.
- **API Communication**: Relative path fetches (works on same origin).
- **Error Parsing**: Map Zod's `_errors` and `path` arrays to human-readable strings.
