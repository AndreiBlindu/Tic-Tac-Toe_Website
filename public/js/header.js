function isExpired(expireDate) {
    if (!expireDate) {
        return true;
    }
    return (new Date() >= new Date(expireDate));
}

function headerOnload() {
    console.log("Loading header");
    let token = localStorage.getItem('token');
    let expireDate = localStorage.getItem('expireDate');

    if (!token || isExpired(expireDate)) {
        document.getElementById("user-menu-text").innerHTML = "Login";
        document.getElementById("user-route").href = "/login";
    } else {
        document.getElementById("user-menu-text").innerHTML = "User Area";
        document.getElementById("user-route").href = "/user-area";
    }
}
