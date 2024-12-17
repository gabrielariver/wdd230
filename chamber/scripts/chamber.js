document.addEventListener("DOMContentLoaded", function () {
    const lastModified = document.lastModified;
    document.getElementById("last-modified").textContent = lastModified;
});

document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const navbar = document.querySelector(".navbar");

    hamburger.addEventListener("click", function () {
        hamburger.classList.toggle("active");
        navbar.style.display = navbar.style.display === "flex" ? "none" : "flex";
    });
});

const gridViewBtn = document.getElementById("grid-view-btn");
const listViewBtn = document.getElementById("list-view-btn");
const directoryContainer = document.getElementById("directory-container");

if (gridViewBtn && listViewBtn && directoryContainer) {
    gridViewBtn.addEventListener("click", function () {
        directoryContainer.classList.add("grid-view");
        directoryContainer.classList.remove("list-view");
        gridViewBtn.classList.add("active");
        listViewBtn.classList.remove("active");
    });

    listViewBtn.addEventListener("click", function () {
        directoryContainer.classList.add("list-view");
        directoryContainer.classList.remove("grid-view");
        listViewBtn.classList.add("active");
        gridViewBtn.classList.remove("active");
    });
}
const faqQuestions = document.querySelectorAll(".faq-question");
if (faqQuestions.length > 0) {
    faqQuestions.forEach((question) => {
        question.addEventListener("click", () => {
            const answer = question.nextElementSibling;
            if (answer && answer.classList.contains("faq-answer")) {
                answer.classList.toggle("active");
            }
        });
    });
}

/*Week 05 The Directory Page*/
fetch("data/members.json")
    .then((response) => response.json())
    .then((data) => {
        renderDirectory(data, directoryContainer);
    })
    .catch((error) => console.error("Error loading directory data:", error));

function renderDirectory(members, container) {
    if (!container) return;
    container.innerHTML = "";
    members.forEach((member) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}" loading="lazy">
            <h2>${member.name}</h2>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
            <p class="membership">${member.membership} Member</p>
        `;
        container.appendChild(card);
    });
}


const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('#captionDesc');
const forecastList = document.querySelector('#forecast-list');

const apiKey = 'b89ecfeaf2e3430192c30fe84c5fe2b7';
const lat = -0.20;
const lon = -78.51;
const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

const fetchCurrentWeather = async () => {
    try {
        const response = await fetch(currentWeatherUrl);
        if (!response.ok) throw new Error("Failed to fetch current weather data");
        const data = await response.json();
        displayCurrentWeather(data);
    } catch (error) {
        console.error("Error fetching current weather:", error);
    }
};

const displayCurrentWeather = (data) => {
    currentTemp.innerHTML = `Temperature: ${Math.round(data.main.temp)}&deg;C`;
    const iconCode = data.weather[0].icon;
    const iconSrc = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    const desc = data.weather[0].description;

    weatherIcon.setAttribute('src', iconSrc);
    weatherIcon.setAttribute('alt', desc);
    weatherIcon.style.display = 'inline';
    captionDesc.textContent = `Condition: ${desc.charAt(0).toUpperCase() + desc.slice(1)}`;
};

const fetchForecast = async () => {
    try {
        const response = await fetch(forecastUrl);
        if (!response.ok) throw new Error("Failed to fetch forecast data");
        const data = await response.json();
        displayForecast(data);
    } catch (error) {
        console.error("Error fetching forecast:", error);
    }
};

const displayForecast = (data) => {
    forecastList.innerHTML = '';

    const today = new Date();
    const todayDay = today.getDate();

    const uniqueDays = new Set();

    const dailyData = data.list.filter((item) => {
        const itemDate = new Date(item.dt * 1000);
        const itemDay = itemDate.getDate();

        if (itemDay !== todayDay && !uniqueDays.has(itemDay)) {
            uniqueDays.add(itemDay);
            return true;
        }
        return false;
    }).slice(0, 3);

    dailyData.forEach((day) => {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        const temp = Math.round(day.main.temp);
        const desc = day.weather[0].description;
        const iconCode = day.weather[0].icon;
        const iconSrc = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong>${dayName}</strong>: ${temp}&deg;C - ${desc.charAt(0).toUpperCase() + desc.slice(1)}
            <img src="${iconSrc}" alt="${desc}" style="vertical-align: middle;">
        `;
        forecastList.appendChild(listItem);
    });
};


fetchCurrentWeather();
fetchForecast();

const banner = document.getElementById('invitation-banner');
const closeBannerButton = document.getElementById('close-banner');

const showBannerOnSpecificDays = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();

    if (dayOfWeek === 1 || dayOfWeek === 2 || dayOfWeek === 3) {
        banner.style.display = 'block';
    }
};


const closeBanner = () => {
    banner.style.display = 'none';
    localStorage.setItem('bannerClosed', 'true');
};

const checkBannerClosedStatus = () => {
    const isBannerClosed = localStorage.getItem('bannerClosed');
    if (!isBannerClosed) {
        showBannerOnSpecificDays();
    }
};

closeBannerButton.addEventListener('click', closeBanner);

checkBannerClosedStatus();


const jsonUrl = 'data/members.json';

const announcementsContainer = document.getElementById('announcements-container');

async function loadMemberAnnouncements() {
    try {
        const response = await fetch(jsonUrl);
        const members = await response.json();

        const filteredMembers = members.filter(member =>
            member.membership === 'Silver' || member.membership === 'Gold'
        );

        const selectedMembers = getRandomMembers(filteredMembers, 2, 3);

        renderAnnouncements(selectedMembers);

    } catch (error) {
        console.error('Error loading member announcements:', error);
    }
}

function getRandomMembers(array, min, max) {
    const shuffled = array.sort(() => 0.5 - Math.random());
    const count = Math.floor(Math.random() * (max - min + 1)) + min;
    return shuffled.slice(0, count);
}

function renderAnnouncements(members) {
    announcementsContainer.innerHTML = '';

    members.forEach(member => {
        const announcementCard = document.createElement('div');
        announcementCard.classList.add('announcement-card');

        announcementCard.innerHTML = `
            <h4>${member.name}</h4>
            <p>${member.description}</p>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
            <img src="images/${member.image}" alt="${member.name}" class="announcement-image">
        `;

        announcementsContainer.appendChild(announcementCard);
    });
}

loadMemberAnnouncements();

document.addEventListener("DOMContentLoaded", () => {
    const faqQuestions = document.querySelectorAll(".faq-question");

    if (faqQuestions.length > 0) {
        faqQuestions.forEach((question) => {
            question.addEventListener("click", () => {
                const answer = question.nextElementSibling;

                if (answer && answer.classList.contains("faq-answer")) {
                    answer.classList.toggle("active");
                }
            });
        });
    } else {
        console.warn("No FAQ questions found in the DOM.");
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (name === "" || email === "" || message === "") {
            alert("Please fill in all fields.");
            return;
        }

        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        alert(`Thank you, ${name}! Your message has been sent successfully.`);
        form.reset();
    });

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const lastModifiedElement = document.getElementById("last-modified");
    if (lastModifiedElement) {
        lastModifiedElement.textContent = document.lastModified;
    }
});
