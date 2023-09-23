## 2. API에 대해 이해하기 

**◾API란?**

> An application programming interface(API) is a way for two or more computer programs to communicate with each other

**◾ 인터페이스란?**

> 하나의 시스템을 구성하는 하드웨어와 소프트웨어 또는 2개의 시스템이 상호작용할 수 있도록 접속되는 경계(boundary)나 이 경계에서 상호 접속하기 위한 하드웨어, 소프트웨어, 조건, 규약 등을 포괄적으로 가리키는 용어



```bash
* 음식을 먹으러 식당에 갔다고 가정해보자
1. 종업원에게 직접 주문하는 방식 
2. 키오스크로 주문하는 방식 
3. 종업원이 오는 방식
```



* **프론트랑 백이 이러한 API없이 통신한다면?**

> - 제대로 기능을 할 수 없다. 
>
> - 특정 URL이라는 주소를 정하는 것부터 어떠한 방식으로 보낼 건지 
>
> - 상태코드는 어떤 걸로 해야하는 지 등등 모든 것을 합의하고 결정한다. 



##### ◾개발에서 말하는 API에 대해 이해하기 

> API(Application Programing Interface)는 서비스의 요청과 응답에 대한 규칙을 의미하지만 보통 API라고 하면 이러한 요청과 응답을 처리하는 `서비스(기능)`를 의미한다. 



---



## 3. FastAPI로 간단한 API서버 만들기 

* **FastAPI** : FastAPI프레임워크, 고성능, 간편한 학습, 빠른 코드 작성, 준비된 프로덕션 (프레임워크 : 우리가 필요한 기능들을 모아놓는 개발키트)



##### 1. Fastapi 설치하기 

```bash
pip install fastapi
```



##### 2. 공식문서 참고하여 간한 API 서버 코드 작성하기 

```python
from fastapi import FastAPI
    
app = FastAPI()
    
@app.get("/hello")
def hello():
	return {"message": "안녕하세요 여러분"}
```



##### 3. API를 띄어줄 수 있는 웹서버 만들기 

* `uvicorn` 이라는 웹 서버 이용하기 

**3-1. `uvicorn standard` 버전 설치하기**

```BASH
pip install uvicorn[standard]
```



**3-2. 앱 서버 설치 후 확인하기** 

```bash
uvicorn main:app --reload
```

> * uvicorn
>
> : uvicorn 이라는 웹 서버 이용하여 fastapi 띄운다.
>
> * main: 
>
> main.py 안에 있는 파일을 실행시킨다. 
>
> * app
>
> main.py 안에 있는 앱이라는 객체를 실행시킨다. 



**3-3. 결과** 

```bash
$ uvicorn main:app --reload
INFO:     Will watch for changes in these directories: ['C:\\Users\\areur\\Desktop\\Web Development\\백엔드 CRUD\\PYTHON']
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process [27544] using WatchFiles  
INFO:     Started server process [10024]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

> `http://127.0.0.1:8000/`
>
> * 로컬 호스트 : `http://127.0.0.1`
> * 8000 번 방 
>
> `@app.get("/hello")` hello 라는 경로로 만들어줬기 때문에 주소 추가하기 
>
> `http://127.0.0.1:8000/hello`
>
> ![image](https://github.com/oiosu/Web-Development/assets/99783474/1c8c620d-aa93-4bbb-9cda-2bd3699eaed3)




◾ `http://127.0.0.1:8000/docs` 라고 검색하면 Fastapi가 어떤 API를 사용하고 있는지 알 수 있다. 

![image](https://github.com/oiosu/Web-Development/assets/99783474/2220a655-588c-4585-aa7c-a1659580c507)



##### ◾ WHY FastAPI?

> : 빠르고 간편하다, 비동기를 지원한다, 문서화를 자동으로 해줌으로써 관리가 편안하다 
>
> : Django나 Flask도 많이 쓰인다. 
