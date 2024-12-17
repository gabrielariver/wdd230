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

// email form
document.getElementById("email").addEventListener("input", function (e) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@byui\.edu$/;
    const emailField = e.target;

    if (!emailPattern.test(emailField.value)) {
        emailField.setCustomValidity("Please enter a valid @byui.edu email address.");
    } else {
        emailField.setCustomValidity("");
    }
});

