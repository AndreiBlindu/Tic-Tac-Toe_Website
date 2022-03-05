function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Call login API
    fetch('http://localhost:5000/auth', {
        method: 'POST',
        body: JSON.stringify({ username: username, password: password}),
        headers: {"Content-Type": "application/json"}
    }).then((result) => {
        console.log(result);
        return result.json();
    }).then((json) => {
        console.log(json);
        let token = json['token'];
        let expireDate = json['expireDate'];

        if (token) {
            // Save the session's token and expireDate into the localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('expireDate', expireDate);
            // Redirect to home page
            window.location.href = '/';
        } else {
            // Display error message if something went wrong
            console.log(json['message']);
            document.getElementById('loginError').innerHTML = "Error: " + json['message'];
        }
    }).catch((error) => {
        console.log(error);
        document.getElementById('loginError').innerHTML = "Error: " + error;
    });
}