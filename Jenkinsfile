pipeline {
    agent any

    stages {
        stage('Testing Environment') {
            steps {
            echo "Testing env"
                }
            }
        stage('Build') {
            steps {
                 echo "build"
                }
            }
        stage('Deploy') {
            steps {
                echo "deploy"
            }
        }
    

      stage('Production') {
	when {
		expression {
			env.BRANCH_NAME!='master'
		}
	}
            steps {
		echo "production"
               sh 'docker image build -t="sebs2112/sfia-reports:latest" .'
                sh 'docker push sebs2112/sfia-reports:latest'  
            }
        }
}
}
