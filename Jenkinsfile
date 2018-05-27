#!/usr/bin/env groovy
node {
    checkout scm
    def image = docker.build("brianyingling/sensei-api:${env.BUILD_ID}")
    image.inside {
        stage('Build') {
            echo 'Building...'
            sh 'npm install'
        }
        stage('Test') {
            echo 'Testing...'
            sh 'npm test'
        }
    }
     docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
        stage('Publish') {
            echo 'Publishing...'
            image.push("${env.BUILD_ID}")
        }
    }
}

// pipeline {

//     agent {
//         docker {
//             image 'node'
//             args '-u root'
//         }
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
//         stage('Publish') {
//             steps {
//                 script {
//                     def image = docker.build("brianyingling/hello_hapi:${env.BUILD_ID}")
//                     docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
//                         image.push('latest')
//                     }
//                 }
//             }
//         }
//     }
// }


// pipeline {
//     agent {
//         dockerfile true
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
