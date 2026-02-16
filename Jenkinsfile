pipeline {
    agent any

    environment {
        DOCKERHUB_CREDS = credentials('dockerhub-creds')
        IMAGE_BACKEND = "gowtham755/mean-backend"
        IMAGE_FRONTEND = "gowtham755/mean-frontend"
    }

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'main',
                url: 'https://github.com/GowthamReddyT/mean-app-containerized-devops.git'
            }
        }

        stage('Build Images (No Cache)') {
            steps {
                sh 'docker build --no-cache -t $IMAGE_BACKEND backend'
                sh 'docker build --no-cache -t $IMAGE_FRONTEND frontend'
            }
        }

        stage('Login to DockerHub') {
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

        stage('Deploy Containers') {
            steps {
                sh '''
                echo "Stopping old containers"
                docker compose down --remove-orphans || true

                echo "Pull latest images from DockerHub"
                docker pull $IMAGE_BACKEND
                docker pull $IMAGE_FRONTEND

                echo "Starting fresh deployment"
                docker compose up -d --force-recreate

                echo "Running containers:"
                docker ps
                '''
            }
        }
    }

    post {
        success {
            echo 'Deployment Successful 🎉'
        }
        failure {
            echo 'Deployment Failed ❌'
        }
    }
}
