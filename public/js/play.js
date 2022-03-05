(() => {
    let token = "";

    window.onload = () => {
        token = localStorage.getItem('token');

        // Dovrò fare il controllo non solo sul fatto che il token esiste
        // ma anche se la sessione è scaduta
        if (!token) {
            window.location.href = '/login';
        }
    }
})();