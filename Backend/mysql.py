import pymysql
from datetime import datetime
# 資料庫參數設定
db_settings = {
    "host": "127.0.0.1",
    "port": 3306,
    "user": "root",
    "password": "1236987450", # 記得更改密碼
    "db": "mydb",
    "charset": "utf8"
}
# insert dst:table名稱 
def insert(dst:str, args:tuple):
    return f"INSERT INTO {dst} VALUES{args}"

# 取得table內資料數
def countTable(table:str):
    return command(f"Select Count(*) From {table}")[0][0]

# 檢查user有無註冊過 用email檢查
def checkRegistered(email:str):
    return command(f"Select Count(*) From user where email = '{email}'")[0][0] != 0

# 註冊user
def registerUser(data):
    if checkRegistered(data['email']):
        return "User alreeady exist"
    user_acquirement = ["password","username","email","ismanager"]
    id = countTable("user") + 1
    user_arg = tuple([id] + [v for k,v in data.items() if k in user_acquirement]+[id,id])
    shopping_cart_arg = tuple([id,data['address'],0])
    store_arg=tuple([id,data['describe'],str(datetime.today().date())])
    command(insert("store",store_arg))
    command(insert("shopping_cart",shopping_cart_arg))
    command(insert("user",user_arg))
    return "register success"

# 登陸user
def loginUser(data):
    if not checkRegistered(data['email']):
        return "this email isn\'t register yet"
    acuratePassword = command(f"Select password from user where email = '{data['email']}'")[0][0]
    if data['password']==acuratePassword:
        return "login success"
    else:
        return "login failed"

# 處理傳入的json 跟據 json['type']來判斷操作
def manageCommand(data:dict):
    if data['type'] == "register":
        return registerUser(data)
    if data['type'] == "login":
        return loginUser(data)
    
# 執行操作
def command(waitting_command:str):
    try:
        conn = pymysql.connect(**db_settings)
        if conn == None:
            print('fail')
            return
        with conn.cursor() as cursor:
            cursor.execute(waitting_command) # 執行SQL程式碼
            result = cursor.fetchall()
            conn.commit()
            return result # 查詢的輸出
    except Exception as ex:
        print('execute:',ex)
    return None