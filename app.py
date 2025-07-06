from flask import Flask, render_template
from flask_cors import CORS  # Required for iOS

app = Flask(__name__)
CORS(app)  # Enable CORS

@app.route('/')
def home():
    return render_template('ar-viewer.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)