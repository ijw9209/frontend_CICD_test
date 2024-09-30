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
        stage('Build') {
            steps {
                echo 'Building the application...'
                // 빌드 단계
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                // 테스트 단계
            }
        }

        stage('Deploy') {
            when {
                // 특정 브랜치에 머지될 때만 배포
                branch 'dev'  // 또는 'prod', 'master'로 설정
            }
            steps {
                echo 'Deploying the application...'
                // 배포 단계 (예: 서버에 파일 복사 또는 Docker 이미지 배포)
            }
        }
    }
}