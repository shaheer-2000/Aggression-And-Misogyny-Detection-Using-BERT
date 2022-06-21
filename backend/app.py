from models import clf_A, clf_B, get_label
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/api", methods=["POST"])
def predict_label():
	text = None

	try:
		text = request.json["text"]
	except:
		return "Expected JSON body with key \"text\"", 400

	label_A = get_label(clf_A.predict(text, max_len=160)[0], label_for="A")
	label_B = get_label(clf_B.predict(text, max_len=160)[0], label_for="B")

	return {
		"label_A": label_A,
		"label_B": label_B
	}, 200


if __name__ == "__main__":
	app.run(host="localhost", port=5000)

