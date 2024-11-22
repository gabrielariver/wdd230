
//current year js
document.getElementById('currentYear').textContent = new Date().getFullYear();
//last modification
document.getElementById('lastModified').textContent = "Last Modification: " + document.lastModified;

//Hamburger 
const menuButton = document.getElementById('menuButton');
const mainNav = document.getElementById('mainNav');

menuButton.addEventListener('click', () => {
    mainNav.querySelector('ul').classList.toggle('active');
    menuButton.textContent = menuButton.textContent === '☰' ? '✕' : '☰';
});

// Dark Button
const darkModeToggle = document.getElementById('darkModeToggle');

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
        darkModeToggle.innerHTML = '☀️ Light Mode';
    } else {
        darkModeToggle.innerHTML = '🌙 Dark Mode';
    }
});

//Page visit counter
const visitCountElement = document.getElementById("visitCount");
let visitCount = localStorage.getItem("visitCount");
if (!visitCount) {
    visitCount = 1;
} else {
    visitCount = parseInt(visitCount) + 1;
}
localStorage.setItem("visitCount", visitCount);
visitCountElement.textContent = visitCount;