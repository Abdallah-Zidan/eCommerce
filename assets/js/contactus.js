/* contactUs form */

let username = document.getElementById("username");
let userEmail = document.getElementById("userEmail");
let msgSubject = document.getElementById("msgSubject");
let msgBody = document.getElementById("msgBody");
let sendBtn = document.getElementById("sendBtn");
let statusElement = document.getElementById("sendingStatus");

function isValidInputs() {
    return username.checkValidity() &&
        userEmail.checkValidity() &&
        msgSubject.checkValidity() &&
        msgBody.checkValidity();
}

function disableSendBtn() {
    sendBtn.setAttribute("disabled", "true");
    sendBtn.style.cursor = "not-allowed";
}

function enableSendBtn() {
    sendBtn.removeAttribute("disabled");
    sendBtn.style.cursor = "pointer";
}

function toggleSendBtnStatus() {
    isValidInputs() ? enableSendBtn() : disableSendBtn();
}

function showMessageStatus(alertType, message) {
    let alert = document.createElement("div");
    alert.classList.add("alert", alertType, "alert-dismissible", "fade", "show");
    alert.setAttribute("role", "alert");
    let xBtn = document.createElement("button");
    xBtn.setAttribute("type", "button");
    xBtn.setAttribute("data-dismiss", "alert");
    xBtn.setAttribute("aria-label", "Close");
    xBtn.classList.add("close");
    xBtn.innerHTML = '<span aria-hidden="true">&times;</span>';
    alert.appendChild(xBtn);
    alert.append(message);
    statusElement.innerHTML = ""; // clear its content
    statusElement.appendChild(alert);
}

function disabledFormElements() {
    disableSendBtn();
    username.setAttribute("disabled", "true");
    userEmail.setAttribute("disabled", "true");
    msgSubject.setAttribute("disabled", "true");
    msgBody.setAttribute("disabled", "true");
}

function enableFormElements() {
    enableSendBtn();
    username.removeAttribute("disabled");
    userEmail.removeAttribute("disabled");
    msgSubject.removeAttribute("disabled");
    msgBody.removeAttribute("disabled");
}

[username, userEmail, msgSubject, msgBody].forEach(
    (element) => element.addEventListener('input', toggleSendBtnStatus)
);

let xhr = new XMLHttpRequest();
xhr.timeout = 5000;

// xhr events
xhr.ontimeout = function () {
    showMessageStatus("alert-danger", "Message took too long to send. Aborting..");
    xhr.abort();
    sendBtn.innerHTML = '<i class="fa fa-paper-plane">&nbsp;&nbsp;</i>Send';
    enableFormElements();
};

xhr.onerror = function () {
    showMessageStatus("alert-danger", "Failed to send your message");
    sendBtn.innerHTML = '<i class="fa fa-paper-plane">&nbsp;&nbsp;</i>Send';
    enableFormElements();
};

xhr.onreadystatechange = function () {
    if (xhr.status === 200 && xhr.readyState === 4) {
        let res = JSON.parse(xhr.responseText);
        let responseStatus = res.status;
        let alertType = responseStatus ? "alert-success" : "alert-warning";
        showMessageStatus(alertType, res.message);
        // set sending btn to its default
        sendBtn.innerHTML = '<i class="fa fa-paper-plane">&nbsp;&nbsp;</i>Send';
        enableFormElements();
    }
};


sendBtn.addEventListener('click', function (ev) {

    ev.preventDefault();

    if (!isValidInputs())
        return;

    disabledFormElements();

    statusElement.innerHTML = "";

    // set sending btn to loading
    {
        let loadingIcon = document.createElement("i");
        loadingIcon.classList.add("fa", "fa-spinner", "fa-pulse", "fa-fw");
        sendBtn.innerHTML = "";
        sendBtn.appendChild(loadingIcon);
        sendBtn.append(" Sending..");
    }

    let payload = {
        "name": username.value,
        "email": userEmail.value,
        "subject": msgSubject.value,
        "message": msgBody.value
    };

    const postURL = "https://afternoon-falls-30227.herokuapp.com/api/v1/contact_us";
    xhr.open("POST", postURL);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(payload));

});