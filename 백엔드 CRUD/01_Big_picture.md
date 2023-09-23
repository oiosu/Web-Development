#### ◾백엔드와 소통하는 법 

> 백엔드와 프론트엔드를 연결시켜주는 것은 API

* **백엔드 서버 만들기** 

```java
from fastapi import FastAPI
    
app = FastAPI()
    
@app.get("/hello")
def hello():
	return {"message": "안녕하세요 여러분"}
```

