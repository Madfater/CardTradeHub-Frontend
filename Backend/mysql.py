import pymysql
# 資料庫參數設定
db_settings = {
    "host": "127.0.0.1",
    "port": 3306,
    "user": "root",
    "password": "1236987450",
    "db": "kkbox",
    "charset": "utf8"
}
try:
    # 建立Connection物件
    conn = pymysql.connect(**db_settings)
    if conn != None:
        print("yes")
    # 建立Cursor物件
    with conn.cursor() as cursor:
        '''command = "INSERT INTO charts(id, name, artists)VALUES(2,5,8)"
        cursor.execute(command)'''
        command = "SELECT * FROM charts"
        # 執行指令
        cursor.execute(command)
        # 取得所有資料
        result = cursor.fetchall()
        print(result)
        #conn.commit()
except Exception as ex:
    print(ex)