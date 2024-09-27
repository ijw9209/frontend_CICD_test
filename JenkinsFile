pipeline {
    agent any

    stage('Checkout') {
        steps {
            echo 'Cloning the repository...'
            git branch: 'dev', url: 'https://github.com/ijw9209/frontend_CICD_test.git'
        }
    }
}