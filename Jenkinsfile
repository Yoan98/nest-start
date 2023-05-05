#!/usr/bin/env groovy

pipeline {
    agent any

    parameters {
        choice(name: 'BUILD_TYPE', choices: ['49_92', '9_109'], description: '发布目标')
    }

    environment {
        PROGRAM_NAME = 'restaurant-qiwei'
        REMOTE_DIR = '/data/htdoc'
    }

    stages {

        stage('check out'){
            steps {
                checkout scm
                echo "current branch: ${BRANCH_NAME}"
                stash includes: '.*', name: "${PROGRAM_NAME}"
            }
        }

        stage('deploy'){
            steps {
                unstash "${PROGRAM_NAME}"

                script {
                  def IP_ADDR
                  def USER
                  def ENV
                  switch(params.BUILD_TYPE)
                  {
                    case "49_92":
                      IP_ADDR = "192.168.0.47"
                      USER = "www"
                      ENV = "test92"
                      break
                    case "9_109":
                      IP_ADDR = "192.168.9.109"
                      USER = "www"
                      ENV = "test109"
                      break

                  }
                  withEnv(["IP_ADDR=$IP_ADDR", "USER=$USER", "ENV=$ENV"]) {
                    sh '''
                        rsync -avz --exclude=.git . ${USER}@${IP_ADDR}:${REMOTE_DIR}/${PROGRAM_NAME}
                        ssh ${USER}@${IP_ADDR} "cd ${REMOTE_DIR}/${PROGRAM_NAME} && bash ./devops.sh ${ENV}"
                    '''
                  }
                }
            }
        }

    }

}

