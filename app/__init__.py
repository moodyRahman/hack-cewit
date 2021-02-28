from google.cloud import language_v1
from flask import *
from flask_cors import CORS
import requests as r
from requests.api import head
from os import environ
from collections import defaultdict
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
CORS(app)
client = language_v1.LanguageServiceClient()

@app.route("/")
def index():
    return render_template("index.html")

def help():
    return {
        "occurences":0,
        "magnitude":0
    }

@app.route("/metaapi", methods=["POST", "GET"])
def final_api():
    indata = request.get_json()
    category = indata["category"]
    location = indata["location"]
    out = {
        "positive":[],
        "negative":[],
        "neutral":[]
    }

    nout = []
    headers = {"Authorization":environ["YELP_KEY"]}
    res = r.get("https://api.yelp.com/v3/businesses/search?categories={0}&location={1}".format(category, location), headers=headers)
    
    review_url = "https://api.yelp.com/v3/businesses/{}/reviews"
    for business in json.loads(res.content)["businesses"][:3]:
        review_res = r.get(review_url.format(business["id"]), headers=headers)
        for review in json.loads(review_res.content)["reviews"]:
            document = {"content": review["text"], "type_": language_v1.Document.Type.PLAIN_TEXT, "language": "en"}
            res_entities = client.analyze_entity_sentiment(request={'document': document})
            res_sentiment = client.analyze_sentiment(request={'document': document})
            res_entities = client.analyze_entity_sentiment(request={'document': document})
            sentimental_score = res_sentiment.document_sentiment.score
            
            print("===========================")
            print(sentimental_score)
            print (res_entities.entities)

            if (sentimental_score > 0.2):
                for e in res_entities.entities:
                    out["positive"][e.name]+=1
                    nout.append({
                        "name":e.name,
                        "sentiment":"positive",
                        "magnitude":e.sentiment.score})
            elif (sentimental_score < -0.2):
                for e in res_entities.entities:
                    out["negative"][e.name]+=1
                    nout.append({
                        "sentiment":"negative",
                        "magnitude":e.sentiment.score})
            else:
                for e in res_entities.entities:
                    out["neutral"][e.name]+=1
                    nout.append({
                        "sentiment":"neutral",
                        "magnitude":e.sentiment.score})
            # print(res_sentiment.document_sentiment.magnitude)
            print(review)
            print(res_sentiment)
            print("========")
            print(res_entities)
            print("\n\n")

    return json.dumps(nout)



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