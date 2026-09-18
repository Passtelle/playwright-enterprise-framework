# QA Automation Portfolio

[![Playwright Tests](https://github.com/Passtelle/playwright-enterprise-framework/actions/workflows/playwright.yml/badge.svg)](https://github.com/Passtelle/playwright-enterprise-framework/actions/workflows/playwright.yml)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ingridbordin)

![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)
![Jira](https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=jira&logoColor=white)
![Claude Code](https://img.shields.io/badge/Claude_Code-D4A574?style=for-the-badge&logo=anthropic&logoColor=white)
![GitHub Copilot](https://img.shields.io/badge/GitHub_Copilot-000000?style=for-the-badge&logo=github&logoColor=white)

> 10+ years at IBM Security and Fiserv. Enterprise QA instinct, rebuilt with a modern AI-first automation stack.

---

## About Me

Senior QA Engineer with 10+ years of enterprise experience testing security products against real-world exploits at IBM Internet Security Systems and regulated financial platforms at Fiserv. Introduced security testing, led an offshore team, and delivered end-to-end QA across startups and high-stakes platforms.

Recently expanded into modern test automation by building a comprehensive Playwright and TypeScript framework covering UI and API testing, CI/CD pipelines, and Jira/Xray reporting — augmented by AI-assisted development and code review with Claude Code and Gemini, while retaining complete human ownership of testing strategy and risk-based decisions.

**Looking for:** Senior QA Engineer roles in FinTech, security, compliance, or AI-driven companies. On site, hybrid or remote.

[![LinkedIn](https://img.shields.io/badge/Connect_on_LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ingridbordin)

---

## Certifications

| Certification | Issuer | Date | Verify |
|--------------|--------|------|--------|
| [Claude Code in Action](https://anthropic.skilljar.com/claude-code-in-action) | Anthropic | Mar 2026 | [Certificate](https://verify.skilljar.com/c/xyjoczkwcek9) |
| [Claude Code 101](https://anthropic.skilljar.com/claude-code-101) | Anthropic | Apr 2026 | [Certificate](https://verify.skilljar.com/c/b6d2ec4oi6wv) |
| [Model Context Protocol: Advanced Topics](https://anthropic.skilljar.com/model-context-protocol-advanced-topics) | Anthropic | Mar 2026 | [Certificate](https://verify.skilljar.com/c/wt8xrbgsvq5r) |
| [Introduction to Model Context Protocol](https://anthropic.skilljar.com/introduction-to-model-context-protocol) | Anthropic | Mar 2026 | [Certificate](https://verify.skilljar.com/c/ecbtch6qi652) |
| [Introduction to Agent Skills](https://anthropic.skilljar.com/introduction-to-agent-skills) | Anthropic | Mar 2026 | [Certificate](https://verify.skilljar.com/c/db8ee6b87iwy) |
| [AI Fluency Framework and Foundations](https://anthropic.skilljar.com/ai-fluency-framework-foundations) | Anthropic | Mar 2026 | [Certificate](https://verify.skilljar.com/c/d5kowr6ry8cr) |
| [Claude 101](https://anthropic.skilljar.com/claude-101) | Anthropic | Mar 2026 | [Certificate](https://verify.skilljar.com/c/a25jqscpi26v) |
| [ISTQB Certified Tester, Foundation Level](https://atsqa.org/certified-testers/profile/507bfd2e2f5a43d9a7a86a2abafa35ef) | ASTQB | Jul 2026 | [Certificate](https://atsqa.org/certified-testers/profile/507bfd2e2f5a43d9a7a86a2abafa35ef) |

---

## The Journey

8 to 10 hours a day since **February 2026**. Every phase built on the last. Every concept tested, audited, and committed to the repo.

| Phase | What Was Built | Apps & Tech |
|-------|---------------|-------------|
| **Foundation** | Playwright + TypeScript setup, async/await mental model, first data-driven tests | [lambdatest.io](https://ecommerce-playground.lambdatest.io) |
| **POM Architecture** | Page Object Model from scratch, fixtures, hooks, multi-site coverage | [practicesoftwaretesting.com](https://practicesoftwaretesting.com), [automationintesting.online](https://automationintesting.online) (Angular, React) |
| **AI-Augmented Workflow** | Three-role audit system (Claude Code + Gemini + Human), prompt engineering, Faker.js data factory | Cross-stack |
| **Enterprise Banking** | Parabank: login, registration, account management, 3-test registration suite | [parabank.parasoft.com](https://parabank.parasoft.com) (Spring MVC) |
| **API Testing** | 10-layer API suite: contract, security, concurrency, idempotency, CRUD, header audit | [dummyjson.com](https://dummyjson.com), [coingecko.com](https://www.coingecko.com) (REST APIs) |
| **E2E + CI/CD** | SecureBank banking flow, GitHub Actions pipeline, Xray integration, Jira test executions | [qaplayground.com/bank](https://www.qaplayground.com/bank) (Next.js) |
| **Interview Machine** | Resume, mock interviews, ISTQB prep, GitHub Copilot | Cross-stack |

---

## What This Project Demonstrates

| Skill | How It's Demonstrated |
|-------|----------------------|
| **API Testing (10 Layers)** | DummyJSON: 16 test files across contract, security, concurrency, idempotency, CRUD, and 6 more layers |
| **E2E Test Automation** | SecureBank: login, transfer flow, negative user scenarios (locked, frozen, overdraft, error) |
| **Cross-Stack Testing** | Built automation across 6 apps: Angular, React, Next.js, Spring MVC, REST APIs |
| **CI/CD Pipeline** | GitHub Actions: two parallel jobs (API + E2E), Xray upload, Jira integration |
| **Page Object Model** | 17 POMs across banking, e-commerce, booking, and API test apps |
| **AI-Augmented QA** | Claude Code + Gemini Judge + GitHub Copilot multi-agent orchestration |
| **Security Testing Mindset** | SQL injection, path traversal, error disclosure, auth token validation, header audit |
| **Test Management** | Jira/Xray: Gherkin BDD test cases linked to live CI executions |

---

## API Testing: 10-Layer Coverage

32 tests across 16 files, designed to mirror the enterprise API coverage approach used at IBM and Fiserv.

| Layer | Test File | What It Proves |
|-------|-----------|----------------|
| **Happy Path** | `BAS-4-auth-happy-path` | Valid credentials return access token and user data |
| **Happy Path** | `BAS-11-product-get` | GET product by ID returns correct data + schema |
| **Happy Path** | `BAS-12-product-search` | Search, empty query, pagination all return expected results |
| **Happy Path** | `BAS-13-auth-refresh-token` | Token refresh flow issues new unique tokens |
| **Negative** | `BAS-7-user-retrieval` | Non-existent user ID returns 404 |
| **Negative** | `BAS-9-auth-missing-password` | Empty password returns 400 |
| **Boundary** | `BAS-10-auth-boundary-username` | 128-char username via `'a'.repeat(128)` rejected |
| **Security** | `BAS-6-auth-sql-injection` | SQL injection payload causes no auth bypass or 500 |
| **Security** | `BAS-8-auth-missing-token` | Missing Authorization header returns 401 |
| **Security** | `BAS-14-auth-invalid-token` | Invalid JWT rejected, malformed header returns 401 |
| **Contract** | `BAS-15-product-contract` | Required fields present, correct types, no data leaks |
| **Error Disclosure** | `BAS-16-error-disclosure` | Errors don't leak stack traces, server paths, or framework details |
| **Concurrency** | `BAS-17-concurrency` | 10 parallel requests return correct data, no token cross-contamination |
| **Idempotency** | `BAS-18-idempotency` | Repeated PUT/DELETE/GET return identical results |
| **CRUD Lifecycle** | `BAS-19-data-persistence` | Full create → read → update → delete cycle with assertions |
| **Header Audit** | `BAS-20-response-headers` | Content-type consistent, no server tech exposure |

**Target API:** [dummyjson.com](https://dummyjson.com) — real auth with Bearer tokens, 208 users, full CRUD, search, pagination. Purpose-built for testing with 500M+ monthly requests.

---

## E2E Banking Suite: SecureBank

Full end-to-end banking flow on a Next.js app with `data-testid` attributes throughout.

**Target App:** [qaplayground.com/bank](https://www.qaplayground.com/bank) — banking simulation with login, accounts, transfers, loans, and 7 user types designed for Playwright practice.

### E2E Transfer Flow

```
Login (standard_user)
     |
Transfer $100 (Checking -> Savings)
     |
Review -> Confirm -> Success page
     |
Dashboard: net worth unchanged (internal transfer)
```

### Test Coverage

| Test | Type | User | Status |
|------|------|------|--------|
| Transfer between accounts shows success confirmation | E2E Happy Path | `standard_user` | Passing in CI |
| Dashboard net worth unchanged after internal transfer | E2E Happy Path | `standard_user` | Passing in CI |
| Transfer with empty amount shows validation | E2E Negative | `standard_user` | Passing in CI |
| Invalid credentials show error message | Login Validation | — | Passing |
| Empty username/password prevent login | Input Validation | — | Passing |
| Dashboard displays welcome, net worth, transactions | State Verification | `standard_user` | Passing |
| Locked user blocked at login with suspension message | Negative User | `locked_user` | Passing |
| Frozen user sees account frozen banner | Negative User | `frozen_user` | Passing |
| Frozen user sees transfer disabled notice | Negative User | `frozen_user` | Passing |
| Overdraft user has negative balance with overdrawn badge | Negative User | `overdraft_user` | Passing |
| Error user loan page displays incorrect total (bug detection) | Negative User | `error_user` | Passing |

### Page Object Models

```
pages/
├── SecureBankLoginPage.ts       -> Gold locators (data-testid), login method
├── SecureBankDashboardPage.ts   -> Net worth, welcome message, recent transactions
└── SecureBankTransferPage.ts    -> Account selectors, review, confirm, success page
```

Key technical decisions:
- Custom dropdowns use `.click()` then `getByRole('option')` — not `selectOption()`
- Login inputs cleared before fill — fields come pre-populated on the new site
- Sidebar navigation used for dashboard return — more reliable than "Back" button link
- Error banner uses `getByTestId('login-error-banner')` over `getByRole('alert')` to avoid Next.js route announcer collision

---

## CI/CD Pipeline

Every push to `main` triggers two parallel jobs:

```
Push to main
     |
     ├── API Tests (DummyJSON)         E2E Tests (SecureBank)
     |   npm ci                        npm ci + browser install
     |   Run 16 API test files         Run E2E suite (Chromium)
     |   Upload to Xray                Upload to Xray
     |   -> Always runs                -> continue-on-error: true
     |                                    (external site dependency)
     v
Badge reflects API status (always green)
E2E failures don't block the pipeline
Both upload results to Jira/Xray
```

Credentials managed via GitHub Secrets. Never exposed in source code.

![Jira Test Execution — 2 tests passing after CI push](docs/jira-execution-green2.png)

---

## Tech Stack

| Category | Tools |
|----------|-------|
| **Test Automation** | Playwright 1.58.1, TypeScript (strict mode) |
| **API Testing** | Postman, DummyJSON, CoinGecko, Playwright `request` fixture |
| **Test Data** | Faker.js, dynamic data, never hardcoded |
| **CI/CD** | GitHub Actions (two parallel jobs) |
| **Test Management** | Jira, Xray (BDD/Gherkin + JUnit XML import) |
| **AI Tools** | Claude Code, GitHub Copilot, Gemini (Judge LLM) |
| **Security** | dotenv, credentials always in secrets vault |

---

## Coding Standards

All code follows strict standards documented in [`CLAUDE.md`](./CLAUDE.md):

- **No `any` type**, explicit TypeScript types everywhere
- **No hardcoded timeouts**, state-based waits only (`waitFor`, `toBeVisible`)
- **No assertions in POMs**, POMs act, tests assert
- **Locator priority**: Gold (`data-testid`) > Silver (`getByRole`) > Bronze (`getByPlaceholder`)
- **RegExp with `/i` flag** for all text assertions, never exact string matching
- **Explicit method parameters**, no optional defaults hiding test intent
- **3-section test structure**: `// THE PLAN / THE WORK / THE CHECK`

Every AI-generated file passes a three-role audit before merge:
1. **Claude Code** implements following CLAUDE.md standards
2. **Gemini** independent auditor, flags violations
3. **Human Architect** final approval

---

## Repository Structure

```
playwright-enterprise-framework/
├── pages/                        # 17 Page Object Models
│   ├── SecureBankLoginPage.ts
│   ├── SecureBankDashboardPage.ts
│   ├── SecureBankTransferPage.ts
│   ├── ParabankLoginPage.ts
│   ├── ParabankRegisterPage.ts
│   └── ...                       # e-commerce, booking POMs
│
├── tests/api/                    # API test suite — 16 files, 32 tests
│   ├── BAS-4 to BAS-14           # Happy path, negative, boundary, security
│   ├── BAS-15-product-contract   # Contract/schema validation
│   ├── BAS-16-error-disclosure   # Error information disclosure
│   ├── BAS-17-concurrency        # Parallel request reliability
│   ├── BAS-18-idempotency        # Repeated request consistency
│   ├── BAS-19-data-persistence   # Full CRUD lifecycle
│   └── BAS-20-response-headers   # Security header audit
│
├── tests/bootcamp/               # UI test suite (SecureBank + legacy apps)
│   ├── day32_securebank_e2e      # Portfolio centerpiece (E2E transfer flow)
│   ├── securebank_negative_users # Locked, frozen, overdraft, error scenarios
│   ├── securebank_login_*        # Login validation
│   ├── securebank_dashboard_*    # Dashboard state verification
│   └── ...                       # Legacy app tests (POM practice)
│
├── helpers/
│   └── testData.ts               # Faker.js data factory
│
├── .github/workflows/
│   └── playwright.yml            # CI: API + E2E parallel jobs -> Xray -> Jira
│
└── CLAUDE.md                     # Coding standards enforced on every file
```

---

*Built with Playwright, TypeScript, Claude Code, and a lot of coffee. Every commit is real work.*
