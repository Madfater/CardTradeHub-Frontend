from flask import Flask, jsonify, request

app = Flask(__name__)

# 假設有一個用戶資訊
user_info = {"name": "John Doe", "age": 30}

# GET 請求的端點
@app.route('/api/user', methods=['GET'])
def get_user_info():
    return jsonify(user_info)

# POST 請求的端點
@app.route('/api/user', methods=['POST'])
def submit_user_info():
    data = request.get_json()
    user_info["name"] = data["name"]
    user_info["age"] = data["age"]
    print("user_info : ", user_info)
    return jsonify(user_info)

if __name__ == '__main__':
    app.run(debug=True)
