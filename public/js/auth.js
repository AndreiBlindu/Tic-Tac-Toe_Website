function isExpired(expireDate) {
    if (!expireDate) {
        return true;
    }
    return (new Date() >= new Date(expireDate));
}

(() => {
    
    window.onload = () => {
        let token = localStorage.getItem('token');
        let expireDate = localStorage.getItem('expireDate');

        if (!token || isExpired(expireDate)) {
            document.getElementById("user-menu-text").innerHTML = "Login";
            document.getElementById("user-route").href = "/login";
            // If the session is expired or there's no token we redirect to login
            // We check if we are already on login to avoid endless reloading loops
            if (window.location.href != 'http://localhost:5000/login') {
                window.location.href = '/login';
            }
        } else {
            document.getElementById("user-menu-text").innerHTML = "User Area";
            document.getElementById("user-route").href = "/user-area";
        }
    }
})();