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

# Deployment 
1. `gcloud builds submit --tag gcr.io/mitch-deal/mitchdealimage:latest --timeout=40 mitch_deal`
2. 


## website URL:
https://mitchdeal.com
