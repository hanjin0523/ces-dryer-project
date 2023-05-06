import pymysql
import datetime

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
    # 데이터베이스 연결
    with connect_db() as conn:
        with conn.cursor() as cur:
            # drying_table 테이블에서 dry_number와 dried_product_name 불러오기
            sql = "SELECT dt.dry_number, dt.dried_product_name FROM drying_table AS dt"
            cur.execute(sql)
            dry_list = cur.fetchall()
            arr_dry = list(dry_list)
    return arr_dry

def getDryRecipe(dry_number: str):
    # 레시피의 상세 가동여부 뽑아오는 쿼리
    print(dry_number,"dry_number")
    with connect_db() as conn:
        with conn.cursor() as cur:
            sql = '''SELECT 
                        dt.dried_product_name ,
                        rt.dry_number, SUM(numbering) AS total_stage_number,
                        SEC_TO_TIME(SUM(TIME_TO_SEC(uptime))) AS total_uptime
                    FROM recipe_table rt 
                    JOIN drying_table dt 
                    ON dt.dry_number = rt.dry_number  
                    WHERE dt.dry_number = %s
                    GROUP BY dt.dry_number; '''
            cur.execute(sql, (dry_number))
            dry_list = cur.fetchone()
            recipeList = list(dry_list)
            print(recipeList)
    return recipeList


def stageModify(stage_num:int, dry_number:str):
    # 레시피의스테이지 수정
    with connect_db() as conn:
        with conn.cursor() as cur:
            sql ='''SELECT 
                        rt.dry_number,
                        SEC_TO_TIME(SUM(CASE WHEN rt.stage_number <= (0+%s) THEN TIME_TO_SEC(rt.uptime) ELSE 0 END)) AS total_uptime_below_3
                    FROM recipe_table rt
                    WHERE rt.dry_number = %s
                    GROUP BY rt.dry_number; '''
            cur.execute(sql, (stage_num,dry_number))
            dry_list = cur.fetchone()
            stage_list = list(dry_list)
            print(stage_list)
    return stage_list

def recipeModify(inputValue : str, recipeNum : str):
    ##레시피 변경
    now = datetime.datetime.now()
    now_str = now.strftime('%Y-%m-%d %H:%M:%S')
    with connect_db() as conn:
        with conn.cursor() as cur:
            sql ='''UPDATE 
                    drying_table 
                    SET
                    dried_product_name = %s ,
                    modification_date = %s
                    WHERE dry_number = %s;
                    '''
            cur.execute(sql, (inputValue, now_str ,recipeNum))
            conn.commit()
            print(cur.rowcount)
    return 

def recipeAdd(inputValue : str):
    ##레시피 추가
    with connect_db() as conn:
        with conn.cursor() as cur:
            sql ='''INSERT 
                    INTO 
                    drying_table (dried_product_name, registration_date, modification_date)
                    VALUES 
                    (%s, DATE(NOW()), DATE(NOW()));
                    '''
            cur.execute(sql, (inputValue,))
            conn.DatabaseError
            conn.commit()
    return 

def recipeDelete(recipeNum : str):
    ##레시피 변경
    with connect_db() as conn:
        with conn.cursor() as cur:
            sql ='''DELETE 
                    FROM 
                    recipe_table 
                    WHERE 
                    dry_number = %s;
                    '''
            cur.execute(sql, (recipeNum,))

            sql ='''DELETE 
                    FROM 
                    drying_table 
                    WHERE 
                    dry_number = %s;
                    '''
            cur.execute(sql, (recipeNum,))

            conn.commit()
    return 

def getDetailRecipeList(selectNum : str):
    with connect_db() as conn: 
        with conn.cursor() as cur:
            sql = '''
                    SELECT 
                        rt.recipe_number , 
                        rt.dry_number ,
                        rt.numbering,
                        dt.dried_product_name,
                        rt.set_temperature ,
                        rt.set_humidity ,
                        rt.uptime 
                    FROM 
                        recipe_table rt 
                        INNER JOIN drying_table dt 
                        on rt.dry_number = dt.dry_number 
                    WHERE rt.dry_number =%s;
                    '''
            cur.execute(sql, (selectNum,))
            detailRecipeStage_list = cur.fetchall()
            detailRecipeList = list(detailRecipeStage_list)
            print(detailRecipeList)
    return detailRecipeList

def stageAdd(addInputValue : str):
    with connect_db() as conn: 
        with conn.cursor() as cur:
            sql = '''
                    SELECT 
                        rt.recipe_number , 
                        rt.dry_number ,
                        rt.stage_number ,
                        rt.set_temperature ,
                        rt.set_humidity ,
                        rt.uptime 
                    FROM 
                        recipe_table rt 
                    WHERE rt.dry_number = %s;
                    '''
            cur.execute(sql, (addInputValue,))
            detailRecipeStage_list = cur.fetchall()
            detailRecipeList = list(detailRecipeStage_list)
            print(detailRecipeList)
    return detailRecipeList

def stageAdd(inputValue : str):#####미완임... 작업예정
    ##스테이지 추가
    with connect_db() as conn:
        with conn.cursor() as cur:
            sql ='''INSERT 
                    INTO 
                    drying_table (dried_product_name, registration_date, modification_date)
                    VALUES 
                    (%s, DATE(NOW()), DATE(NOW()));
                    '''
            cur.execute(sql, (inputValue,))
            conn.DatabaseError
            conn.commit()
    return 

def stageDelete(stageNum : str):
    ##레시피 변경
    with connect_db() as conn:
        with conn.cursor() as cur:
            sql ='''DELETE 
                    FROM 
                        recipe_table 
                    WHERE 
                        recipe_number = %s;
                    '''
            cur.execute(sql, (stageNum,))
            conn.commit()
    return 