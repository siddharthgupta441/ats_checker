from checker import getFile
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

score = ""

@app.route('/atsChecker', methods=['POST'])
def ats_checker():
    file = request.files['file']
    jd = request.form['jd']
    score = getFile(file, jd)
    data = {"score": score}
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)