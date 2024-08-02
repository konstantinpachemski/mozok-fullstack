# Nextjs + Nestjs TypeScript TypeORM JWT PostgreSQL Project

This is a fullstack project that uses ```Next.js``` for the frontend and ```Nest.js``` for the backend. 

Below are the steps to set up and run the project locally.

## Folder Structure

```plaintext
mozok-fullstack/
├── next-fe/    # Frontend (Next.js)
├── nest-be/    # Backend (Nest.js)
└── package.json
```
## Prerequisites
Make sure you have the following installed:

- ```Node.js``` (v14.x or later)
- ```Yarn``` (v1.x or later)
- ```PostgreSQL```  database

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

Next, edit the connection with the database:

_/nest-be/src/typeorm.config.ts_
```plaintext
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  password: 'admin123', <-- this
  username: 'postgres',
  entities: [User],
  database: 'pgnestdb', <-- and most likely this
  synchronize: true,
  logging: true,
};
```

Finaly, create ```.env``` file in root of nest-be and store your ```JWT_SECRET```: (there's ```.env-example```)

_/nest-be/.env_
```plaintext
JWT_SECRET=
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
- Frontend: Open your browser and navigate to ```http://localhost:3000```
- Backend: The backend server will run on ```http://localhost:3001``` (or the port specified in your Nest.js configuration)

### 5. Scripts
Here are some additional scripts you might find useful:

#### Frontend (Next.js)

```$ yarn build``` - Build the application for production

```$ yarn lint``` - Lint the codebase

#### Backend (Nest.js):
  
```$ yarn lint``` - Lint the codebase
