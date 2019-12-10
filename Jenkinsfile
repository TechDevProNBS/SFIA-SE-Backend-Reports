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
            echo "Testing environment"
                }
            }


        stage('Staging') {
	  when {
		expression {
			env.BRANCH_NAME=='staging'
		}
	}
            steps {
                 echo "build"
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
               sh 'docker image build --build-arg ENVIRON1="production" -t="sebs2112/sfia-roles:production" .'
                sh 'docker push sebs2112/sfia-roles:production' 
            }
        }
}
}
