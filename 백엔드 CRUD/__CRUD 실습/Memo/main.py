from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

# 객체로 어떤 request body로 받으려면 메모라는 클래스를 지정해줘야한다. 
class Memo(BaseModel):
    id:int
    content:str
# memos라는 배열을 만들어서 
memos=[]

# FastAPI를 만들어주고 
app = FastAPI()

@app.post("/memos")
def create_memo(memo: Memo):  # Memo 모델을 파라미터로 사용
    memos.append(memo)
    return 'memo memo append yeah!'


# read_memo 함수를 GET 요청에 등록
@app.get("/memos")
def read_memo():
    return memos

@app.put("/memos/{memo_id}")
def put_memo(req_memo:Memo):
    for memo in memos:
        if memo.id==req_memo.id:
            memo.content=req_memo.content
            return "done"
    return "no back back"


# 루트 경로에 있는 static 파일 호스팅
app.mount("/", StaticFiles(directory='static', html=True), name='static')