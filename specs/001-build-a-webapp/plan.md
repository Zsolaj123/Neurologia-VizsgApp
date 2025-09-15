# Implementation Plan: Neurology Exam Preparation Webapp


**Branch**: `001-build-a-webapp` | **Date**: 2025-09-14 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-build-a-webapp/spec.md`

## Execution Flow (/plan command scope)
```
1. Load feature spec from Input path
   → If not found: ERROR "No feature spec at {path}"
2. Fill Technical Context (scan for NEEDS CLARIFICATION)
   → Detect Project Type from context (web=frontend+backend, mobile=app+api)
   → Set Structure Decision based on project type
3. Evaluate Constitution Check section below
   → If violations exist: Document in Complexity Tracking
   → If no justification possible: ERROR "Simplify approach first"
   → Update Progress Tracking: Initial Constitution Check
4. Execute Phase 0 → research.md
   → If NEEDS CLARIFICATION remain: ERROR "Resolve unknowns"
5. Execute Phase 1 → contracts, data-model.md, quickstart.md, agent-specific template file (e.g., `CLAUDE.md` for Claude Code, `.github/copilot-instructions.md` for GitHub Copilot, or `GEMINI.md` for Gemini CLI).
6. Re-evaluate Constitution Check section
   → If new violations: Refactor design, return to Phase 1
   → Update Progress Tracking: Post-Design Constitution Check
