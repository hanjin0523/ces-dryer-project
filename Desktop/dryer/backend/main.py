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
    dryRecipe = databaseMaria.getDryRecipe(param)
    print(dryRecipe)
    return dryRecipe