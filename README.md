# Returning

## Running On Local
`FLASK_APP=main FLASK_ENV=development flask run`

## Deploying
`export FLASK_APP=main && export FLASK_ENV=production && gcloud init && gcloud app deploy`






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


