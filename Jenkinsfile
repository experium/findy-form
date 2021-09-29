scripts.discardOldJobBuilds('3')
scripts.killPreviousJobBuilds()

node {
    scripts.tryFinally {
        stage('Checkout') {
            checkout scm
        }

        def branch = env.BRANCH_NAME
        def isPR = branch ==~ /^PR-\d+$/

        docker.image('node:14.15').inside('-e HOME=/tmp') {
            stage('Install') {
                sh 'yarn install'
            }

            stage('Build lib') {
                sh 'yarn package'
            }

            stage('Build ghpages') {
                sh 'yarn build'
            }

            if (!isPR) {
                stage('Publish artifacts') {
                    step([$class: 'ArtifactArchiver', artifacts: 'dist/**/*', fingerprint: true])
                    step([$class: 'ArtifactArchiver', artifacts: 'lib/**/*', fingerprint: true])
                }

                stage('Publish npm') {
                    withNPM(npmrcConfig:'publishnpmrc') {
                        sh "npm --no-git-tag-version version 1.2.${env.BUILD_NUMBER} && npm publish"
                    }
                }

                // stage('Publish ghpage') {
                //     sh "yarn deploy-storybook"
                // }
            }
        }
    }
}
