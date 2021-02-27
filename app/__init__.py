from google.cloud import language_v1
from flask import *
import requests as r
from requests.api import head
from monkeylearn import MonkeyLearn

app = Flask(__name__)
client = language_v1.LanguageServiceClient()

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/metaapi", methods=["POST", "GET"])
def final_api():
    # indata = request.get_json()
    # category = indata["category"]
    # location = indata["location"]
    all_reviews = []
    out = {
        "positive":[],
        "neegative":[]
    }
    headers = {"Authorization":"Bearer -8D2oNF2Nc0IFt_blYrPMpD96i-HIcOuDb76xLRklBR9IfvSef-Uio28lVpuIicfB3pxoWpdli3bNvOUsGsxNHGz5IB7NpH5vfe4eGgTLVO_roc7WWjlh29JYLY6YHYx"}
    res = r.get("https://api.yelp.com/v3/businesses/search?categories=chinese&location=nyc", headers=headers)
    
    review_url = "https://api.yelp.com/v3/businesses/{}/reviews"
    for business in json.loads(res.content)["businesses"][:3]:
        review_res = r.get(review_url.format(business["id"]), headers=headers)
        for review in json.loads(review_res.content)["reviews"]:
            document = {"content": review["text"], "type_": language_v1.Document.Type.PLAIN_TEXT, "language": "en"}
            entities = client.analyze_entities(request={'document': document})
            sentiment = client.analyze_sentiment(request={'document': document})
            sentimental_score = sentiment.document_sentiment.score
            if (sentimental_score > 0.2):
                pass
            if (sentimental_score < -0.2):
                pass
            print(sentiment.document_sentiment.magnitude)
            print(review)
            print(sentiment)
            print("========")
            print(entities)
            print("\n\n")

    model_id = 'ex_YCya9nrn'
    # result = ml.extractors.extract(model_id, all_reviews[:55])
    return json.loads(res.content)



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