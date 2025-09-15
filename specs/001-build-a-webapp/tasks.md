# Tasks: Neurology Exam Preparation Webapp

**Input**: Design documents from `/specs/001-build-a-webapp/`
**Prerequisites**: plan.md (required), research.md, data-model.md, contracts/

## Execution Flow (main)
```
1. Load plan.md from feature directory
   → If not found: ERROR "No implementation plan found"
   → Extract: tech stack, libraries, structure
2. Load optional design documents:
   → data-model.md: Extract entities → model tasks
   → contracts/: Each file → contract test task
   → research.md: Extract decisions → setup tasks
3. Generate tasks by category:
   → Setup: project init, dependencies, linting
   → Tests: contract tests, integration tests
   → Core: models, services, CLI commands
   → Integration: DB, middleware, logging
   → Polish: unit tests, performance, docs
4. Apply task rules:
   → Different files = mark [P] for parallel
   → Same file = sequential (no [P])
   → Tests before implementation (TDD)
5. Number tasks sequentially (T001, T002...)
6. Generate dependency graph
7. Create parallel execution examples
8. Validate task completeness:
   → All contracts have tests?
   → All entities have models?
   → All endpoints implemented?
9. Return: SUCCESS (tasks ready for execution)
```

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Path Conventions
- **Frontend-only webapp**: `frontend/` directory structure
- All paths relative to repository root

## Phase 3.1: Setup
- [ ] T001 Create frontend directory structure per implementation plan
- [ ] T002 [P] Copy template CSS files (app.css with cyberpunk theme) to frontend/css/
- [ ] T003 [P] Copy neuroanatomy markdown content from template to frontend/content/neuroanat/
- [ ] T004 Create index.html with required DOM structure in frontend/
- [ ] T005 [P] Create test.html for contract testing in frontend/

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**

### Module Contract Tests
- [ ] T006 [P] Contract test for topicLoader module in frontend/tests/contract/test-topic-loader.js
- [ ] T007 [P] Contract test for markdownParser module in frontend/tests/contract/test-markdown-parser.js
- [ ] T008 [P] Contract test for uiManager module in frontend/tests/contract/test-ui-manager.js
- [ ] T009 [P] Contract test for tocGenerator module in frontend/tests/contract/test-toc-generator.js

### Integration Tests
- [ ] T010 [P] Integration test for topic loading flow in frontend/tests/integration/test-topic-loading.js
- [ ] T011 [P] Integration test for section switching in frontend/tests/integration/test-section-switching.js
- [ ] T012 [P] Integration test for TOC navigation in frontend/tests/integration/test-toc-navigation.js
- [ ] T013 [P] Integration test for error handling in frontend/tests/integration/test-error-handling.js

## Phase 3.3: Core Implementation (ONLY after tests are failing)

### Data Models
- [ ] T014 [P] Create Topic model and related entities in frontend/js/models/topic.js
- [ ] T015 [P] Create AppState model in frontend/js/models/app-state.js
- [ ] T016 [P] Create error classes in frontend/js/models/errors.js

### Core Modules
- [ ] T017 [P] Implement markdownParser module in frontend/js/modules/markdown-parser.js
- [ ] T018 [P] Implement tocGenerator module in frontend/js/modules/toc-generator.js
- [ ] T019 Implement topicLoader module with cache in frontend/js/modules/topic-loader.js (depends on T017)
- [ ] T020 Implement uiManager module in frontend/js/modules/ui-manager.js (depends on T018)

### Styling Components
- [ ] T021 [P] Create cyberpunk.css with neon theme variables in frontend/css/
- [ ] T022 [P] Create components.css for UI components in frontend/css/

## Phase 3.4: Integration
- [ ] T023 Create main app.js to wire modules together in frontend/js/
- [ ] T024 Implement event system for module communication
- [ ] T025 Connect topic menu to topicLoader
- [ ] T026 Connect section tabs to content switching
- [ ] T027 Connect TOC to scroll navigation
- [ ] T028 Implement error display system
- [ ] T029 Add loading states and transitions

