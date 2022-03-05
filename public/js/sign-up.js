function signup() {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Call login API
    fetch('http://localhost:5000/sign-up', {
        method: 'POST',
        body: JSON.stringify({ username: username, email:email, password: password}),
        headers: {"Content-Type": "application/json"}
    }).then((result) => {
        console.log(result);
        if (result.status == 200) {
            // If the sign-up went well we redirect to login
            window.location.href = '/login';
        } else {
            document.getElementById('signupError').innerHTML = "Error: " + result.json()['message'];
        }
    }).catch((error) => {
        console.log(error);
        document.getElementById('loginError').innerHTML = "Error: " + error;
    });
}