pipeline {
    agent any

    environment {
        DOCKERHUB_CREDS = credentials('dockerhub-creds')
        IMAGE_BACKEND = "gowtham755/mean-backend"
        IMAGE_FRONTEND = "gowtham755/mean-frontend"
        COMPOSE_PROJECT = "meanapp"
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
                sh 'docker build -t $IMAGE_BACKEND backend'
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh 'docker build -t $IMAGE_FRONTEND frontend'
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
                sh '''
                echo "Stopping old deployment..."
                docker compose -p $COMPOSE_PROJECT down --remove-orphans || true

                echo "Removing existing containers..."
                docker rm -f mongo backend frontend nginx 2>/dev/null || true

                echo "Removing unused networks..."
                docker network prune -f || true

                echo "Pulling latest images..."
                docker compose -p $COMPOSE_PROJECT pull

                echo "Starting fresh deployment..."
                docker compose -p $COMPOSE_PROJECT up -d --build --force-recreate --renew-anon-volumes

                echo "Running containers:"
                docker ps
                '''
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
