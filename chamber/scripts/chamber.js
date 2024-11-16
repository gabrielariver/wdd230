
//last modification
document.addEventListener("DOMContentLoaded", function () {
    const lastModified = document.lastModified;
    document.getElementById("last-modified").textContent = lastModified;
});

//hamburguer
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('.navbar');

    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        navbar.style.display = navbar.style.display === 'flex' ? 'none' : 'flex';
    });
});
