# MERN Stack CRUD Application with Docker

![MERN Stack](https://img.shields.io/badge/MERN-Stack-blue)
![Docker](https://img.shields.io/badge/Docker-Containers-2496ED)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248)

A full-stack CRUD (Create, Read, Update, Delete) application built with the MERN stack (MongoDB, Express, React, Node.js) and containerized using Docker and Docker Compose.

## Features

- **Employee Management**: Full CRUD operations for employee records
- **Modern UI**: Built with React and Tailwind CSS
- **RESTful API**: Node.js/Express backend with MongoDB integration
- **Containerized**: Dockerized services with compose orchestration
- **Persistent Storage**: MongoDB data persistence using Docker volumes

## Technologies

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **Containerization**: Docker + Docker Compose

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- Git (optional)


## Manual Deployment with Docker
1. **Clone the repository** (skip if using existing project):
   ```bash
   git clone <REPO-URL>
   cd <REPO-FOLDER>
   ```

2. **Create a Docker network**:
   ```bash
   docker network create mern_network
   ```

3. **Start MongoDB**:
   ```bash
   docker run --network=mern_network --name mongodb -d -p 27017:27017 -v mongo-data:/data/db mongo:latest
   ```

4. **Build and start the backend**:
   ```bash
   cd backend
   docker build -t mern-backend .
   docker run --network=mern_network --name backend -d -p 5050:5050 mern-backend
   ```

5. **Build and start the frontend**:
   ```bash
   cd ../frontend
   docker build -t mern-frontend .
   docker run --network=mern_network --name frontend -d -p 5173:5173 mern-frontend
   ```
## Deployment with Docker Compose

1. **Clone the repository** (skip if using existing project):
   ```bash
   git clone <REPO-URL>
   cd <REPO-FOLDER>
   ```

2. **Start the application**:
   ```bash
   docker-compose up -d
   ```

3. **Access the application**:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5050
   - MongoDB: mongodb://localhost:27017

4. **Stop the application**:
   ```bash
   docker-compose down
   ```

## Environment Variables

The application uses the following environment variables:

**Backend**:
- `MONGO_URI`: MongoDB connection string (default: `mongodb://mongodb:27017/mydatabase`)

**Frontend**:
- `REACT_APP_API_URL`: Backend API URL (default: `http://backend:5050`)

These are configured in the `docker-compose.yaml` file.

## Project Structure

```
├── backend/
│   ├── Dockerfile            # Backend container configuration
│   ├── routes/               # Express route handlers
│   └── db/                   # MongoDB connection setup
├── frontend/
│   ├── Dockerfile            # Frontend container configuration
│   ├── src/                  # React components and logic
│   └── public/               # Static assets
├── docker-compose.yaml       # Multi-container orchestration
└── LICENSE                   # Project license
```

## Application Usage

1. **Create Record**:
   - Click "Add Employee"
   - Fill in the form and click "Save"

2. **View Records**:
   - All employees are listed in the main table

3. **Update Record**:
   - Click "Edit" on any record
   - Modify the fields and click "Save"

4. **Delete Record**:
   - Click "Delete" on any record to remove it

## Data Persistence

MongoDB data is persisted using a Docker volume:
- Data location: `mongo-data` volume
- Survives container restarts and rebuilds
