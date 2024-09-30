pipeline {
    agent any

     environment {
        SERVICE_NAME = "test-jenkins"
        IMAGE_NAME = "${SERVICE_NAME}:${env.GIT_COMMIT}"
        GIT_BRANCH = "${env.GIT_BRANCH}"
    }


    stages {
        stage('Checkout') {
            steps {
                echo 'Cloning the repository...'
                echo 'testing..'
                echo "GIT_COMMIT:  ${env.GIT_COMMIT}"
                echo "GIT_BRANCH: ${env.GIT_BRANCH}"
                git branch: 'dev', url: 'https://github.com/ijw9209/frontend_CICD_test.git'
            }
        }
    }
}