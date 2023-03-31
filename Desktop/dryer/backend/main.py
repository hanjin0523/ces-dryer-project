from typing import Union
from fastapi import FastAPI, Query
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

import databaseMaria


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


@app.get("/")
def read_root():
    re = "바보"
    return re


@app.get("/dryList")
def dryList():
    dryList = databaseMaria.getDryList()
    return dryList

@app.get("/getDryRecipe")
async def getDryRecipe(param : int = Query(..., gt=0)): 
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