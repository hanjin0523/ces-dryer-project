import pymysql

def connect_db():
    conn = pymysql.connect(
        host='localhost',
        port=3306,
        user='jang',
        password='jang',
        db='cestest',
        charset='utf8'
    )
    return conn

def getDryList():
    # 등록레시피이름 뽑아오는 쿼리날리기
    conn = connect_db()
    cur = conn.cursor()
    sql ="SELECT dt.dry_number , dt.dried_product_name  FROM drying_table as dt"
    cur.execute(sql)
    dry_list = cur.fetchall()
    arr_dry = list(dry_list)
    print(arr_dry)
    conn.close()
    return arr_dry

def getDryRecipe(param):
    # Construct the value of dry_number using the param argument
    dry_number = f'num{param}'
    # 레시피의 상세 가동여부 뽑아오는 쿼리
    conn = connect_db()
    cur = conn.cursor()
    sql ='''SELECT 
                dt.dried_product_name ,
                rt.dry_number, SUM(numbering) AS total_stage_number,
                SEC_TO_TIME(SUM(TIME_TO_SEC(uptime))) AS total_uptime
            FROM recipe_table rt 
            JOIN drying_table dt 
            ON dt.dry_number = rt.dry_number  
            WHERE dt.dry_number = %s
            GROUP BY dt.dry_number; '''
    cur.execute(sql, (dry_number,))
    dry_list = cur.fetchone()
    arr_dry = list(dry_list)
    print(arr_dry[1])
    conn.close()
    return arr_dry

