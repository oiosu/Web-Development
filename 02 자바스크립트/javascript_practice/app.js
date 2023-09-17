// const timeElement = document.querySelector(".time");

// function 색깔을_바꿔주는_함수() {
//   if (timeElement.style.color === "orange") {
//     timeElement.style.color = "blue";
//   } else {
//     timeElement.style.color == "orange";
//   }
// }

// function 숫자를_바꿔주는_함수() {
//   timeElement.innerText = "12:00";
// }

// timeElement.addEventListener("mouseover", 색깔을_바꿔주는_함수());

// function sayHello() {
//   console.log("안녕하세요!");
// }

// setTimeout(sayHello, 1000);

// ----------------------------------------------------

// function setTime() {
//   const time = new Date();
//   const 분 = time.getMinutes().toString();
//   const 초 = time.getSeconds().toString();
//   const timeH1 = document.querySelector("#time");
//   // `${}` :  {} 안에 변수를 넣을 수 있다.
//   //   또한 `` (backtick) 을 사용하면서 분이라는 값 자체가
//   // 문자열로 들어가게 된다.
//   timeH1.innerText = `${분.padStart(2, "0")}:${초}`;
// }

// setInterval(setTime, 1000);

const 시작_시간 = new Date();

function setTime() {
  const 현재_시간 = new Date();
  const 흐른_시간 = new Date(현재_시간 - 시작_시간);
  const 분 = 흐른_시간.getMinutes().toString();
  const 초 = 흐른_시간.getSeconds().toString();
  const timeH1 = document.querySelector("#time");
  timeH1.innerText = `${분.padStart(2, "0")}:${초.padStart(2, "0")}`;
}

setInterval(setTime, 1000);
