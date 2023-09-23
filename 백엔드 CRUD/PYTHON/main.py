from fastapi import FastAPI

app = FastAPI()


@app.get("/hello")
def sayhello():
    return {"message": "안녕하세요 여러분"}
