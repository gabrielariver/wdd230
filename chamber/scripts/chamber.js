
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
//last visit
const lastVisitContainer = document.querySelector(".sidebar");

const currentDate = Date.now();

const lastVisit = localStorage.getItem("lastVisit");

if (!lastVisit) {
    lastVisitContainer.innerHTML += `<p>Welcome! Let us know if you have any questions.</p>`;
} else {
    const daysDifference = Math.floor((currentDate - lastVisit) / (1000 * 60 * 60 * 24));
    if (daysDifference < 1) {
        lastVisitContainer.innerHTML += `<p>Back so soon! Awesome!</p>`;
    } else if (daysDifference === 1) {
        lastVisitContainer.innerHTML += `<p>You last visited 1 day ago.</p>`;
    } else {
        lastVisitContainer.innerHTML += `<p>You last visited ${daysDifference} days ago.</p>`;
    }
}

localStorage.setItem("lastVisit", currentDate);
