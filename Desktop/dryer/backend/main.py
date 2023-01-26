from typing import Union
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

import databaseMaria


app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8081",
    "http://localhost:8000",
    "http://192.168.64.4:8000",
    "http://192.168.64.4:3000",
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
    re = databaseMaria.dbtest()
    return re


@app.get("/recipe/{date}")
def read_recipe(date: str, q: Union[str, None] = None):
    recipeList = databaseMaria.getRecipeList(date)
    return recipeList