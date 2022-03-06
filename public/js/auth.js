const protectedRoutes = ['http://localhost:5000/play', 'http://localhost:5000/user-area']

function isProtected(current_location) {
    console.log(current_location);
    for (const route of protectedRoutes) {
        if (current_location == route) {
            return true
        }
    }
    return false;
}

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
            // If we are n a protected page, if the session is expired 
            // or there's no token we redirect to login
            if (isProtected(window.location.href)) {
                window.location.href = '/login';
            }
        } else {
            document.getElementById("user-menu-text").innerHTML = "User Area";
            document.getElementById("user-route").href = "/user-area";
        }
    }
})();