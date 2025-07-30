# Returning

## Running On Local
`FLASK_APP=main FLASK_ENV=development flask run`

## Deploying
1. `export FLASK_APP=main`
2. `export FLASK_ENV=production`
3. `gcloud init` Select Switch to and re-initialize existing configuration: [default]
4. `gcloud app deploy`





# First Timer
## Installation process:

1. `clone he project from https://github.com/tmitchmachine/mitch_deal.git`
2. `cd tmitchmachine`
 
 ## (Solved because of settings.json)
<!-- 3. `python3 -m venv venv`
4. `. venv/bin/activate` on MacOS and Linux `venv\Scripts\activate` on Windows
5. `pip install -r requirements.txt` -->
 
 ## Running On Local
6. `export FLASK_APP=main`
7. `export FLASK_ENV=development`
8. `flask run`


## Pre Deployment New Terminal (Solved because of settings.json)
<!-- 1. `. venv/bin/activate` on MacOS and Linux `venv\Scripts\activate` on Windows
2. `python -V` to see version inside /app.yaml and convert it Python 3.12.1 = runtime: python310 -->

## Deployment Official
1. `export FLASK_APP=main`
2. `export FLASK_ENV=production`
3. `gcloud init` Select Switch to and re-initialize existing configuration: [default]
4. `gcloud app deploy`

## Optional If Slow Deployment
1. `gcloud components update`

# Installing Google Cloud
https://cloud.google.com/sdk/docs/install

# Video Deployment Reference
https://www.youtube.com/watch?v=_OqxXjiASDI

## website URL:
https://tmitchmachine.com


## Creating A Project
`gcloud projects create project name`


<!-- Everything below no longer used

## Pre Deployment New Terminal
3. `pip freeze > requirements.txt` make sure sure .txt is correct  

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
 -->
