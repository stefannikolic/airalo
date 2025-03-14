# Airalo API Automation Tests

## Overview
This project automates API testing for Airalo's Partner API using **Cypress**. It includes test cases for:
- Authenticating via OAuth2
- Creating an order for eSIMs
- Retrieving and validating eSIM details

## Technologies Used
- **Cypress** (API Testing)
- **JavaScript**
- **Mocha & Chai** (Assertions)

## Prerequisites
Before running the tests, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14+ recommended)
- [Cypress](https://www.cypress.io/)

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/api-airalo-tests.git](https://github.com/stefannikolic/airalo.git

   ```
2. Install dependencies:
   ```sh
   npm install
   ```

## Configuration
### Environment Variables
You can define environment variables in `cypress.config.js` or a `.env` file (if using dotenv).

- `CLIENT_ID` → Airalo API Client ID
- `CLIENT_SECRET` → Airalo API Client Secret

## Test Structure
### **Authentication (Token Retrieval)**
- Retrieves OAuth2 token and stores it for subsequent tests.
- Implemented as a **Cypress Custom Command** (`cy.apiLogin()`).

### **Order Creation (POST Request)**
- Creates an order for **6 merhaba-7days-1gb eSIMs**.
- Extracts and stores **ICCID** values for later validation.

### **eSIMs Validation (GET Requests)**
- Fetches eSIM details using stored **ICCID** values.
- Validates that all 6 eSIMs have the correct **package_id**.

## Running Tests
### Run Cypress tests via CLI:
```sh
npx cypress run
```

### Run Cypress in UI mode:
```sh
npx cypress open
```
