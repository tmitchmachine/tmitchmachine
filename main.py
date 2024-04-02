from flask import Flask, render_template, request, redirect
import csv
import os

app = Flask(__name__, static_folder='public/static')

@app.route("/")
def my_home():
    return render_template('home')

# create dynamic routes:
@app.route("/<string:page_name>")
def html_page(page_name):
    return render_template(page_name)

# create a csv file to store the contact form data:
def write_to_csv(data):
    with open('database.csv', mode='a') as database_csv:
        email = data['email'] 
        subject = data['subject']
        message = data['message']
        csv_file = csv.writer(database_csv, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)  
        csv_file.writerow([email,subject,message]) 

@app.route('/submit_form', methods=['POST'])
def submit_form():
    if request.method == 'POST':
        try:
            data = request.form.to_dict()  
            write_to_csv(data)
            return redirect('/thankyou.html')
        except Exception as e:
            print(e)
            return 'did not save to database'
    else:
        return 'Method Not Allowed'

if __name__ == "__main__":
    # Use the PORT environment variable to listen on the correct port
    port = int(os.environ.get("PORT", 8080))
    app.run(host='0.0.0.0', port=port)