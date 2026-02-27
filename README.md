# Attenda Employee Service API

A REST API service for managing employee data in the **Attenda** system.

Built using **NestJS**, **Prisma ORM**, and **MySQL**, this service provides basic CRUD operations for employee management.

---

## 🚀 Tech Stack

* **NestJS**
* **Prisma ORM**
* **MySQL**

---

## 📦 Employee Model

```prisma
model Employee {
  id       String @id @default(uuid())
  fullname String
}
```

### Fields

| Field    | Type   | Description                |
| -------- | ------ | -------------------------- |
| id       | UUID   | Unique employee identifier |
| fullname | String | Employee full name         |

---

## ⚙️ Environment Setup

Create a `.env` file in the root directory:

```env
APP_PORT=3001

DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE_NAME"

DATABASE_USER=your_db_user
DATABASE_PASSWORD=your_db_password
DATABASE_NAME=your_database_name
DATABASE_HOST=localhost
DATABASE_PORT=3306
```

---

## 🛠 Installation

### 1. Clone Repository

```bash
git clone <repository-url>
cd attenda-employee-service
```

### 2. Install Dependencies

```bash
npm install
```

---

## 🧬 Prisma Setup

Generate Prisma client:

```bash
npx prisma generate
```

Run migrations:

```bash
npx prisma migrate deploy
```

---

## ▶️ Running the Application

```bash
npm run start:dev
```

Application runs at:

```
http://localhost:3001
```

---

## 📡 API Endpoints

Base URL:

```
/employees
```

---

### Endpoints Overview

| Method | Endpoint         | Description           |
| ------ | ---------------- | --------------------- |
| GET    | `/employees`     | Get all employees     |
| GET    | `/employees/:id` | Get employee by ID    |
| POST   | `/employees`     | Create new employee   |
| PATCH  | `/employees/:id` | Update employee by ID |
| DELETE | `/employees/:id` | Delete employee by ID |


### Example Request Body (Create / Update)

```json
{
  "fullname": "Kelvin Giovanno"
}
```
---

## ✅ Features

* Employee CRUD API