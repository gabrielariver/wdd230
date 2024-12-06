// Current year
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Last modification
document.getElementById('lastModified').textContent = "Last Modification: " + document.lastModified;

// Hamburger menu
const menuButton = document.getElementById('menuButton');
const mainNav = document.getElementById('mainNav');

menuButton.addEventListener('click', () => {
    mainNav.querySelector('ul').classList.toggle('active');
    menuButton.textContent = menuButton.textContent === '☰' ? '✕' : '☰';
});

// Dark mode toggle
const darkModeToggle = document.getElementById('darkModeToggle');

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
        darkModeToggle.innerHTML = '☀️ Light Mode';
    } else {
        darkModeToggle.innerHTML = '🌙 Dark Mode';
    }
});

// Page visit counter
const visitCountElement = document.getElementById("visitCount");
let visitCount = localStorage.getItem("visitCount");
if (!visitCount) {
    visitCount = 1;
} else {
    visitCount = parseInt(visitCount) + 1;
}
localStorage.setItem("visitCount", visitCount);
visitCountElement.textContent = visitCount;

// Weather API integration
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('#captionDesc');

// OpenWeatherMap API details
const apiKey = 'b89ecfeaf2e3430192c30fe84c5fe2b7'; 
const lat = 49.75; 
const lon = 6.64; 
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

// Fetch weather data
const fetchWeather = async () => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch weather data");
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
};

// Display weather data
const displayWeather = (data) => {
    currentTemp.innerHTML = `${Math.round(data.main.temp)}&deg;F`;
    const iconCode = data.weather[0].icon;
    const iconSrc = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    const desc = data.weather[0].description;

    weatherIcon.setAttribute('src', iconSrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = desc;
};


fetchWeather();

const linksURL = './data/links.json';

async function fetchLinks() {
    try {
        const response = await fetch(linksURL);
        if (!response.ok) throw new Error('Failed to load the JSON file');
        const data = await response.json();
        renderLinks(data.weeks);
    } catch (error) {
        console.error('Error loading links:', error);
    }
}

function renderLinks(weeks) {
    const ul = document.querySelector('.card ul');
    if (!ul) {
        console.error("Could not find the container for dynamic links");
        return;
    }
    ul.innerHTML = '';

    weeks.forEach(week => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${week.week}:</strong> ${week.links
            .map(link => `<a href="${link.url}">${link.title}</a>`)
            .join(' | ')}`;
        ul.appendChild(li);
    });
}

fetchLinks();