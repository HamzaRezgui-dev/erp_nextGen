# 🏢 ERP-NextGen Backend

A powerful, multi-company, and modular Enterprise Resource Planning (ERP) system designed for scalability and maintainability.

## ## 📖 About The Project

This repository contains the backend source code for **ERP-NextGen**. It's built using Node.js and Express.js, following a **Modular Monolith** architecture. This approach provides the simplicity of a single deployment unit while enforcing strong logical boundaries between different business domains, making the system easy to scale and maintain over time.

The core of the system is designed for **multi-tenancy**, allowing multiple companies to operate in complete isolation on the same platform, each with their own data, users, and configurations.

### ### Key Features ✨

- **Core**: Multi-company tenancy, user authentication, and role management.
- **CRM**: Lead, quote, and interaction management with third-party integrations.
- **Stock Management**: Real-time stock movements, inventory tracking, and low-level alerts.
- **HR & Payroll**: Employee, contract, and leave management with secure payslip generation.
- **Accounting & Invoicing**: General ledger, bank statement imports, and a full quote-to-invoice-to-payment lifecycle.
- **Fleet Management**: Tracking of IT and vehicle assets, including maintenance schedules.
- **Statistics**: Aggregated data endpoints to power frontend dashboards.

---

## ## 🚀 Tech Stack

This project is built with modern and robust technologies:

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL (or any SQL database compatible with Sequelize)
- **ORM**: Sequelize
- **Authentication**: Passport.js with JSON Web Tokens (JWT)
- **Validation**: Joi
- **Scheduled Jobs**: node-cron

---

## ## ⚙️ Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### ### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (v18.x or later recommended)
- NPM
- PostgreSQL (or another SQL database)
- Git

### ### Installation & Setup

1.  **Clone the repository**

    ```bash
    git clone [https://github.com/HamzaRezgui-dev/erp_nextGen](https://github.com/HamzaRezgui-dev/erp_nextGen)
    cd erp-backend
    ```

2.  **Install NPM packages**

    ```bash
    npm install
    ```

3.  **Set up environment variables**
    Create a `.env` file in the root of the project by copying the example file.

    ```bash
    cp .env.example .env
    ```

    Now, open the `.env` file and fill in the required values (database credentials, JWT secret, etc.). See the [Environment Variables](#-environment-variables) section below for details.

4.  **Run database migrations**
    (Assuming you have `sequelize-cli` installed and configured)
    ```bash
    npx sequelize-cli db:migrate
    ```

### ### Running the Application

- **Development Mode** (with hot-reloading via `nodemon`)

  ```bash
  npm run dev
  ```

- **Production Mode**
  `bash
    npm start
    `
  The server will start on the port specified in your `.env` file (e.g., `http://localhost:3000`).

---

## ## 🔑 API Endpoints & Usage

The API is versioned and all routes are prefixed with `/api/v1`.

### ### Authentication

- `POST /api/v1/auth/register`: Create a new user account.
- `POST /api/v1/auth/login`: Log in and receive a JWT.

### ### Authenticated Requests

All protected endpoints require an `Authorization` header with a Bearer Token.

```
Authorization: Bearer <your_jwt_token>
```

For all requests related to a specific company's data, you must also include a custom header specifying the active company ID.

```
X-Company-ID: <company_id>
```

A full API documentation collection (e.g., for Postman) will be provided separately.

---

## ## 🌍 Environment Variables

These variables must be defined in your `.env` file for the application to work correctly.

| Variable         | Description                                                   | Example Value                 |
| ---------------- | ------------------------------------------------------------- | ----------------------------- |
| `NODE_ENV`       | The application environment.                                  | `development`                 |
| `PORT`           | The port the server will run on.                              | `3000`                        |
| `DB_HOST`        | The hostname of your database server.                         | `localhost`                   |
| `DB_USER`        | The username for your database.                               | `postgres`                    |
| `DB_PASSWORD`    | The password for your database user.                          | `password`                    |
| `DB_NAME`        | The name of the database.                                     | `erp_dev`                     |
| `DB_DIALECT`     | The dialect for Sequelize (e.g., postgres, mysql).            | `postgres`                    |
| `JWT_SECRET`     | A long, random, and secret string for signing JWTs.           | `a_very_long_secret`          |
| `JWT_EXPIRES_IN` | The expiration time for JWTs.                                 | `1d`                          |
| `AES_SECRET_KEY` | 32-character secret for encrypting sensitive data (salaries). | `your_32_char_aes_secret_key` |

---

## ## 📁 Project Structure

The project follows the Modular Monolith pattern, separating the `core` infrastructure from the business `modules`.

```plaintext
erp-backend/
├── config/                  # All configuration files
├── src/                     # Main application source code
│   ├── app.js               # Express app initialization and server startup
│   ├── routes.js            # Main router that aggregates all module routes
│   ├── scheduler.js         # Cron job definitions
│   │
│   ├── core/                # --- CORE: Foundational, cross-cutting concerns ---
│   │   ├── auth/
│   │   ├── company/
│   │   └── user/
│   │
│   ├── middlewares/         # Shared middleware functions
│   ├── models/              # Central location for Sequelize initialization
│   │
│   ├── modules/             # --- MODULES: Specific business features ---
│   │   ├── accounting/
│   │   ├── crm/
│   │   ├── fleet/
│   │   ├── hr/
│   │   ├── invoicing/
│   │   ├── stock/
│   │   └── statistics/
│   │
│   └── utils/               # Utility and helper functions
│
├── .env                     # Environment variables
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## ## 📜 License

Distributed under the MIT License. See `LICENSE` file for more information.