## Phase 3.5: Polish
- [ ] T030 [P] Add cache statistics display in frontend/js/modules/cache-stats.js
- [ ] T031 [P] Implement smooth scroll behavior for TOC navigation
- [ ] T032 [P] Add keyboard navigation support (arrow keys, tab)
- [ ] T033 Create responsive mobile layout (< 768px)
- [ ] T034 [P] Add performance monitoring and console logging
- [ ] T035 [P] Create user documentation in frontend/docs/user-guide.md
- [ ] T036 Run all quickstart verification steps
- [ ] T037 Performance optimization - ensure < 100ms cached load time

## Dependencies
- Setup (T001-T005) must complete first
- Tests (T006-T013) before any implementation
- Models (T014-T016) can run parallel, before modules
- T017 (markdownParser) blocks T019 (topicLoader)
- T018 (tocGenerator) blocks T020 (uiManager)
- All modules (T017-T020) must complete before integration (T023-T029)
- Integration before polish (T030-T037)

## Parallel Execution Examples

### Parallel Test Creation (Phase 3.2)
```bash
# Launch T006-T009 together (contract tests):
Task: "Contract test for topicLoader module in frontend/tests/contract/test-topic-loader.js"
Task: "Contract test for markdownParser module in frontend/tests/contract/test-markdown-parser.js"
Task: "Contract test for uiManager module in frontend/tests/contract/test-ui-manager.js"
Task: "Contract test for tocGenerator module in frontend/tests/contract/test-toc-generator.js"

# Launch T010-T013 together (integration tests):
Task: "Integration test for topic loading flow in frontend/tests/integration/test-topic-loading.js"
Task: "Integration test for section switching in frontend/tests/integration/test-section-switching.js"
Task: "Integration test for TOC navigation in frontend/tests/integration/test-toc-navigation.js"
Task: "Integration test for error handling in frontend/tests/integration/test-error-handling.js"
```

### Parallel Model Creation (Phase 3.3)
```bash
# Launch T014-T016 together:
Task: "Create Topic model and related entities in frontend/js/models/topic.js"
Task: "Create AppState model in frontend/js/models/app-state.js"
Task: "Create error classes in frontend/js/models/errors.js"
```

### Parallel Independent Modules (Phase 3.3)
```bash
# Launch T017-T018 together (no dependencies):
Task: "Implement markdownParser module in frontend/js/modules/markdown-parser.js"
Task: "Implement tocGenerator module in frontend/js/modules/toc-generator.js"
```

### Parallel Polish Tasks (Phase 3.5)
```bash
# Launch T030, T031, T032, T034, T035 together:
Task: "Add cache statistics display in frontend/js/modules/cache-stats.js"
Task: "Implement smooth scroll behavior for TOC navigation"
Task: "Add keyboard navigation support (arrow keys, tab)"
Task: "Add performance monitoring and console logging"
Task: "Create user documentation in frontend/docs/user-guide.md"
```

## Notes
- [P] tasks = different files, no shared dependencies
- Each module has its own test file for clean TDD
- Verify all tests fail before implementing modules
- Commit after each task with descriptive message
- Use browser console for debugging during development
- Test in multiple browsers during polish phase

## Task Generation Rules
*Applied during main() execution*

1. **From Contracts**:
   - Each module contract → module test task [P]
   - Each module interface → implementation task
   
2. **From Data Model**:
   - Each entity (Topic, Section, TocItem, AppState, ErrorLog) → model task [P]
   - State management → dedicated model file
   
3. **From User Stories**:
   - Topic loading → integration test + implementation
   - Section switching → integration test + implementation
   - TOC navigation → integration test + implementation
   - Error scenarios → integration test + error handling

4. **Ordering**:
   - Setup → Tests → Models → Modules → Integration → Polish
   - Dependencies block parallel execution where files are shared

## Validation Checklist
*GATE: Checked by main() before returning*

- [x] All module contracts have corresponding tests (T006-T009)
- [x] All entities have model tasks (T014-T016)
- [x] All tests come before implementation (Phase 3.2 before 3.3)
- [x] Parallel tasks truly independent (different files)
- [x] Each task specifies exact file path
- [x] No task modifies same file as another [P] task
- [x] Integration tests cover all user scenarios from quickstart
- [x] Polish phase includes performance validation