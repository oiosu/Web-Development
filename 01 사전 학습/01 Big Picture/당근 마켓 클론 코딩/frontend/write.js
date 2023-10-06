const form = document.getElementById("write-form");

const handleSubmitForm = (event) => {
    event.preventDefault();
    fetch('/items', {
        method: 'POST',
        body: new FormData(form),
    })
};

form.addEventListener("submit", handleSubmitForm);