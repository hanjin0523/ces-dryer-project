import pymysql

def is_connected(connection):
    try:
        connection.ping()
    except:
        return False
    return True
def dbtest():
#메인코드 유저테이블데이터에서 뽑아오는 쿼리날리기
    conn = pymysql.connect(host='localhost',port=3306,user='jang', password='jang', db='cestest', charset='utf8')
    cur = conn.cursor()
    sql = "SELECT dr.recipeName , dr.recipeNum ,rl.recipeListNum ,rl.recipeTem ,rl.recipeHum , rl.actionTime , rl.recipeListJoin  FROM recipeList rl join dryRecipe dr on rl.recipeNum = dr.recipeNum WHERE rl.recipeNum = 1"
    cur.execute(sql)
    i = 0
    recipes = []
    while(True): 
        row = cur.fetchone()
        if row==None:
            break
        data1 = row[0]
        data2 = row[1]
        data3 = row[2]
        data4 = row[3]
        data5 = row[4] 
        data6 = row[5]
        data7 = row[6]
        i += 1
        print("%5s %5d %5d %d %d %s %s %d" % (data1,data2,data3,data4,data5,data6,data7,i))
        recipes.append("%5s %5d %5d %d %d %s %s %d" % (data1,data2,data3,data4,data5,data6,data7,i))
    conn.close()
    return recipes

def dateTest(date):
    conn = pymysql.connect(host='localhost',port=3306,user='jang', password='jang', db='cestest', charset='utf8')
    cur = conn.cursor()
    sql = "SELECT * FROM recipeList rl WHERE recipeListJoin = %s"
    cur.execute(sql, date)
    list = []
    while(True):
        row = cur.fetchone()
        if row == None:
            break
        data1 = row[0]
        data2 = row[1]
        data3 = row[2]
        data4 = row[3]
        data5 = row[4] 
        data6 = row[5]
        list.append("%d %d %d %d %s %s" % (data1,data2,data3,data4,data5,data6))
    conn.close()
    return list

def jsonTest(date) :
    conn = pymysql.connect(host='localhost',port=3306,user='jang', password='jang', db='cestest', charset='utf8')
    cur = conn.cursor()
    sql = "SELECT dr.recipeName, rl.recipeListNum, rl.recipeNum, rl.actionTime,	rl.recipeListJoin FROM recipeList rl join dryRecipe dr on rl.recipeNum = dr.recipeNum WHERE recipeListJoin = %s" 
    cur.execute(sql, date)
    
    json = []
    i = 0
    while(True):
        row = cur.fetchone()
        if row == None:
            break
        data1 = row[0]
        data2 = row[1]
        data3 = row[2]
        data4 = row[3]
        data5 = row[4] 
        i += 1
        json.append('"%s, %s, %s, %s, %s, %d"' % (data1,data2,data3,data4,data5,i))
    conn.close()
    print(json)
    return json