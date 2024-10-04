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
                   sh "docker run -d -p 3000:3000 --name next-cicd-test-${env.BRANCH_NAME} next-cicd-test-${env.BRANCH_NAME}:${env.BUILD_ID}"

                   // temp 컨테이너 제거
                   sh '''
                    docker stop next-cicd-test-temp || true
                    docker rm next-cicd-test-temp || true
                   '''

                   // Docker 컨테이너 실행 (필요에 따라 수정)
                   sh "docker run -d -p 3100:3000 --name next-cicd-test-temp next-cicd-test-${env.BRANCH_NAME}:${env.BUILD_ID}"
                           
                   // 기존 컨테이너가 존재하면 제거
                   sh '''
                   if [ "$(docker ps -aq -f name=next-cicd-test-${BRANCH_NAME})" ]; then
                       docker stop next-cicd-test-${BRANCH_NAME}
                       docker rm next-cicd-test-${BRANCH_NAME}
                   fi
                   '''
                           
                   // 기존 컨테이너 이름 변경
                   sh "docker rename next-cicd-test-${BRANCH_NAME} next-cicd-test-old"
                           
                   // 새 컨테이너를 기존 컨테이너 이름으로 변경
                   sh "docker rename next-cicd-test-temp next-cicd-test-${BRANCH_NAME}"
                    
                   // 기존 컨테이너 제거 (필요한 경우)
                   sh "docker rm next-cicd-test-old"

                   // temp 컨테이너 제거
                   sh '''
                    docker stop next-cicd-test-temp || true
                    docker rm next-cicd-test-temp || true
                   '''

                   // 현재 실행 중인 컨테이너 목록 출력
                   sh "docker ps"
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