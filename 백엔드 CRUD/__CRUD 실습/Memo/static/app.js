// app.js 에서 가장 먼저 필요한것
// 우리가 만든 텍스트를 서버로 보내서
// 메모를 생성하는 과정이 필요하다.

const { del } = require("request");

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

// 6. 삭제하기 
async function deleteMemo(event) {
  const id = event.target.dataset.id;
  const res = await fetch(`/memo/'${id}`, {
    method: "DELETE",
  });
  readMemo()
}


// 4. memos값을 html 에 추가하기
function displayMemo(memo) {
  const ul = document.querySelector("#memo-ul");

  const li = document.createElement("li");
  li.innerText = `${memo.content}`;

  const edit = document.createElement("button");
  editBtn.innerText = "edit content";
  editBtn.addEventListener("click", editMemo);
  // 특정 메모의 값을 바꾸려면 특정 메모 id가 몇번인지 알아야한다.
  // id를 알기위해 editbtn에 data로 넣어주기
  // data.id를 dataset이라고 부른다. 
  // dataset이라는 속성에 id라는 값에 메모의 id를 넣어준다.
  editBtn.dataset.id = memo.id;
  delBtn.innerText = "delete";
  delBtn.addEventListener("click", deleteMemo);
  delBtn.dataset.id = memo.id;

  //삭제하기 
  const delBtn = document.createElement("button");

  li.appendChild(editBtn);
  li.appendChild(delBtn);
  ul.appendChild(li);

}

// 3. READ
async function readMemo() {
  const res = await fetch("/memos");
  const jsonRes = await res.json();
  const ul = document.querySelector("#memo-ul");
  ul.innerHTML = "";
  jsonRes.forEach(displayMemo);
}

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
      id: new Date().getTime(),
      content: value,
    }),
  });
  readMemo();
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
form.addEventListener("submit", handleSubmit);

readMemo();
