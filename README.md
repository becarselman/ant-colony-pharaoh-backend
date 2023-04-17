# Ant Academy - Pharaoh Backend

This project builds RESTful APIs using Node.js, Express and Mongoose

## Manual Installation

Clone the repo:

```bash
git clone https://github.com/becarselman/ant-colony-pharaoh-backend
cd ant-colony-pharaoh-backend
```

Install the dependencies:

```bash
npm install
```

Set the environment variables:

```bash
cp .env.example .env
# open .env and modify the environment variables
```

## Table of Contents

- [Commands](#commands)
- [Environment Variables](#environment-variables)

## Commands

Running in development:

```bash
# seed the database with default users:
# pharaohadmin1@gmail.com PharaohPassword1
# pharaohadmin2@gmail.com PharaohPassword2
npm run seed 

npm run dev
```

## Environment Variables

The environment variables can be found and modified in the `.env` file.

```bash
# URL of the Mongo DB
DB_CONNECTION_STRING = "<value>"
JWT_SECRET = "<value>"
```

