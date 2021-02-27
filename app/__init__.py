from google.cloud import language_v1
from flask import *

app = Flask(__name__)
client = language_v1.LanguageServiceClient()

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api", methods=["POST", "GET"])
def nlpapi():
    if request.method == "POST":
        text = request.form["text"]
        document = language_v1.Document(content=text, type_=language_v1.Document.Type.PLAIN_TEXT)

        # Detects the sentiment of the text
        sentiment = client.analyze_sentiment(request={'document': document}).document_sentiment

        print("Text: {}".format(text))
        return render_template("nlpdemo.html", sentiment=sentiment, text=text)
    else:
        return render_template("nlpdemo.html")


@app.route("/syntaxapi", methods=["POST", "GET"])
def syntaxapi():
    if request.method == "POST":
        text = request.form["text"]
        document = language_v1.Document(content=text, type_=language_v1.Document.Type.PLAIN_TEXT)

        # Detects the sentiment of the text
        tokens = client.analyze_syntax(request={'document': document})

        print("Text: {}".format(text))
        return render_template("syntaxdemo.html", tokens=tokens, text=text)
    else:
        return render_template("syntaxdemo.html")