// =======================================
// FleetCore ERP
// app.js
// =======================================

document.addEventListener("DOMContentLoaded", () => {

    initStorage();

    initDashboard();

    initDrivers();

    initVehicles();

    initFinance();

    initNavigation();

});

// =======================================
// NAVIGACIJA
// =======================================

function initNavigation() {

    const buttons = document.querySelectorAll(".menu-item");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            buttons.forEach(b => b.classList.remove("active"));

            button.classList.add("active");

            const page = button.innerText.trim();

            showModule(page);

        });

    });

    showModule("Dashboard");

}

function showModule(page) {

    const modules = [

        "driversModule",

        "vehiclesModule",

        "financeModule",

        "serviceModule",

        "documentsModule"

    ];

    modules.forEach(id => {

        const el = document.getElementById(id);

        if (el) {

            el.style.display = "none";

        }

    });

    document.querySelector(".dashboard").style.display = "none";

    switch (page) {

        case "Dashboard":

            document.querySelector(".dashboard").style.display = "grid";

            break;

        case "Vozači":

            document.getElementById("driversModule").style.display = "block";

            break;

        case "Vozila":

            document.getElementById("vehiclesModule").style.display = "block";

            break;

        case "Financije":

            document.getElementById("financeModule").style.display = "block";

            break;

        case "Servisi":

            document.getElementById("serviceModule").style.display = "block";

            break;

        case "Dokumenti":

            document.getElementById("documentsModule").style.display = "block";

            break;

    }

}
// =======================================
// BRZE AKCIJE
// =======================================

function initQuickActions() {

    const quickDriver = document.getElementById("quickDriver");
    const quickVehicle = document.getElementById("quickVehicle");

    if (quickDriver) {

        quickDriver.addEventListener("click", () => {

            openModal("driverModal");

        });

    }

    if (quickVehicle) {

        quickVehicle.addEventListener("click", () => {

            openModal("vehicleModal");

        });

    }

}

// =======================================
// GLOBALNA PRETRAGA
// =======================================

function initSearch() {

    const input = document.getElementById("searchInput");

    if (!input) return;

    input.addEventListener("input", () => {

        const text = input.value.toLowerCase();

        searchDrivers(text);

        if (typeof searchVehicles === "function") {

            searchVehicles(text);

        }

    });

}

// =======================================
// MODALI
// =======================================

function openModal(id) {

    const modal = document.getElementById(id);

    if (modal) {

        modal.classList.add("active");

    }

}

function closeModal(id) {

    const modal = document.getElementById(id);

    if (modal) {

        modal.classList.remove("active");

    }

}

// =======================================
// ESC ZATVARA MODALE
// =======================================

document.addEventListener("keydown", e => {

    if (e.key === "Escape") {

        document.querySelectorAll(".modal").forEach(modal => {

            modal.classList.remove("active");

        });

    }

});

// =======================================
// ZATVARANJE GUMBIMA
// =======================================

document.addEventListener("DOMContentLoaded", () => {

    initQuickActions();

    initSearch();

    const closeDriver = document.getElementById("closeDriver");

    if (closeDriver) {

        closeDriver.onclick = () => closeModal("driverModal");

    }

    const closeVehicle = document.getElementById("closeVehicle");

    if (closeVehicle) {

        closeVehicle.onclick = () => closeModal("vehicleModal");

    }

});
