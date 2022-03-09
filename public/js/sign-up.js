function signup() {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!username || !email || !password) {
        document.getElementById('signupError').innerHTML =  "Please fill all fields";
        return
    }

    if (password != confirmPassword) {
        document.getElementById('signupError').innerHTML = "The password confirmation does not match";
        return;
    }

    // Call sign-up API
    fetch('http://localhost:5000/sign-up', {
        method: 'POST',
        body: JSON.stringify({ username: username, email:email, password: password}),
        headers: {"Content-Type": "application/json"}
    }).then((result) => {
        console.log(result);
        if (result.status == 200) {
            // If the sign-up went well we redirect to login
            window.location.href = '/login';
        } else if (result.status == 409) {
            document.getElementById('signupError').innerHTML = "This username already exists, please choose another one";
        } else {
            document.getElementById('signupError').innerHTML = "Error: " + result.json()['message'];
        }
    }).catch((error) => {
        console.log(error);
        document.getElementById('signupError').innerHTML = "Error: " + error.status;
    });
}