from typing import Union
from fastapi import FastAPI , Request
from fastapi.websockets import WebSocket
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import requests
import config
import queue
import asyncio

from socketSet import socketModule
from database import databaseMaria, graphiteDB
from operation import operation

import dto


app = FastAPI()
value = dto.InputValue(temperature=0, humidity=0)
value_oper = dto.Operating(thermic_rays=0, blowing=0, dehumidify=0)
graphite = graphiteDB.Transmission(temperature=0, humidity=0)
graphite_oper = graphiteDB.TransmissionOperating(thermic_rays=0, blowing=0, dehumidify=0)
q = asyncio.Queue()


origins = [
    "http://localhost",
    "http://localhost:8111",
    "http://localhost:8081",
    "http://192.168.64.4:8111",
    "http://192.168.64.4:8081",
    "http://192.168.64.4",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class stageAddData(BaseModel):
    temperature: str
    humidity: str
    time: str

@app.get("/testSenser")
def testSenser():
    data = socketModule.SocketControl.get_instance().start_server(['senser1'])
    print(data,"측정중")
    value.set_temperature(data[0][0])
    value.set_humidity(data[0][1])
    temp = value.get_temperature()
    hum = value.get_humidity()
    graphite.sendData(temp, hum)
    return data

@app.get("/testFan1")
def test():
    socketModule.SocketControl.get_instance().start_server(["fan2_off"])
    return None

@app.get("/testFan")
def test():
    socketModule.SocketControl.get_instance().start_server(["fan2_on"])
    return None

@app.post("/test1")
def test():
    operation.stop_monitoring()
    return None

@app.post("/test")
async def test(data: dict):
    print(data)
    arr = data['data']
    result = []
    for i in arr:
        result.append(i[4:7])
        await q.put(i[4:7])
    operation.start_monitoring(result)
    # operation.dequeue()
    return True


@app.get("/dryList")
def dryList():
    dryList = databaseMaria.getDryList()
    return dryList

@app.get("/dryList1")
def dryList():
    dryList = databaseMaria.getDryList()
    return dryList

@app.get("/getDryRecipe")
async def getDryRecipe(param : str): 
    print(param)
    try:
        dryRecipe = databaseMaria.getDryRecipe(param)
    except:
        dryRecipe = ["레시피 등록해주세요",'','',"레시피 등록해주세요"]
    return dryRecipe     

@app.get("/recipeModify")
async def recipeModify(inputValue : str, recipeNum : str):
    try:##처리부
        databaseMaria.recipeModify(inputValue, recipeNum)
        return {"status": "success"}
    except: 
        return {"status": "error"}
    
@app.get("/recipeAdd")
async def recipeModify(addInputValue : str):
    try:##처리부
        databaseMaria.recipeAdd(addInputValue)
        return {"status": "success"}
    except: 
        return {"status": "error"}    
    
@app.get("/recipeDelete")
async def recipeDelete(recipeNum : str):
    try:##처리부
        print(recipeNum)
        databaseMaria.recipeDelete(recipeNum)
        return {"status": "success"}
    except: 
        return {"status": "error"}

@app.get("/detailRecipeList")
async def detailRecipeList(selectNum: str):
    try:
        detailRecipeList = databaseMaria.getDetailRecipeList(selectNum)
    except: 
        detailRecipeList = 0
        return detailRecipeList
    return detailRecipeList

@app.post("/stageAdd")
async def stageAdd(request: Request):
    try:
        data = await request.json()
        serverNum = data.get('serverNum')
        addStageValue = data.get('addStageValue')
        print(data)
        databaseMaria.stageAdd(serverNum, addStageValue)
    except: 
        print("실패")
    return detailRecipeList

@app.get("/stageDelete")
async def stageDelete(stageNum: str):
    print(stageNum,"stageNum")
    try:
        detailRecipeList = databaseMaria.stageDelete(stageNum)
    except: 
        detailRecipeList = 0
        return detailRecipeList
    return detailRecipeList

def get_last_value(data):
    values = [point[0] for point in data if point[0] not in [None, -100, -200,-300,-400,-500]]
    if values:
        last_value = values[-1]
        return last_value
    else:
        return None

def get_last_value(data):
    values = [point[0] for point in data if point[0] not in [None, -100, -200,-300,-400,-500]]
    if values:
        last_value = values[-1]
        return last_value
    else:
        return None

@app.get("/dryer_situation_ws")
def dryer_situation():
    mergeData = []
    fields = ['operation','thermic_rays','blowing','learning','temperature','humidity']
    for field in fields:
        data = requests.get("http://"+config.BACKEND_CONFIG['ip']+config.BACKEND_CONFIG['dbport']+"/render/?&target="+config.BACKEND_CONFIG['metric']+field + "&from=-65s&format=json")
        value = get_last_value(data.json()[0].get('datapoints'))
        mergeData.append({'data':field, 'value':value})
    print(mergeData)
    return mergeData

