pipeline {

    agent {
        dockerfile true
    }

    environment {
        DB_URI      = 'mongodb://mongo:27017/sensei'
        NODE_ENV    = 'dev'
    }

    stages {
        stage('Build') {
            steps {
                echo 'Building...'
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing...'
                sh 'npm test'
            }
        }
    }
}