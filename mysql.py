import pymysql
import json
# 資料庫參數設定
db_settings = {
    "host": "127.0.0.1",
    "port": 3306,
    "user": "root",
    "password": "qq816816", # 記得更改密碼
    "db": "mydb",
    "charset": "utf8"
}

def pr():
    print("1")

def insert(dst:str, *args):
    return f"INSERT INTO {dst} VALUES{args}"
def countTable(table:str):
    if command(f"Select Count(*) From {table}") == None:
        return 0
    return command(f"Select Count(*) From {table}")[0][0]

def manageCommand(data):
    print(data)
    if data['type'] == "login":
        id = countTable("user")
        command(insert("user",id+1,data['username'],data['password']))
    
def command(waitting_command):
    try:
        conn = pymysql.connect(**db_settings)
        if conn == None:
            print('fail')
            return
        with conn.cursor() as cursor:
            cursor.execute(waitting_command)
            result = cursor.fetchall()
            print(result)
            conn.commit()
            return result
    except Exception as ex:
        print(ex)
    return None