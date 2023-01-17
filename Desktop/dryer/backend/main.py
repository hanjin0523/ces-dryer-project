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


@app.get("/items/{date}")
def read_item(date: str, q: Union[str, None] = None):
    re1 = databaseMaria.jsonTest(date)
    return re1


@app.put("/items/{item_id}")
def update_item(item_id: int, item: Item):
    return {"item_name": item.name, "item_id": item_id}