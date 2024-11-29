//pasword form
document.querySelector("form").addEventListener("submit", function (e) {
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    if (password !== confirmPassword) {
        e.preventDefault();
        alert("Passwords do not match!");
        document.getElementById("password").value = "";
        document.getElementById("confirmPassword").value = "";
    }
});
