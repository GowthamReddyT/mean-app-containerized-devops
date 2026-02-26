# 🚀 MEAN Stack DevOps Deployment
### Docker • Jenkins • AWS EC2 • Nginx • GitHub Webhook

A production-style full-stack CRUD application built using the MEAN Stack (MongoDB, Express, Angular 15, Node.js) and deployed using modern DevOps practices.

---

# 📌 Project Overview

This application manages a collection of Tutorials.

Each tutorial contains:
- id
- title
- description
- published (boolean)

## ✅ Features

- Create Tutorial
- Get All Tutorials
- Get Single Tutorial
- Update Tutorial
- Delete Tutorial
- Delete All Tutorials
- Search Tutorials by Title
- Persistent MongoDB Storage

The backend exposes REST APIs using Node.js and Express.
The frontend is built using Angular 15 with HttpClient for API communication.

---

# 🏗️ Architecture


```text
                ┌─────────────────────┐
                │     User Browser    │
                └──────────┬──────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │   Nginx (Port 80)   │
                │   Reverse Proxy     │
                └──────────┬──────────┘
                           │
            ┌──────────────┴──────────────┐
            │                             │
            ▼                             ▼
  ┌─────────────────────┐       ┌─────────────────────┐
  │ Angular Frontend    │       │ Node.js Backend API │
  │ (Docker Container)  │       │ (Port 5000)         │
  └──────────┬──────────┘       └──────────┬──────────┘
             │                             │
             └──────────────┬──────────────┘
                            ▼
                  ┌─────────────────────┐
                  │   MongoDB Database  │
                  │   (Port 27017)      │
                  └─────────────────────┘
🔹 CI/CD Architecture
        ┌─────────────────────┐
        │      Developer      │
        └──────────┬──────────┘
                   │  git push
                   ▼
        ┌─────────────────────┐
        │   GitHub Repository │
        └──────────┬──────────┘
                   │  Webhook
                   ▼
        ┌─────────────────────┐
        │   Jenkins (EC2)     │
        └──────────┬──────────┘
                   │
                   ▼
        ┌─────────────────────┐
        │  Build Docker Images│
        └──────────┬──────────┘
                   │
                   ▼
        ┌─────────────────────┐
        │  Push to DockerHub  │
        └──────────┬──────────┘
                   │
                   ▼
        ┌─────────────────────┐
        │ Docker Compose      │
        │ Deploy on EC2       │
        └──────────┬──────────┘
                   │
                   ▼
        ┌─────────────────────┐
        │  Updated Application│
        └─────────────────────┘


# 📂 Project Structure

```text
mean-app-containerized-devops/
│
├── backend/                        # Node.js + Express Backend
│   ├── app/
│   │   ├── config/
│   │   │   └── db.config.js        # MongoDB configuration
│   │   ├── controllers/            # Request handlers
│   │   ├── models/                 # Mongoose models
│   │   ├── routes/                 # API route definitions
│   │   └── ...
│   ├── Dockerfile                  # Backend Docker configuration
│   ├── package.json
│   └── server.js                   # Entry point
│
├── frontend/                       # Angular 15 Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/         # Angular components
│   │   │   ├── services/
│   │   │   │   └── tutorial.service.ts  # API service
│   │   │   └── app.module.ts
│   │   └── ...
│   ├── Dockerfile                  # Frontend Docker configuration
│   └── angular.json
│
├── nginx/                          # Reverse Proxy Configuration
│   └── default.conf
│
├── docker-compose.yml              # Multi-container orchestration
├── Jenkinsfile                     # CI/CD pipeline definition
└── README.md                       # Project documentation

---

# 💻 Local Development Setup (Without Docker)

## 🔹 Backend Setup

```bash
cd backend
npm install
Update MongoDB Configuration

Edit the following file if MongoDB credentials need to be changed:

backend/app/config/db.config.js

Run the backend server:

node server.js

Backend runs at:

http://localhost:5000
🔹 Frontend Setup (Angular 15)
cd frontend
npm install
ng serve --port 8081

Open in browser:

http://localhost:8081/
Modify API Configuration (If Needed)

Edit:

frontend/src/app/services/tutorial.service.ts

This file controls how Angular communicates with the backend REST APIs.

🐳 Docker Production Setup
Services in docker-compose.yml
1️⃣ MongoDB

Port: 27017

Persistent Docker volume

2️⃣ Backend

Port: 5000

Uses service name mongo as DB host

3️⃣ Frontend

Angular production build

4️⃣ Nginx

Exposes Port 80

Routes:

/ → Frontend

/api → Backend

☁️ AWS EC2 Setup
🔹 Open Ports in Security Group

22 (SSH)

80 (Application)

8080 (Jenkins)

⚙️ Install Required Tools on EC2
1️⃣ Install Docker
sudo apt update
sudo apt install docker.io -y
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ubuntu

Logout and login again to apply Docker group permissions.

2️⃣ Install Docker Compose Plugin
sudo apt install docker-compose-plugin -y
docker compose version
3️⃣ Install Jenkins
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo gpg --dearmor -o /usr/share/keyrings/jenkins-keyring.gpg

echo "deb [signed-by=/usr/share/keyrings/jenkins-keyring.gpg] https://pkg.jenkins.io/debian-stable binary/" | sudo tee /etc/apt/sources.list.d/jenkins.list > /dev/null

sudo apt update
sudo apt install jenkins -y
sudo systemctl start jenkins

Access Jenkins at:

http://<EC2_PUBLIC_IP>:8080
🔐 Jenkins Credentials Setup
GitHub

Type: Username + Password

Use Personal Access Token

DockerHub

Type: Username + Password

Use Access Token

🔔 GitHub Webhook Setup

Repository → Settings → Webhooks → Add Webhook

Payload URL:

http://<EC2_PUBLIC_IP>:8080/github-webhook/

Content Type: application/json
Trigger: Push events

🔁 Jenkins Pipeline Stages

Checkout Code

Build Backend Image

Build Frontend Image

DockerHub Login

Push Images

Deploy via Docker Compose

🚀 Deployment Workflow

Push changes:

git add .
git commit -m "update"
git push origin main

Automatic process:

Jenkins triggered

Docker images built

Images pushed to DockerHub

Containers recreated

Application updated

Access application:

http://<EC2_PUBLIC_IP>
🧪 Testing
Test Backend API
curl http://<EC2_PUBLIC_IP>/api/tutorials
Verify MongoDB Data
docker exec -it <mongo_container_name> mongosh
use dd_db
db.tutorials.find().pretty()
🛠 Troubleshooting
502 Bad Gateway

Ensure backend container is running

Ensure backend listens on 0.0.0.0

Verify nginx proxy_pass configuration

Check logs:

docker logs <container_name>
MongoDB Connection Issues

Ensure DB_HOST=mongo

Verify docker-compose service names

Check container logs

📦 DockerHub Images

gowtham755/mean-backend

gowtham755/mean-frontend

🎯 Final Outcome

✔ Fully containerized full-stack application
✔ Automated CI/CD pipeline
✔ GitHub webhook integration
✔ Reverse proxy architecture
✔ Cloud deployment on AWS
✔ Push-to-deploy workflow

👨‍💻 Author

Gowtham Reddy
DevOps / MEAN Stack Developer
AWS | Docker | Jenkins | Angular | Node.js | MongoDB
