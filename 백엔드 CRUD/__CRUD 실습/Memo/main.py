from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

# 객체로 어떤 request body로 받으려면 메모라는 클래스를 지정해줘야한다. 
class Memo(BaseModel):
    id:str
    content:str
# memos라는 배열을 만들어서 
memos=[]

# FastAPI를 만들어주고 
app = FastAPI()

app.post("/memos")
def create_memo(memo):
    memos.append(memo)
    return 'memo memo append yeah!'

# 루트 경로에 있는 우리의 static 파일에 있는 
# html 을 호스팅 해줘!
app.mount("/", 
          StaticFiles(directory='static', html=True), 
          name='static'
          )