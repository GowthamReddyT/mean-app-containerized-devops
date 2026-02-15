pipeline {
    agent any

    environment {
        DOCKERHUB_CREDS = credentials('dockerhub-creds')
    }

    stages {

        stage('Clone') {
            steps {
                    git branch: 'main', url: 'https://github.com/GowthamReddyT/mean-app-containerized-devops.git'
                }
            }

        }

        stage('Build Backend Image') {
            steps {
                sh 'docker build -t gowtham755/mean-backend ./backend'
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh 'docker build -t gowtham755/mean-frontend ./frontend'
            }
        }

        stage('DockerHub Login') {
            steps {
                sh 'echo $DOCKERHUB_CREDS_PSW | docker login -u $DOCKERHUB_CREDS_USR --password-stdin'
            }
        }

        stage('Push Images') {
            steps {
                sh 'docker push gowtham755/mean-backend'
                sh 'docker push gowtham755/mean-frontend'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                cd ~/mean-app-containerized-devops
                docker compose down
                docker compose pull
                docker compose up -d
                '''
            }
        }
    }
}
