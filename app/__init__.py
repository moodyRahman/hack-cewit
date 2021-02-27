from google.cloud import language_v1
from flask import *
import requests as r
from requests.api import head
from os import environ
from collections import defaultdict

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
        "positive":defaultdict(lambda: 1),
        "negative":defaultdict(lambda: 1),
        "neutral":defaultdict(lambda: 1)
    }
    headers = {"Authorization":environ["YELP_KEY"]}
    res = r.get("https://api.yelp.com/v3/businesses/search?categories=chinese&location=nyc", headers=headers)
    
    review_url = "https://api.yelp.com/v3/businesses/{}/reviews"
    for business in json.loads(res.content)["businesses"]:
        review_res = r.get(review_url.format(business["id"]), headers=headers)
        for review in json.loads(review_res.content)["reviews"]:
            document = {"content": review["text"], "type_": language_v1.Document.Type.PLAIN_TEXT, "language": "en"}
            res_entities = client.analyze_entities(request={'document': document})
            res_sentiment = client.analyze_sentiment(request={'document': document})
            sentimental_score = res_sentiment.document_sentiment.score
            print(sentimental_score)
            if (sentimental_score > 0.2):
                for e in res_entities.entities:
                    out["positive"][e.name]+=1
            elif (sentimental_score < -0.2):
                for e in res_entities.entities:
                    out["negative"][e.name]+=1
            else:
                for e in res_entities.entities:
                    out["neutral"][e.name]+=1
            # print(res_sentiment.document_sentiment.magnitude)
            # print(review)
            # print(res_sentiment)
            # print("========")
            # print(res_entities)
            # print("\n\n")

    return out



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