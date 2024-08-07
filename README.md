# Nextjs + Nestjs TypeScript TypeORM JWT PostgreSQL Project

This is a fullstack project that uses `Next.js` for the frontend and `Nest.js` for the backend.

Below are the steps to set up and run the project locally.

## Folder Structure

```plaintext
mozok-fullstack/
├── frontend/   # Frontend (Next.js)
├── backend/    # Backend (Nest.js)
└── package.json
```

## Prerequisites

Make sure you have the following installed:

- `Node.js` (v14.x or later)
- `Yarn` (v1.x or later)
- `PostgreSQL` database

## Getting started

### 1. Clone the Repository

```plaintext
$ git clone https://github.com/konstantinpachemski/mozok-fullstack.git
$ cd mozok-fullstack
```

### 2. Set Up Project Dependencies

Setup all dependencies:

```plaintext
$ yarn setup
```

Or setup frontend (nextjs) and backend (nestjs) dependencies:

```plaintext
$ yarn setup:fe
$ yarn setup:be
```

Next, create `.env` file in root of backend folder and edit the connection with the database, JWT_SECRET and JWT_REFRESH_TOKEN:

_/backend/.env_

```plaintext
DATABASE_URL="postgresql://postgres:admin123@localhost:5432/postgres?schema=public"
JWT_SECRET=
JWT_REFRESH=
```

Finally, create `.env` file in root of frontend folder and provide the same JWT_SECRET:

_/frontend/.env_

```plaintext
NEXTAUTH_URL=http://localhost:3000/
NEXTAUTH_SECRET=
```

### 3. Running the Project

```plaintext
$ yarn start
```

Or you can run the frontend and backend individually:

```plaintext
$ cd next-fe && yarn dev
$ cd nest-be && yarn start:dev
```

### 4. Accessing the Application

- Frontend: Open your browser and navigate to `http://localhost:3000`
- Backend: The backend server will run on `http://localhost:8000` (or the port specified in your Nest.js configuration)

### 5. Scripts

Here are some additional scripts you might find useful:

#### Frontend (Next.js)

`$ yarn build` - Build the application for production

`$ yarn lint` - Lint the codebase

#### Backend (Nest.js):

`$ yarn tables` - Run Prisma Studio and preview database tables

`$ yarn lint` - Lint the codebase
