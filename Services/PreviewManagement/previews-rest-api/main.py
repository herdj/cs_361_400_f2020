from flask import Flask, request, jsonify
from json2html import *
import json
import github

# Create Flask application
app = Flask(__name__)

# Register blueprint to github
app.register_blueprint(github.bp)

@app.route("/")
def index():
    return "Please visit /services/github to use this API."

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=9000, debug=True)