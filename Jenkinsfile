pipeline {
    agent any

     environment {
        BRANCH_NAME = "${env.GIT_BRANCH.replace('origin/', '')}" // Strip 'origin/' from the branch name

        SERVICE_NAME = "next-cicd-test"
        CONTAINTER_NAME = "${SERVICE_NAME}-${BRANCH_NAME}"
        IMAGE_NAME = "${SERVICE_NAME}-${BRANCH_NAME}:${env.BUILD_ID}"
        // IMAGE_TAG = 'latest'
        GIT_BRANCH = "${env.GIT_BRANCH}"

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

                script {
                    echo 'Cloning the repository...'
                    echo 'testing..'
                    echo "GIT_COMMIT:  ${env.GIT_COMMIT}"
                    echo "GIT_BRANCH: ${env.GIT_BRANCH}"

                    echo "Current Branch: ${BRANCH_NAME}"

                    if (env.BRANCH_NAME == 'dev') {

                        git branch: 'dev', url: 'https://github.com/ijw9209/frontend_CICD_test.git'
                    }else if(env.BRANCH_NAME == 'main') {
                        git branch: 'main', url: 'https://github.com/ijw9209/frontend_CICD_test.git'
                    } else {
                        echo 'No specific branch checked out, using default branch...'
                        git url: 'https://github.com/ijw9209/frontend_CICD_test.git'
                    }

                }
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
                    def image = docker.build("${env.IMAGE_NAME}", "--build-arg ENV_MODE=${env.ENV_MODE} .")
                }
            }
        }


        stage('Stop current') {
            steps {
                echo "Stop previous version"
                script {
                  sh "docker ps -a -q --filter name=${SERVICE_NAME} | xargs -r docker rm -f"
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                //    // Docker 컨테이너 실행 (필요에 따라 수정)
                   sh "docker run -dit --name ${CONTAINTER_NAME} -p 3000:3000 ${IMAGE_NAME}"
                   sh "docker ps"


                }
            }
        }
    }
}