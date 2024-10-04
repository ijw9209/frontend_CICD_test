pipeline {
    agent any

     environment {
        SERVICE_NAME = "test-jenkins"
        IMAGE_NAME = "${SERVICE_NAME}:${env.GIT_COMMIT}"
        IMAGE_TAG = 'latest'
        GIT_BRANCH = "${env.GIT_BRANCH}"

        BRANCH_NAME = "${env.GIT_BRANCH.replace('origin/', '')}" // Strip 'origin/' from the branch name
    }


    stages {

        stage('Set Environment') {
            steps {
                script {
                    // 브랜치 이름에 따라 환경 변수 설정
                    if (env.BRANCH_NAME == 'dev') {
                        env.ENV_MODE = 'dev'
                    } else if (env.BRANCH_NAME == 'main') {
                        env.ENV_MODE = 'main'
                    } 
                    // 설정된 환경 변수 출력
                    echo "Environment Mode: ${env.ENV_MODE}"
                }
            }
        }


        stage('Checkout') {
            steps {
                echo 'Cloning the repository...'
                echo 'testing..'
                echo "GIT_COMMIT:  ${env.GIT_COMMIT}"
                echo "GIT_BRANCH: ${env.GIT_BRANCH}"

                echo "Current Branch: ${BRANCH_NAME}"
                git branch: 'dev', url: 'https://github.com/ijw9209/frontend_CICD_test.git'
            }
        }

        stage('Check Docker') {
            steps {
                script {
                    sh 'docker ps'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Docker Build'
                  // Docker 이미지를 빌드
                // sh "docker build ENV_MODE=${ENV_MODE} -t test-cicd -f Dockerfile ."
                script {
                    // Docker 이미지를 빌드
                    def image = docker.build("next-cicd-test-${env.BRANCH_NAME}:${env.BUILD_ID}", "--build-arg ENV_MODE=${env.ENV_MODE} .")
                }
            }
        }

        // stage('Run Tests') {
        //     steps {
        //         script {
        //             // 컨테이너에서 테스트 실행 (테스트 명령어에 따라 수정)
        //             docker.image("my-nextjs-app:${env.BUILD_ID}").inside {
        //                 sh 'npm test'
        //             }
        //         }
        //     }
        // }

        stage('Deploy') {
            steps {
                script {
                    // Docker 컨테이너 실행 (필요에 따라 수정)
                    sh "docker run -d -p 3000:3000 --name next-cicd-test-${env.BRANCH_NAME} next-cicd-test:${env.BUILD_ID}}"
                }
            }
        }

        // post {
        //         always {
        //         // 정리 작업
        //         echo "Cleaning up..."
        //         sh 'docker rmi next-cicd-test:${env.BUILD_ID}' // 빌드 후 이미지 정리
        //     }
        // }
        // stage('Build') {
        //     steps {
        //         echo 'Building the application...'
        //         // 빌드 단계
        //     }
        // }

        // stage('Test') {
        //     steps {
        //         echo 'Running tests...'
        //         // 테스트 단계
        //     }
        // }

        // stage('Deploy') {
        //     when {
        //         // 특정 브랜치에 머지될 때만 배포
        //         branch 'dev'  // 또는 'prod', 'master'로 설정
        //     }
        //     steps {
        //         echo 'Deploying the application...'
        //         // 배포 단계 (예: 서버에 파일 복사 또는 Docker 이미지 배포)
        //     }
        // }
    }
}