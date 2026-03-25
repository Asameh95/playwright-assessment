# Geidea Senior Test Automation Engineer — Playwright Framework Assessment
This repository implements end-to-end UI and API automation for (https://automationexercise.com) using Playwright with TypeScript. It follows Page Object Model architecture, environment-driven config, dynamic test data, and hybrid API-UI validation.

*Setup*
git clone (https://github.com/ahmedsameh-geidea/playwright-assessment.git)
cd playwright-assessment
npm install
npx playwright install
npm i --save-dev @types/node

Run full test suite:
npx playwright test --reporter=html

Run specific group:
npx playwright test tests/ui/auth.spec.ts
npx playwright test tests/api/products.api.spec.ts

View HTML report:
npx playwright show-report

Define credentials and test data roles in .env file:
TEST_USER_EMAIL=test@demo.com
TEST_USER_PASSWORD=123456

Update Name, Email, FirstName and LastName in utils/test-data for new user creation

