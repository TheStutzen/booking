# BookingApp

Application with user registration for reserving a ticket for an event

## 🚀 Features

- **Auth methods** - SignUp, SignIn, LogOut.
- **Booking** - Event booking method.
- **Cookie Support** - User authentication is done using cookies.
- **Automatic migrations** - The database schema is automatically updated when the application starts.
- **E2E Test** - Integration tests have been written.

## 🛠 Technologies

- Docker & Docker Compose
- MariaDB (Database)
- Node.js (Backend)
- Express

## 📋 Prerequisites

- Docker
- Docker Compose

## ⚡ Quick Start

## 1. Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
MARIADB_HOST="mariadb"
MARIADB_PORT="3306"
MARIADB_DATABASE="booking"
MARIADB_USER="power"
MARIADB_PASSWORD="1234"
```

## 2. Launch Database

```
cd database
```

```
docker compose up --build --force-recreate
```

This command will start:

- MariaDB - Primary Database
- PhpMyAdmin - Database management interface

## 3. Launch Application

### Run application

```
cd ..
```

```
docker compose up --build --force-recreate
```

## 4. Launch E2e tests

```
docker exec -it booking-app sh

```

```
npm run test:e2e
```
