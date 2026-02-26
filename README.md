🚀 MEAN Stack DevOps Deployment (Docker + Jenkins + AWS)

A complete production-style full-stack CRUD application built using the MEAN Stack (MongoDB, Express, Angular 15, Node.js) and deployed using modern DevOps practices.

This project demonstrates containerization, CI/CD automation, reverse proxy configuration, and cloud deployment on AWS EC2.

📌 Project Overview

This application manages a collection of Tutorials.

Each tutorial contains:

id

title

description

published (boolean)

✅ Application Features

Create Tutorial

Retrieve All Tutorials

Retrieve Single Tutorial

Update Tutorial

Delete Tutorial

Delete All Tutorials

Search Tutorials by Title

Persistent MongoDB Storage

The backend provides REST APIs built with Node.js + Express, while the frontend is built with Angular 15 using HttpClient to communicate with the backend.

🏗️ Architecture Overview
🔹 Application Architecture
User (Browser)
        ↓
Nginx (Port 80 - Reverse Proxy)
        ↓
Angular Frontend (Docker Container)
        ↓
Node.js Backend API (Port 5000)
        ↓
MongoDB (Port 27017)
🔹 CI/CD Architecture
Developer
   ↓ (git push)
GitHub Repository
   ↓ (Webhook)
Jenkins (EC2)
   ↓
Build Docker Images
   ↓
Push to DockerHub
   ↓
Deploy via Docker Compose
   ↓
Application Updated Automatically
📂 Project Structure
mean-app-containerized-devops/
│
├── backend/
│   ├── app/
│   │   ├── config/
│   │   │   └── db.config.js
│   │   └── ...
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   └── app/services/tutorial.service.ts
│   ├── Dockerfile
│   └── angular.json
│
├── nginx/
│   └── default.conf
│
├── docker-compose.yml
├── Jenkinsfile
└── README.md
💻 Local Development Setup (Without Docker)
🔹 Backend Setup (Node.js + Express)
cd backend
npm install
Update MongoDB Configuration

Modify:

backend/app/config/db.config.js

Update MongoDB credentials if needed.

Run Backend Server
node server.js

Backend runs on:

http://localhost:5000
🔹 Frontend Setup (Angular 15)
cd frontend
npm install

Run Angular application:

ng serve --port 8081

Access frontend:

http://localhost:8081/
Modify Frontend API Configuration

If backend URL changes, update:

frontend/src/app/services/tutorial.service.ts

This file controls how Angular communicates with the backend REST APIs.

🐳 Docker Services (Production Deployment)
1️⃣ MongoDB

Port: 27017

Persistent Docker volume

2️⃣ Backend (Node.js + Express)

Port: 5000

Connects using service name mongo

3️⃣ Frontend (Angular Production Build)

Served internally

4️⃣ Nginx (Reverse Proxy)

Exposes Port 80

Routes:

/ → Frontend

/api → Backend

☁️ AWS EC2 Configuration

OS: Ubuntu 22.04

Open Ports:

22 → SSH

80 → Application

8080 → Jenkins

⚙️ EC2 Server Setup
1️⃣ Install Docker
sudo apt update
sudo apt install docker.io -y
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ubuntu

Re-login to apply group permissions.

2️⃣ Install Docker Compose Plugin
sudo apt install docker-compose-plugin -y
docker compose version
3️⃣ Install Jenkins
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo gpg --dearmor -o /usr/share/keyrings/jenkins-keyring.gpg

echo "deb [signed-by=/usr/share/keyrings/jenkins-keyring.gpg] https://pkg.jenkins.io/debian-stable binary/" | sudo tee /etc/apt/sources.list.d/jenkins.list > /dev/null

sudo apt update
sudo apt install jenkins -y
sudo systemctl start jenkins

Access Jenkins:

http://<EC2_PUBLIC_IP>:8080
🔐 Jenkins Credentials
GitHub

Type: Username + Password

Use Personal Access Token

DockerHub

Type: Username + Password

Use Access Token

🔔 GitHub Webhook

Repository → Settings → Webhooks

Payload URL:

http://<EC2_PUBLIC_IP>:8080/github-webhook/

Content Type: application/json
Trigger: Just the push event

🔁 Jenkins Pipeline Stages

Checkout Code

Build Backend Image

Build Frontend Image

DockerHub Login

Push Images

Deploy via Docker Compose

🚀 Deployment Workflow
git add .
git commit -m "Updated application"
git push origin main

✔ Jenkins triggered
✔ Images built
✔ Images pushed to DockerHub
✔ Containers recreated
✔ Application updated

Access:

http://<EC2_PUBLIC_IP>
🧪 Testing
Test API
curl http://<EC2_PUBLIC_IP>/api/tutorials
Verify MongoDB
docker exec -it <mongo_container_name> mongosh
use dd_db
db.tutorials.find().pretty()
🛠 Troubleshooting
502 Bad Gateway

Check backend container

Ensure backend listens on 0.0.0.0

Verify nginx proxy configuration

MongoDB Connection Issues

Check DB_HOST=mongo

Verify docker-compose service names

Inspect container logs

📦 DockerHub Images

gowtham755/mean-backend

gowtham755/mean-frontend

🌟 Key Highlights

Full-stack CRUD application

Angular 15 + Node.js REST APIs

MongoDB persistent storage

Fully containerized architecture

Automated CI/CD pipeline

GitHub webhook integration

Reverse proxy configuration

Production-ready AWS deployment

🎯 Final Outcome

✔ Push-to-deploy workflow
✔ Zero manual container management
✔ Scalable container architecture
✔ Industry-standard DevOps implementation

👨‍💻 Author

Gowtham Reddy
DevOps / MEAN Stack Developer
AWS | Docker | Jenkins | Angular | Node.js | MongoDB
