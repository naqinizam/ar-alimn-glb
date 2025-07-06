from flask import Flask, render_template, send_from_directory

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/how-it-works')
def how_it_works():
    return render_template('how-it-works.html')

@app.route('/ar-viewer')
def ar_viewer():
    return render_template('ar-viewer.html')

@app.route('/models/<path:filename>')
def serve_model(filename):
    return send_from_directory('static/models', filename)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)