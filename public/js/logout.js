function logout() {
    // Call Logout API
    fetch('http://localhost:5000/logout', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "token" : localStorage.getItem('token')
        }
    }).then((result) => {
        console.log(result);
        // If the logout went fine server-side then we delete the session info from the frontend
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        localStorage.removeItem('expireDate');
        // Finally redirect to home page
        window.location.href = "/";
    }).catch((error) => {
        console.log(error);
    });
}