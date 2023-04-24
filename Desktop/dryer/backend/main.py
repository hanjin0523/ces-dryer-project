from typing import Union
from fastapi import FastAPI ,Query
from fastapi.websockets import WebSocket
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import requests
import json


import databaseMaria
import config

app = FastAPI()

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

class Item(BaseModel):
    name: str
    price: float
    is_offer: Union[bool, None] = None


@app.get("/aa")
def read_root():
    re = "1"
    return re


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
        dryRecipe = ["레시피 등록해주세요",0,0,"레시피 등록해주세요"]
    return dryRecipe     

@app.get("/stageModify")
async def stageModify(stageValue : int , dryNum:str): 
    try:
        stageList = databaseMaria.stageModify(stageValue,dryNum)
    except:
        stageList = [0,"망고망고"]
    return stageList   

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

@app.get("/stageAdd")
async def stageAdd(addInputValue: str):
    try:
        # detailRecipeList = databaseMaria.getDetailRecipeList(selectNum)
        print(addInputValue,"서버")
        detailRecipeList = 0
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
async def dryer_situation():
    mergeData = []
    fields = ['operation','thermic_rays','blowing','learning','temperature','humidity']
    for field in fields:
        data = requests.get("http://"+config.BACKEND_CONFIG['ip']+config.BACKEND_CONFIG['dbport']+"/render/?&target="+config.BACKEND_CONFIG['metric']+field + "&from=-65s&format=json")
        value = get_last_value(data.json()[0].get('datapoints'))
        mergeData.append({'data':field, 'value':value})
    print(mergeData)
    return mergeData
