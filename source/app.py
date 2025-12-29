from flask import Flask, render_template, make_response, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    resp = make_response(render_template('index.html'))
    resp.set_cookie('data_fragment_part2', 'st0r4g3_1s_', path='/')
    return resp

@app.route('/diagnostics.html')
def diagnostics():
    return render_template('diagnostics.html')

@app.route('/api/storage')
def get_storage_fragment():
    return jsonify({'fragment': 'n3v3r_s3cur3}'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)
