# Website


## Installation process:

1. `clone he project from https://github.com/tmitch777/mitch_deal.git`
2. `cd mitch_deal`
 
3. `python3 -m venv venv`
4. `. venv/bin/activate` on MacOS and Linux `venv\Scripts\activate` on Windows
5. `pip install -r requirements.txt`
 
6. `export FLASK_APP=index`
7. `export FLASK_ENV=development`
8. `flask run`

#Deployment From GCP
1. `git clone https://github.com/tmitch777/mitch_deal`
2. cd mitch_deal
3. docker build -t mitch_deal .
4. docker tag mitch_deal:latest gcr.io/mitch-deal/mitch_deal:latest
5. gcloud auth configure-docker
6. docker push gcr.io/mitch-deal/mitch_deal:latest
7. gcloud run deploy mitchdeal-service --image gcr.io/mitch-deal/mitch_deal:latest --platform managed --region us-central1



# Builds & Deploys
1. `gcloud builds submit --tag gcr.io/mitch-deal/mitch_deal`
2. `gcloud run deploy --image gcr.io/mitch-deal/mitch_deal`



# Docker image setup
0.`docker login`
1. `docker tag mitchdealimage:v1 gcr.io/mitch-deal/mitchdealimage:v1`
2. `gcloud auth configure-docker`
3. `docker push gcr.io/mitch-deal/mitchdealimage:v1`
4. `gcloud run deploy mitchdeal-service --image gcr.io/mitch-deal/mitch_deal:latest --platform managed --region us-central1`




# Extra
2. `docker build -t mitchdealimage:v1 .`
3. `docker push mitchdealimage:v1`


https://mitchdeal-service-iw27pgmcoq-uc.a.run.app



# Authenticate Docker with your Google Cloud credentials
4. `gcloud auth configure-docker`

# Tag the Docker image with the GCR repository URL
5. `docker tag mitchdealimage:v1 us-central1-docker.pkg.dev/mitch-deal/mitchdealimage:v1`

# Push the tagged Docker image to GCR
6. `docker push us-central1-docker.pkg.dev/mitch-deal/mitchdealimage:v1`




## website URL:
https://mitchdeal.com