7. Plan Phase 2 → Describe task generation approach (DO NOT create tasks.md)
8. STOP - Ready for /tasks command
```

**IMPORTANT**: The /plan command STOPS at step 7. Phases 2-4 are executed by other commands:
- Phase 2: /tasks command creates tasks.md
- Phase 3-4: Implementation execution (manual or via tools)

## Summary
Building a neurology exam preparation webapp for medical students that displays and navigates Hungarian exam topics (tételek). The first iteration focuses on properly loading and styling markdown documents for neuroanatomy topics (1-60) with separate sections for detailed content, summaries, and images. Using vanilla JavaScript, HTML, and CSS with a green neon cyberpunk theme borrowed from the template project.

## Technical Context
**Language/Version**: Vanilla JavaScript (ES6+), HTML5, CSS3  
**Primary Dependencies**: None (vanilla implementation as requested)  
**Storage**: Local markdown files in filesystem structure  
**Testing**: Browser-based manual testing initially  
**Target Platform**: Modern web browsers (Chrome, Firefox, Safari, Edge)
**Project Type**: web - static frontend application  
**Performance Goals**: Instant markdown rendering (<100ms), smooth scrolling navigation  
**Constraints**: No external libraries, must handle Hungarian text properly, preserve template styling  
**Scale/Scope**: 60 topics initially (neuroanatomy), expandable to 259 topics total

## Constitution Check
*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Simplicity**:
- Projects: 1 (frontend only - no backend needed for static markdown files)
- Using framework directly? YES (vanilla JS, no wrapper classes)
- Single data model? YES (Topic entity only)
- Avoiding patterns? YES (no unnecessary patterns, direct implementation)

**Architecture**:
- EVERY feature as library? Planning modular JS modules for:
  - markdown-parser: Parse and render markdown content
  - topic-loader: Load topic files from filesystem
  - toc-generator: Generate table of contents from headers
  - ui-manager: Handle UI state and interactions
- Libraries listed: See above with clear purposes
- CLI per library: N/A for browser-based application
- Library docs: Will include inline JSDoc comments

**Testing (NON-NEGOTIABLE)**:
- RED-GREEN-Refactor cycle enforced? Will implement browser-based test page
- Git commits show tests before implementation? YES
- Order: Contract→Integration→E2E→Unit strictly followed? Adapted for frontend
- Real dependencies used? Browser environment only
- Integration tests for: Topic loading, markdown rendering, UI interactions
- FORBIDDEN: Implementation before test, skipping RED phase

**Observability**:
- Structured logging included? Console logging with levels
- Frontend logs → backend? N/A (no backend)
- Error context sufficient? Error boundaries for failed topic loads

**Versioning**:
- Version number assigned? 1.0.0
- BUILD increments on every change? YES
- Breaking changes handled? N/A for initial version

## Project Structure

### Documentation (this feature)
```
specs/[###-feature]/
├── plan.md              # This file (/plan command output)
├── research.md          # Phase 0 output (/plan command)
├── data-model.md        # Phase 1 output (/plan command)
├── quickstart.md        # Phase 1 output (/plan command)
├── contracts/           # Phase 1 output (/plan command)
└── tasks.md             # Phase 2 output (/tasks command - NOT created by /plan)
```

### Source Code (repository root)
```
# Option 1: Single project (DEFAULT)
src/
├── models/
├── services/
├── cli/
└── lib/

tests/
├── contract/
├── integration/
└── unit/

# Option 2: Web application (when "frontend" + "backend" detected)
backend/
├── src/
│   ├── models/
│   ├── services/
│   └── api/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/

# Option 3: Mobile + API (when "iOS/Android" detected)
api/
└── [same as backend above]

ios/ or android/
└── [platform-specific structure]
```

**Structure Decision**: Option 2 (Web application) - Frontend only structure since no backend is needed

## Phase 0: Outline & Research
1. **Extract unknowns from Technical Context** above:
   - For each NEEDS CLARIFICATION → research task
   - For each dependency → best practices task
   - For each integration → patterns task

2. **Generate and dispatch research agents**:
   ```
   For each unknown in Technical Context:
     Task: "Research {unknown} for {feature context}"
   For each technology choice:
     Task: "Find best practices for {tech} in {domain}"
   ```

3. **Consolidate findings** in `research.md` using format:
   - Decision: [what was chosen]
   - Rationale: [why chosen]
   - Alternatives considered: [what else evaluated]

**Output**: research.md with all NEEDS CLARIFICATION resolved

## Phase 1: Design & Contracts
*Prerequisites: research.md complete*

1. **Extract entities from feature spec** → `data-model.md`:
   - Entity name, fields, relationships
   - Validation rules from requirements
   - State transitions if applicable

2. **Generate API contracts** from functional requirements:
   - For each user action → endpoint
   - Use standard REST/GraphQL patterns
   - Output OpenAPI/GraphQL schema to `/contracts/`

3. **Generate contract tests** from contracts:
   - One test file per endpoint
   - Assert request/response schemas
   - Tests must fail (no implementation yet)

4. **Extract test scenarios** from user stories:
   - Each story → integration test scenario
   - Quickstart test = story validation steps

5. **Update agent file incrementally** (O(1) operation):
   - Run `/scripts/bash/update-agent-context.sh claude` for your AI assistant
   - If exists: Add only NEW tech from current plan
   - Preserve manual additions between markers
   - Update recent changes (keep last 3)
   - Keep under 150 lines for token efficiency
   - Output to repository root

**Output**: data-model.md, /contracts/*, failing tests, quickstart.md, agent-specific file

## Phase 2: Task Planning Approach
*This section describes what the /tasks command will do - DO NOT execute during /plan*

**Task Generation Strategy**:
- Load `/templates/tasks-template.md` as base
- Generate tasks from Phase 1 design docs (contracts, data model, quickstart)
- Frontend-focused tasks for vanilla JS implementation
- Each module → contract test task [P]
- Each UI component → implementation task
- Integration tests for user scenarios

**Ordering Strategy**:
- TDD order: Tests before implementation 
- Dependency order: 
  1. HTML structure and CSS setup
  2. Core modules (markdown parser, topic loader)
  3. UI manager and interactions
  4. Integration and polish
- Mark [P] for parallel execution (independent files)

**Task Categories**:
1. **Setup Tasks** (1-5): Project structure, HTML, CSS
2. **Module Tests** (6-15): Contract tests for each module [P]
3. **Module Implementation** (16-25): Implement modules to pass tests
4. **Integration Tasks** (26-30): Wire modules together, test flows
5. **Polish Tasks** (31-35): Error handling, performance, final touches

**Estimated Output**: 35 numbered, ordered tasks in tasks.md

**IMPORTANT**: This phase is executed by the /tasks command, NOT by /plan

## Phase 3+: Future Implementation
*These phases are beyond the scope of the /plan command*

**Phase 3**: Task execution (/tasks command creates tasks.md)  
**Phase 4**: Implementation (execute tasks.md following constitutional principles)  
**Phase 5**: Validation (run tests, execute quickstart.md, performance validation)

## Complexity Tracking
*Fill ONLY if Constitution Check has violations that must be justified*

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |


## Progress Tracking
*This checklist is updated during execution flow*

**Phase Status**:
- [x] Phase 0: Research complete (/plan command)
- [x] Phase 1: Design complete (/plan command)
- [x] Phase 2: Task planning complete (/plan command - describe approach only)
- [ ] Phase 3: Tasks generated (/tasks command)
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Gate Status**:
- [x] Initial Constitution Check: PASS
- [x] Post-Design Constitution Check: PASS
- [x] All NEEDS CLARIFICATION resolved
- [x] Complexity deviations documented (none needed)

---
*Based on Constitution v2.1.1 - See `/memory/constitution.md`*