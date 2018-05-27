node {
    checkout scm
    withEnv(['DB_URI=mongodb://0.0.0.0:27017/sensei', 'NODE_ENV=dev']) {
        docker.image("mongo").withRun() { db ->
            docker.build('brianyingling/sensei-api').inside {
                sh 'npm install'
                sh 'npm test'
            }
        }
    }
}

// pipeline {

//     agent {
//         dockerfile true
//     }

//     environment {
//         DB_URI      = 'mongodb://mongo:27017/sensei'
//         NODE_ENV    = 'dev'
//     }

//     stages {
//         stage('Build') {
//             steps {
//                 echo 'Building...'
//                 sh 'npm install'
//             }
//         }
//         stage('Test') {
//             steps {
//                 echo 'Testing...'
//                 sh 'npm test'
//             }
//         }
//     }
// }