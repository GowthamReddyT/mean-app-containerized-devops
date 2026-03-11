# 🚀 MEAN Stack DevOps — Containerized & Cloud-Deployed

<div align="center">

![MEAN Stack](https://img.shields.io/badge/Stack-MEAN-brightgreen?style=for-the-badge)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Jenkins](https://img.shields.io/badge/CI%2FCD-Jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white)
![AWS EC2](https://img.shields.io/badge/Cloud-AWS%20EC2-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)
![Nginx](https://img.shields.io/badge/Proxy-Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)
![Angular](https://img.shields.io/badge/Frontend-Angular%2015-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

**A production-style, fully containerized full-stack CRUD application deployed on AWS EC2 with automated CI/CD using Jenkins and GitHub Webhooks.**

</div>

---

## 📌 Table of Contents

- [Project Overview](#-project-overview)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Architecture](#️-architecture)
- [Project Structure](#-project-structure)
- [Local Development Setup](#-local-development-setup)
- [Docker Production Setup](#-docker-production-setup)
- [AWS EC2 Setup](#️-aws-ec2-setup)
- [Jenkins CI/CD Pipeline](#-jenkins-cicd-pipeline)
- [GitHub Webhook Setup](#-github-webhook-setup)
- [Deployment Workflow](#-deployment-workflow)
- [API Endpoints](#-api-endpoints)
- [Testing](#-testing)
- [Troubleshooting](#️-troubleshooting)
- [DockerHub Images](#-dockerhub-images)
- [Author](#-author)

---

## 📋 Project Overview

This application is a **Tutorial Management System** — a full-stack CRUD application built with the **MEAN stack** (MongoDB, Express, Angular 15, Node.js).

Each tutorial record contains:

| Field | Type | Description |
|---|---|---|
| `id` | ObjectId | Auto-generated unique identifier |
| `title` | String | Title of the tutorial |
| `description` | String | Description of the tutorial |
| `published` | Boolean | Publication status |

The backend exposes a RESTful API via **Node.js + Express**, the frontend is built with **Angular 15** (using `HttpClient`), and the database is **MongoDB** with persistent Docker volumes.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Angular 15, Bootstrap 4, TypeScript |
| **Backend** | Node.js 18, Express.js, Mongoose |
| **Database** | MongoDB (Docker Volume) |
| **Reverse Proxy** | Nginx (Alpine) |
| **Containerization** | Docker, Docker Compose |
| **CI/CD** | Jenkins (Pipeline) |
| **Cloud** | AWS EC2 (Ubuntu) |
| **Registry** | DockerHub |
| **Language** | TypeScript 50.1% · JavaScript 26.2% · HTML 20.7% · Dockerfile 1.8% · CSS 1.2% |

---

## ✅ Features

- 📝 **Create** a new tutorial
- 📄 **Read** all tutorials or a single tutorial by ID
- ✏️ **Update** tutorial details
- 🗑️ **Delete** a single tutorial or all tutorials
- 🔍 **Search** tutorials by title
- 💾 **Persistent** MongoDB storage via Docker volumes
- 🔄 **Automated CI/CD** — push to `main` triggers full build and deploy
- 🐳 **Fully containerized** with Docker Compose (4 services)
- 🌐 **Nginx reverse proxy** routing `/` to frontend and `/api/` to backend

---

## 🏗️ Architecture

### Application Architecture

```
                ┌─────────────────────┐
                │     User Browser    │
                └──────────┬──────────┘
                           │ HTTP :80
                           ▼
                ┌─────────────────────┐
                │   Nginx (Port 80)   │
                │   Reverse Proxy     │
                └──────────┬──────────┘
                           │
            ┌──────────────┴──────────────┐
            │  /                          │  /api/
            ▼                             ▼
  ┌─────────────────────┐       ┌─────────────────────┐
  │  Angular Frontend   │       │ Node.js Backend API │
  │  (Nginx:Alpine)     │       │     (Port 5000)     │
  │  Docker Container   │       │  Docker Container   │
  └─────────────────────┘       └──────────┬──────────┘
                                           │ Mongoose
                                           ▼
                                 ┌─────────────────────┐
                                 │   MongoDB Database  │
                                 │  (Docker Volume)    │
                                 └─────────────────────┘
```

### CI/CD Pipeline Architecture

```
  Developer
     │
     │  git push origin main
     ▼
  GitHub Repository
     │
     │  Webhook (POST /github-webhook/)
     ▼
  Jenkins (AWS EC2 :8080)
     │
     ├──▶ Clone Repository
     ├──▶ Build Docker Images (no-cache)
     │       ├── gowtham755/mean-backend
     │       └── gowtham755/mean-frontend
     ├──▶ Login to DockerHub
     ├──▶ Push Images to DockerHub
     └──▶ Deploy with Docker Compose
              └── docker compose up -d --force-recreate
                       ├── mongo
                       ├── backend
                       ├── frontend
                       └── nginx  ──▶  http://<EC2_PUBLIC_IP>
```

---

## 📂 Project Structure

```
mean-app-containerized-devops/
│
├── backend/                          # Node.js + Express REST API
│   ├── app/
│   │   ├── config/
│   │   │   └── db.config.js          # MongoDB URI configuration
│   │   ├── controllers/              # Route handler logic
│   │   ├── models/                   # Mongoose schema/models
│   │   └── routes/
│   │       └── turorial.routes.js    # API route definitions
│   ├── Dockerfile                    # Backend image (node:18)
│   ├── package.json
│   └── server.js                     # Express app entry point (:5000)
│
├── frontend/                         # Angular 15 SPA
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/           # Angular UI components
│   │   │   ├── services/
│   │   │   │   └── tutorial.service.ts  # HTTP service (API calls)
│   │   │   └── app.module.ts
│   │   └── ...
│   ├── Dockerfile                    # Multi-stage build (node:18 → nginx:alpine)
│   ├── default.conf                  # Nginx SPA config (try_files)
│   └── angular.json                  # Angular CLI workspace config
│
├── nginx/
│   └── default.conf                  # Reverse proxy routing rules
│
├── docker-compose.yml                # 4-service orchestration (mongo/backend/frontend/nginx)
├── Jenkinsfile                       # Declarative Jenkins pipeline
└── README.md
```

---

## 💻 Local Development Setup

> Run each service locally without Docker for faster development iteration.

### Prerequisites

- Node.js 18+
- MongoDB (local instance or MongoDB Atlas)
- Angular CLI 15: `npm install -g @angular/cli@15`

### 🔹 Backend Setup

```bash
cd backend
npm install
```

Edit MongoDB connection if needed:
```bash
# backend/app/config/db.config.js
module.exports = {
  url: "mongodb://localhost:27017/tasks"
};
```

Start the server:
```bash
node server.js
# ✅ Server running at http://localhost:5000
```

### 🔹 Frontend Setup

```bash
cd frontend
npm install --legacy-peer-deps
ng serve --port 8081
# ✅ App running at http://localhost:8081
```

> **Note:** To point the Angular app at your local backend, update the API base URL in:
> `frontend/src/app/services/tutorial.service.ts`

---

## 🐳 Docker Production Setup

### Services Overview

| Service | Image | Port | Notes |
|---|---|---|---|
| `mongo` | `mongo` (official) | 27017 (internal) | Persistent volume `mongo-data` |
| `backend` | `gowtham755/mean-backend` | 5000 (internal) | `MONGO_URI=mongodb://mongo:27017/tasks` |
| `frontend` | `gowtham755/mean-frontend` | 80 (internal) | Angular production build via Nginx |
| `nginx` | `nginx:alpine` | **80 (public)** | Reverse proxy: `/` → frontend, `/api/` → backend |

### Run Locally with Docker Compose

```bash
# Clone the repository
git clone https://github.com/GowthamReddyT/mean-app-containerized-devops.git
cd mean-app-containerized-devops

# Pull images and start all services
docker compose up -d

# View running containers
docker ps

# Access the application
open http://localhost
```

### Stop & Clean Up

```bash
docker compose down             # Stop containers
docker compose down -v          # Stop + remove volumes
```

---

## ☁️ AWS EC2 Setup

### 1. Security Group — Inbound Rules

| Port | Protocol | Purpose |
|---|---|---|
| `22` | TCP | SSH access |
| `80` | TCP | Application (Nginx) |
| `8080` | TCP | Jenkins dashboard |

### 2. Install Docker

```bash
sudo apt update
sudo apt install docker.io -y
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ubuntu
# ⚠️ Log out and back in for group permissions to take effect
```

### 3. Install Docker Compose Plugin

```bash
sudo apt install docker-compose-plugin -y
docker compose version
```

### 4. Install Jenkins

```bash
# Add Jenkins GPG key and repository
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key \
  | sudo gpg --dearmor -o /usr/share/keyrings/jenkins-keyring.gpg

echo "deb [signed-by=/usr/share/keyrings/jenkins-keyring.gpg] \
  https://pkg.jenkins.io/debian-stable binary/" \
  | sudo tee /etc/apt/sources.list.d/jenkins.list > /dev/null

sudo apt update
sudo apt install jenkins -y
sudo systemctl start jenkins
sudo systemctl enable jenkins

# Add jenkins user to docker group
sudo usermod -aG docker jenkins
sudo systemctl restart jenkins
```

> 🌐 Access Jenkins at: `http://<EC2_PUBLIC_IP>:8080`

---

## ⚙️ Jenkins CI/CD Pipeline

### Pipeline Stages

```
Clone Repository → Build Images → Login to DockerHub → Push Images → Deploy Containers
```

| Stage | Description |
|---|---|
| **Clone Repository** | Pulls latest `main` branch from GitHub |
| **Build Images (No Cache)** | Builds `mean-backend` and `mean-frontend` Docker images |
| **Login to DockerHub** | Authenticates using Jenkins stored credentials |
| **Push Images** | Pushes both images to DockerHub |
| **Deploy Containers** | Runs `docker compose up -d --force-recreate` on the EC2 host |

### Jenkins Credentials Required

| Credential ID | Type | Usage |
|---|---|---|
| `dockerhub-creds` | Username + Password (Access Token) | DockerHub login & push |

**To configure:**
1. Jenkins Dashboard → **Manage Jenkins** → **Credentials**
2. Add `dockerhub-creds` with your DockerHub username and access token

### DockerHub Images

| Image | Registry |
|---|---|
| `gowtham755/mean-backend` | [hub.docker.com](https://hub.docker.com/r/gowtham755/mean-backend) |
| `gowtham755/mean-frontend` | [hub.docker.com](https://hub.docker.com/r/gowtham755/mean-frontend) |

---

## 🔔 GitHub Webhook Setup

1. Go to your GitHub repository → **Settings** → **Webhooks** → **Add webhook**
2. Configure:

| Field | Value |
|---|---|
| **Payload URL** | `http://<EC2_PUBLIC_IP>:8080/github-webhook/` |
| **Content type** | `application/json` |
| **Trigger** | `Just the push event` |
| **Active** | ✅ Checked |

> Every `git push` to `main` will now automatically trigger the Jenkins pipeline.

---

## 🚀 Deployment Workflow

```bash
# 1. Make changes to your code
# 2. Commit and push
git add .
git commit -m "feat: your changes"
git push origin main

# ✅ Automated Pipeline kicks in:
#    GitHub → Webhook → Jenkins → Build → Push to DockerHub → Deploy on EC2
```

Access your live application:
```
http://<EC2_PUBLIC_IP>
```

---

## 📡 API Endpoints

Base URL: `http://<EC2_PUBLIC_IP>/api`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/tutorials` | Retrieve all tutorials |
| `GET` | `/tutorials/:id` | Retrieve a single tutorial |
| `POST` | `/tutorials` | Create a new tutorial |
| `PUT` | `/tutorials/:id` | Update a tutorial |
| `DELETE` | `/tutorials/:id` | Delete a tutorial |
| `DELETE` | `/tutorials` | Delete all tutorials |
| `GET` | `/tutorials?title=<keyword>` | Search tutorials by title |

---

## 🧪 Testing

### Test Backend API

```bash
# Get all tutorials
curl http://<EC2_PUBLIC_IP>/api/tutorials

# Create a tutorial
curl -X POST http://<EC2_PUBLIC_IP>/api/tutorials \
  -H "Content-Type: application/json" \
  -d '{"title": "Docker Tutorial", "description": "Learn Docker", "published": true}'

# Get a specific tutorial
curl http://<EC2_PUBLIC_IP>/api/tutorials/<id>
```

### Verify MongoDB Data

```bash
# Access MongoDB shell inside container
docker exec -it <mongo_container_name> mongosh

# Inside mongosh
use tasks
db.tutorials.find().pretty()
```

### Check Running Services

```bash
docker ps
docker compose logs -f        # Follow all logs
docker compose logs backend   # Backend logs only
docker compose logs nginx     # Nginx logs only
```

---

## 🛠️ Troubleshooting

### 502 Bad Gateway

| Check | Command |
|---|---|
| Backend container running? | `docker ps` |
| Backend listening on `0.0.0.0:5000`? | `docker logs <backend_container>` |
| Nginx proxy config correct? | `cat nginx/default.conf` |
| Container network? | `docker network inspect <network>` |

```bash
docker logs <container_name>
```

### MongoDB Connection Issues

- Verify `MONGO_URI=mongodb://mongo:27017/tasks` in `docker-compose.yml`
- Ensure `mongo` service is healthy: `docker compose ps`
- Check backend logs: `docker compose logs backend`

### Jenkins Pipeline Failures

- Verify `dockerhub-creds` credential is configured correctly
- Ensure `jenkins` user is in the `docker` group
- Check pipeline logs in Jenkins UI for specific stage failures

### Frontend Not Loading / 404 on Refresh

- The frontend Nginx config uses `try_files $uri $uri/ /index.html` — this handles Angular client-side routing. Ensure `frontend/default.conf` is properly copied during the Docker build.

---

## 🎯 Final Outcome

| ✅ | Achievement |
|---|---|
| ✔️ | Fully containerized MEAN stack application (4 Docker services) |
| ✔️ | Automated CI/CD pipeline with Jenkins |
| ✔️ | GitHub webhook integration (push-to-deploy) |
| ✔️ | Nginx reverse proxy for clean URL routing |
| ✔️ | Persistent MongoDB storage with Docker volumes |
| ✔️ | Production Docker images on DockerHub with versioning |
| ✔️ | Cloud deployment on AWS EC2 |

---

## 👨‍💻 Author

**Gowtham Reddy T**
*DevOps & Full-Stack Developer*

[![GitHub](https://img.shields.io/badge/GitHub-GowthamReddyT-181717?style=flat&logo=github)](https://github.com/GowthamReddyT)

> Skills: AWS · Docker · Jenkins · Angular · Node.js · MongoDB · Nginx · CI/CD

---

<div align="center">
  <sub>Built with ❤️ using the MEAN Stack + DevOps best practices</sub>
</div>
