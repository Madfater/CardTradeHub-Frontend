from flask import Flask, jsonify, request, render_template
import mysql as sql
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/api/user', methods=['GET'])
def get_user_info():
    return jsonify("get")

@app.route('/api/user', methods=['POST'])
def submit_user_info():
    sql.pr()
    sql.manageCommand(request.get_json())
    return jsonify("success")

'''@app.route('/api/user')
def renderHtml():
    return render_template('home.html')'''

if __name__ == '__main__':
    app.run(debug=True)