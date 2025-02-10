history.pushState(null, null, location.href);
window.onpopstate = function(){
  history.go(1);
};

function checkInfo(username, password){
    let char = username.charAt(0);

    switch (char) {
        case "1":
            window.location.href = "mainpageadmin.html";
            break;
        case "2":
            window.location.href = "mainpageaccount.html";
            break;
        case "3":
            window.location.href = "mainpageteacher.html";
            break;
        case "4":
            window.location.href = "mainpageparent.html";
            break;
        default:
            alert("Please enter a valid username!")
            return;
    }
}

function getInfo(){
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if(username.trim() === "" || password.trim() === ""){
        alert("Please enter a username and password!");
        return;
    }

    checkInfo(username, password);
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
}

