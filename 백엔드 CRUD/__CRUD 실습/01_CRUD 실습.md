### 01_CRUD 실습

#### ◾ 벡엔드와의 대화 

* 백엔드에 정보를 보내는 3가지 방법 : path, query, req body
* 실제 우리 프로젝트에 응답을 처리 



#### ◾ 벡엔드의 CRUD

> 데이터를 처리하는 4가지 기본 작업 

* Create : 새로운 데이터 생성 추가 

* Read : 데이터 조회 및 검색

* Update : 기존 데이터 변경 또는 갱신 

* Delete : 데이터 삭제 



#### ◾ Rest API?

* Representational State Transfer

> 특징 1) Stateless 무상태성 
>
> 특징 2) Cacheable 캐시 가능성 
>
> 특징 3) Client-Server 클라이언트-서버구조 
>
> 특징 4) Layered System 게층화된 시스템 



#### ◾간단한 메모앱 만들기 

##### 1. 기본적인 틀 만들기 (index.html)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Memo</title>
  </head>
  <body>
    <form>
      <label for="memo-input">memo here!</label>
      <input type="text" id="memo-input" placeholder="hoho!" required />
      <button id="memo-submit" type="submit">enter</button>
    </form>

    <ul>
      <!-- <li>1번 항목</li>
      <li>2번 항목</li> -->
    </ul>
    <script src="app.js"></script>
  </body>
</html>

```



##### 2. 서버 만들기 (main.py)

```python
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

# FastAPI를 만들어주고 
app = FastAPI()

# 루트 경로에 있는 우리의 static 파일에 있는 
# html 을 호스팅 해줘!
app.mount("/", 
          StaticFiles(directory='static', html=True), 
          name='static'
          )
```



##### 3. static 파일 만들기 

> 📁 static 
>
> > app.js
> >
> > index.html
>
> main.py

* 실행 

```bash
uvicorn main:app --reload
```

* 결과 : 우리가 만든 html 파일을 확인 할 수 있다. 

```bash
Microsoft Windows [Version 10.0.22621.2283]
(c) Microsoft Corporation. All rights reserved.     

C:\Users\areur\Desktop\Web Development\백엔드 CRUD\__CRUD 실습\Memo>uvicorn main:app --reload
INFO:     Will watch for changes in these directories: ['C:\\Users\\areur\\Desktop\\Web Development\\백
엔드 CRUD\\__CRUD 실습\\Memo']
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process [28756] using WatchFiles
INFO:     Started server process [14536]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     127.0.0.1:54244 - "GET / HTTP/1.1" 200 OK
INFO:     127.0.0.1:54244 - "GET /app.js HTTP/1.1" 200 OK
INFO:     127.0.0.1:54244 - "GET /favicon.ico HTTP/1.1"
```



##### 4. create

(1) main.py

```python
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
```

(2) app.js

```javascript
// app.js 에서 가장 먼저 필요한것
// 우리가 만든 텍스트를 서버로 보내서
// 메모를 생성하는 과정이 필요하다.

// 2. 서버에게 요청보내기
// await는 async와 같이 작성해야 한다.
async function createMemo(value) {
  // fetch를 해서 memos 요청하기
  // just fetch로만 보내게 되면 get 요청이 default로 가기 때문에
  // post로 수정하기
  const res = await fetch("/memos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // json.stringify 안에 객체 넣어주기
    // 이유 : 통신을 할때는 문자열로만 전송 가능
    // 그래서 문자열로 body를 바꿔주고 전송을 한 다음에 받는 쪽에서
    // 다시 json 형태로 바꿔서 처리하고 다시 문자열로 바꿔서
    // 전송하고 받고 이러한 과정이 필요하다 따라서 json.stringify로 body를 바꿔주고
    // 요청을 보낸다.
    body: JSON.stringify({
      // json값
      id: new Date(),
      content: value,
    }),
  });
  const jsonRes = await res.json();
  console.log(jsonRes);
}

// 1. 생성하는 함수
function handleSubmit(event) {
  // redirect 방지하기
  event.preventDefault();
  // 동작하는지 확인하기  console.log("working?");
  // 값가져오기
  const input = document.querySelector("#memo-input");
  //   input에 있는 value 값 넘겨주기
  createMemo(input.value);
}

const form = document.querySelector("#memo-form");
form.addEventListener("submit", createMemo);

```



##### 5. read

(1) main.py

```python
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


# 루트 경로에 있는 static 파일 호스팅
app.mount("/", StaticFiles(directory='static', html=True), name='static')
```

(2) app.js

```javascript

function displayMemo(memo) {
  const ul = document.querySelector("#memo-ul");
  const li = document.createElement("li");
  li.innerText = `[id:${memo.id}] ${memo.content}`;
  ul.appendChild(li);
}


async function readMemo() {
  const res = await fetch("/memos");
  const jsonRes = await res.json();
  const ul = document.querySelector("#memo-ul");
  ul.innerHTML = "";
  jsonRes.forEach(displayMemo);
}


async function createMemo(value) {
  const res = await fetch("/memos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: new Date().getTime(),
      content: value,
    }),
  });
  readMemo();
}

function handleSubmit(event) {
  event.preventDefault();
  const input = document.querySelector("#memo-input");
  createMemo(input.value);
}

const form = document.querySelector("#memo-form");
form.addEventListener("submit", handleSubmit);

readMemo();

```



##### 6. update

(1) app.js

```js
// 5. 버튼 동작 
async function editMemo(event) {
  const id = event.target.dataset.id;
  const editInput = prompt("write here hehe");
  // 값을 받았으니 요청 보내기 
  const res = await fetch(`/memo/${id}`, {
    // 특정값이 있을 때 이값으로 바꿔줘 = PUT
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      content: editInput,
    }),
  });
}

// 4. memos값을 html 에 추가하기
function displayMemo(memo) {
  const ul = document.querySelector("#memo-ul");

  const li = document.createElement("li");
  li.innerText = `[id:${memo.id}] ${memo.content}`;

  editBtn.innerText = "edit content";
  editBtn.addEventListener("click", editMemo);
  // 특정 메모의 값을 바꾸려면 특정 메모 id가 몇번인지 알아야한다.
  // id를 알기위해 editbtn에 data로 넣어주기
  // data.id를 dataset이라고 부른다. 
  // dataset이라는 속성에 id라는 값에 메모의 id를 넣어준다.
  editBtn.dataset.id = memo.id;

  li.appendChild(editBtn);
  ul.appendChild(li);

}


```

(2) main.py

```python
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

# put
@app.put("/memos/{memo_id}")
def put_memo(req_memo:Memo):
    for memo in memos:
        if memo.id==req_memo.id:
            memo.content=req_memo.content
            return "done"
    return "no back back"


# 루트 경로에 있는 static 파일 호스팅
app.mount("/", StaticFiles(directory='static', html=True), name='static')
```



##### 7. delete

(1) app.js

```js
async function deleteMemo(event) {
  const id = event.target.dataset.id;
  const res = await fetch(`/memo/'${id}`, {
    method: "DELETE",
  });
  readMemo()
}
```

(2) main.py

```python
@app.delete("/memos/{memo_id}")
def delete_memo(memo_id):
    # enumerate : index와 값을 같이 뽑아주는 함수
    for index,memo in enumerate(memos):
        if memo.id==memo_id:
            memos.pop(index)
            return "bye"
        return "no memo"
```

