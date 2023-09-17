const timeElement = document.querySelector(".time");

function 색깔을_바꿔주는_함수() {
  if (timeElement.style.color === "orange") {
    timeElement.style.color = "blue";
  } else {
    timeElement.style.color == "orange";
  }
}

function 숫자를_바꿔주는_함수() {
  timeElement.innerText = "12:00";
}

timeElement.addEventListener("mouseover", 색깔을_바꿔주는_함수());
