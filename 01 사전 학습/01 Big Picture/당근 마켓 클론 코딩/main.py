from fastapi import FastAPI, UploadFile, Form 
from fastapi.staticfiles import StaticFiles
from typing import Annotated
import sqlite3

con = sqlite3.connect('db.db', check_same_thread=False)
# db에서 cursor를 이용해서 특정 인서트하거나 셀렉트 할때 사용
cur = con.cursor()

app = FastAPI()

@app.post('/items')
async def create_item(
    image:UploadFile, 
    title:Annotated[str,Form()], 
    price:Annotated[int,Form()], 
    description:Annotated[str,Form()], 
    place:Annotated[str,Form()]
    ):
    image_bytes = await image.read()
    cur.execute(f"""
                INSERT INTO items(title, image, price, description, place)
                VALUES ('{title}', ''{image_bytes.hex()}', '{price}', '{description}', '{place}')
                """)
    # 데이터가 들어감 
    con.commit()
    return '200'




app.mount("/", StaticFiles(directory="frontend", html=True), name="frontend")
