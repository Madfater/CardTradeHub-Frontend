import pymysql
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
def insert(dst:str, *args):
    return f"INSERT INTO {dst} VALUES{args}"

# 取得table內資料數
def countTable(table:str):
    if command(f"Select Count(*) From {table}") == None:
        return 0
    return command(f"Select Count(*) From {table}")[0][0]

# 處理傳入的json 跟據 json['type']來判斷操作
def manageCommand(data:dict):
    if data['type'] == "login":
        id = countTable("user")
        command(insert("user",id+1,data['username'],data['password']))

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
        print(ex)
    return None