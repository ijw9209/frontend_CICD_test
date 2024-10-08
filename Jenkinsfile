pipeline {
    agent any

     environment {
        BRANCH_NAME = "${env.GIT_BRANCH.replace('origin/', '')}" // Strip 'origin/' from the branch name

        // docker hub test
        SERVICE_NAME = "next-cicd-test"

        REPO_NAME = "ijw9209/next-cicd-test-${BRANCH_NAME}"
        CONTAINTER_NAME = "${SERVICE_NAME}-${BRANCH_NAME}"
        IMAGE_NAME = "${SERVICE_NAME}-${BRANCH_NAME}:${env.BUILD_ID}"
        // IMAGE_TAG = 'latest'


        // docker hub test
        DOCKERHUB_CREDENTIALS = credentials('Dockerhub-access-token') // jenkins에 등록해 놓은 docker hub credentials 이름


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
                    echo "Current Branch: ${BRANCH_NAME}"

                    if (env.BRANCH_NAME == 'dev') {
                        git branch: 'dev', url: "https://github.com/ijw9209/frontend_CICD_test.git"
                    }else if(env.BRANCH_NAME == 'main') {
                        git branch: 'main', url: "https://github.com/ijw9209/frontend_CICD_test.git"
                    } else {
                        echo 'No specific branch checked out, using default branch...'
                        git url: "https://github.com/ijw9209/frontend_CICD_test.git"
                    }

                }
            }
        }

        stage('Login'){
          steps{
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin' // docker hub 로그인
          }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Docker Build'
                  // Docker 이미지를 빌드
                // sh "docker build ENV_MODE=${ENV_MODE} -t test-cicd -f Dockerfile ."
                script {
                    // Docker 이미지를 빌드
                    //def image = docker.build("${env.IMAGE_NAME}", "--build-arg ENV_MODE=${env.ENV_MODE} .")
                    
                    // def image = docker.build("ijw9209/${env.IMAGE_NAME}", "--build-arg ENV_MODE=${env.ENV_MODE} .")
                    // Docker 이미지를 빌드 (플랫폼 옵션 추가)
                    def image = docker.build("ijw9209/${env.IMAGE_NAME}", "--platform linux/amd64 --build-arg ENV_MODE=${env.ENV_MODE} .")
                }
            }
        }
        // docker hub test
        stage('Docker hub push') { 
          steps { 
              script {
                sh "docker push ${REPO_NAME}:${env.BUILD_ID}" //docker push
              } 
          }
        } 

        // stage('Docker hub pull') { 
        //   steps { 
        //       script {
        //         "docker pull ${REPO_NAME}:${env.BUILD_ID}"
        //       } 
        //   }
        // }

        stage('Stop current') {
            steps {
                echo "Stop previous version"
                script {
                    def result = sh script: "docker ps -a -q --filter name=${REPO_NAME} | xargs -r docker rm -f", returnStatus: true
                    if (result != 0) {
                        echo "No container to stop or an error occurred, but continuing..."
                    }
                }
            }
        }

        stage('ssh-test') {
            steps {
                sshagent(credentials: ['aws-ec2-web-1']) {
                    // sh 'ssh -o StrictHostKeyChecking=no ubuntu@43.202.55.231 "uptime"'
                    // sh """
                    // ssh -o StrictHostKeyChecking=no ubuntu@43.202.55.231 << 'EOF'
                    // uptime
                    // ls -al
                    // """
                    
                    // 기존 컨테이너 및 이미지 삭제
                    sh "ssh -o StrictHostKeyChecking=no ubuntu@43.202.55.231 'sudo docker ps -q --filter name=${CONTAINTER_NAME} | grep -q . && sudo docker rm -f \$(sudo docker ps -aq --filter name=${CONTAINTER_NAME})'"
                    sh "ssh -o StrictHostKeyChecking=no ubuntu@43.202.55.231 'sudo docker rmi -f ${CONTAINTER_NAME}'"
                    // Docker Hub에서 이미지 풀받기
                    sh "ssh -o StrictHostKeyChecking=no ubuntu@43.202.55.231 'sudo docker pull ${REPO_NAME}:${env.BUILD_ID}'"
        
                    // Docker 컨테이너 실행
                    // sh "ssh -o StrictHostKeyChecking=no ubuntu@43.202.55.231 'sudo docker run -dit --name ${CONTAINTER_NAME} -p 3000:3000 ${REPO_NAME}:${env.BUILD_ID}'"
                    //플랫폼 추가
                    sh "ssh -o StrictHostKeyChecking=no ubuntu@43.202.55.231 'sudo docker run --platform linux/amd64 -dit --name ${CONTAINTER_NAME} -p 3000:3000 ${REPO_NAME}:${env.BUILD_ID}'"
                    

                }
            }
        }


        // stage('Deploy') {
        //     steps {
        //         echo "Deploy"
        //         script {
        //             sh "docker run -dit --name ${REPO_NAME} -p 3000:3000 ${IMAGE_NAME}"
        //         }
        //     }
        // }

        // stage('Stop current') {
        //     steps {
        //         echo "Stop previous version"
        //         script {
        //         //   sh "docker ps -a -q --filter name=${CONTAINTER_NAME} | xargs -r docker rm -f"
        //             def result = sh script: "docker ps -a -q --filter name=${CONTAINTER_NAME} | xargs -r docker rm -f", returnStatus: true
        //             if (result != 0) {
        //                 echo "No container to stop or an error occurred, but continuing..."
        //             }
        //         }
        //     }
        // }

        // stage('Deploy') {
        //     steps {
        //         script {

        //            if (env.BRANCH_NAME == 'dev') {
        //         //    // Docker 컨테이너 실행 (필요에 따라 수정)
        //            sh "docker run -dit --name ${CONTAINTER_NAME} -p 3000:3000 ${IMAGE_NAME}"

        //            }else if(env.BRANCH_NAME == 'main') {
        //            sh "docker run -dit --name ${CONTAINTER_NAME} -p 3100:3000 ${IMAGE_NAME}"
        //            }

        //            sh "docker ps"

        //         }
        //     }
        // }
    }
}