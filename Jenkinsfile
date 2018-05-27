pipeline {

    agent {
        dockerfile true
    }

    stages {
        stage('Build') {
            steps {
                echo 'Building...'
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                echo 'Testing...'
                sh 'npm test'
            }
        }
    }
}