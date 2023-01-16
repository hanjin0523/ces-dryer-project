import pymysql


#전역변수
conn = None
cur = None

sql = ""

def dbtest():
#메인코드 유저테이블데이터에서 뽑아오는 쿼리날리기
    conn = pymysql.connect(host='localhost',port=3306,user='root', password='root', db='cestest', charset='utf8')
    cur = conn.cursor()

    cur.execute("SELECT* FROM user")

    while(True): 
        row = cur.fetchone()
        if row==None:
            break
        data1 = row[0]
        data2 = row[1]
        data3 = row[2]
        data4 = row[3]
        print("%5s %15s %15s %s" % (data1,data2,data3,data4))
    conn.close()
    return data1,data2,data3,data4