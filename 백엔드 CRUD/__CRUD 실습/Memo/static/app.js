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
