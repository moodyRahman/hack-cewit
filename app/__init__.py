
# from google.cloud import language_v1
from flask import *

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")