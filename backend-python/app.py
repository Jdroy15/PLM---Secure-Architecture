from flask import Flask, request, jsonify
app = Flask(__name__)

@app.route('/')
def index():
    user = request.headers.get('X-Auth-Request-User', 'anonymous')
    email = request.headers.get('X-Auth-Request-Email','')
    groups = request.headers.get('X-Auth-Request-Groups','')
    return jsonify({"message":"protected resource","user":user,"email":email,"groups":groups})

@app.route('/admin')
def admin():
    groups = request.headers.get('X-Auth-Request-Groups','')
    if 'police_admins' not in groups:
        return jsonify({"error":"forbidden"}),403
    return jsonify({"message":"admin area"})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001)
