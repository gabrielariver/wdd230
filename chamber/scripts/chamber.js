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
