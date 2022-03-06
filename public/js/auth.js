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
            // If the session is expired or there's no token we redirect to login
            window.location.href = '/login';
        }
    }
})();