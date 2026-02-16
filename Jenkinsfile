pipeline {
    agent any

    environment {
        DOCKERHUB_CREDS = credentials('dockerhub-creds')
        DOCKER_USER = "gowtham755"
        IMAGE_BACKEND = "gowtham755/mean-backend"
        IMAGE_FRONTEND = "gowtham755/mean-frontend"
        PROJECT_DIR = "mean-app-containerized-devops"
    }

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'main',
                url: 'https://github.com/GowthamReddyT/mean-app-containerized-devops.git'
            }
        }

        stage('Build Backend Image') {
            steps {
                sh 'docker build -t $IMAGE_BACKEND $PROJECT_DIR/backend'
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh 'docker build -t $IMAGE_FRONTEND $PROJECT_DIR/frontend'
            }
        }

        stage('DockerHub Login') {
            steps {
                sh 'echo $DOCKERHUB_CREDS_PSW | docker login -u $DOCKERHUB_CREDS_USR --password-stdin'
            }
        }

        stage('Push Images') {
            steps {
                sh 'docker push $IMAGE_BACKEND'
                sh 'docker push $IMAGE_FRONTEND'
            }
        }

        stage('Deploy Application') {
            steps {
                sh 'cd $PROJECT_DIR && docker compose down || true'
                sh 'cd $PROJECT_DIR && docker compose pull || true'
                sh 'cd $PROJECT_DIR && docker compose up -d'
            }
        }
    }

    post {
        success {
            echo 'Deployment Successful'
        }
        failure {
            echo 'Deployment Failed'
        }
    }
}
