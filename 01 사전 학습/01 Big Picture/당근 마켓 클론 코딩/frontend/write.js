const form = document.getElementById("write-form");

const handleSubmitForm = async (event) => {
    event.preventDefault();
    // try 안에 코드를 실행해보다가 error가 발생하면 
    try {
        const res = await fetch('/items', {
            method: 'POST',
            body: new FormData(form),
        });
        // 이 밑의 코드가 실행이 되어라 
    } catch (e) {
        const data = await res.json();
        // window 객체 참고하여 pathname을 root로 바꾸기 
        if (data === '200') window.location.pathname = "/";
    }
    console.log(e);
};

form.addEventListener("submit", handleSubmitForm);