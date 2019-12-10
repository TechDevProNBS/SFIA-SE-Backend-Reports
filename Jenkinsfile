pipeline {
    agent any

    stages {
        stage('Testing Environment') {
	  when {
		expression {
			env.BRANCH_NAME=='developer'
		}
	}
            steps {
            echo "Testing"
		sh 'docker image build --build-arg ENVIRON1="testing" -t="sebs2112/sfia-reports:testing" .'
                sh 'docker push sebs2112/sfia-reports:testing' 
                }
            }


        stage('Staging') {
	  when {
		expression {
			env.BRANCH_NAME=='staging'
		}
	}
            steps {
		sh 'docker image build --build-arg ENVIRON1="staging" -t="sebs2112/sfia-reports:staging" .'
                sh 'docker push sebs2112/sfia-reports:staging' 
                 echo "staging"
                }
            }


      stage('Production') {
	when {
		expression {
			env.BRANCH_NAME=='master'
		}
	}
            steps {
		echo "production"
               sh 'docker image build --build-arg ENVIRON1="production" -t="sebs2112/sfia-reports:production" .'
                sh 'docker push sebs2112/sfia-reports:production' 
            }
        }
}
}
