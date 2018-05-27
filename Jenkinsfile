// node {
//     checkout scm
//     withEnv(['DB_URI=mongodb://206.189.237.191:27017/sensei', 'NODE_ENV=dev']) {
//         docker.image("mongo:latest").withRun("--name mongo") { db ->
//             docker.build('brianyingling/sensei-api').inside {
//                 // sh 'nc -z mongo 21017'
//                 sh 'npm run test'
//                 // sh 'docker-compose up'
//                 // sh 'npm install'
//                 // sh 'npm test'
//             }
//         }
//     }
// }

pipeline {

    agent {
        dockerfile true
    }

    environment {
        DB_URI      = 'mongodb://206.189.237.191:27017/sensei'
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