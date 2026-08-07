// =======================================
// Zdravi Razum ERP
// app.js
// =======================================

document.addEventListener("DOMContentLoaded", () => {

    initStorage();

    if (typeof initDashboard === "function")
        initDashboard();

    if (typeof initDrivers === "function")
        initDrivers();

    if (typeof initVehicles === "function")
        initVehicles();

    if (typeof initFinance === "function")
        initFinance();

    initNavigation();

    initQuickActions();

    initSearch();

    initModalButtons();

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

    const page = button.textContent.trim();

    showModule(page);

    // Zatvori izbornik na mobitelu
    if (window.innerWidth < 900) {

        const sidebar = document.querySelector(".sidebar");

        if (sidebar) {
            sidebar.classList.remove("active");
        }

    }

});

        });

    });

    showModule("Dashboard");

}

// =======================================
// PRIKAZ MODULA
// =======================================

function showModule(page) {

    // Sakrij Dashboard
    const dashboard = document.querySelector(".dashboard");

    if (dashboard) {
        dashboard.style.display = "none";
    }

    // Sakrij sve module
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

    // Prikaži odabrani modul
    switch (page) {

        case "Dashboard":

            if (dashboard) {
                dashboard.style.display = "grid";
            }

            break;

        case "Vozači": {

            const el = document.getElementById("driversModule");

            if (el) {
                el.style.display = "block";
            }

            break;
        }

        case "Vozila": {

            const el = document.getElementById("vehiclesModule");

            if (el) {
                el.style.display = "block";
            }

            break;
        }

        case "Financije": {

            const el = document.getElementById("financeModule");

            if (el) {
                el.style.display = "block";
            }

            break;
        }

        case "Servisi": {

            const el = document.getElementById("serviceModule");

            if (el) {
                el.style.display = "block";
            }

            break;
        }

        case "Dokumenti": {

            const el = document.getElementById("documentsModule");

            if (el) {
                el.style.display = "block";
            }

            break;
        }

    }

}

// =======================================
// BRZE AKCIJE
// =======================================

function initQuickActions() {

    const quickDriver = document.getElementById("quickDriver");

    if (quickDriver) {
        quickDriver.addEventListener("click", () => {
            openDriverModal();
        });
    }

    const quickVehicle = document.getElementById("quickVehicle");

    if (quickVehicle) {
        quickVehicle.addEventListener("click", () => {
            openVehicleModal();
        });
    }

    const quickFinance = document.getElementById("quickFinance");

    if (quickFinance) {
        quickFinance.addEventListener("click", () => {
            openFinanceModal();
        });
    }

}

// =======================================
// GLOBALNA PRETRAGA
// =======================================

function initSearch() {

    const input = document.getElementById("searchInput");

    if (!input) return;

    input.addEventListener("input", function () {

        const text = this.value.toLowerCase();

        if (typeof searchDrivers === "function") {
            searchDrivers(text);
        }

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
// OTVARANJE MODALA
// =======================================

function openDriverModal() {

    if (typeof editingDriver !== "undefined") {
        editingDriver = -1;
    }

    const name = document.getElementById("driverName");
    const surname = document.getElementById("driverSurname");
    const phone = document.getElementById("driverPhone");
    const status = document.getElementById("driverStatus");

    if (name) name.value = "";
    if (surname) surname.value = "";
    if (phone) phone.value = "";
    if (status) status.value = "Aktivan";

    openModal("driverModal");

}

function openVehicleModal() {

    if (typeof editingVehicle !== "undefined") {
        editingVehicle = -1;
    }

    openModal("vehicleModal");

}

// =======================================
// ESC ZATVARA MODALE
// =======================================

document.addEventListener("keydown", (e) => {

    if (e.key !== "Escape") return;

    document.querySelectorAll(".modal").forEach(modal => {

        modal.classList.remove("active");

    });

});

//========================================
// MOBILE MENU
//========================================

const menuToggle = document.getElementById("menuToggle");

if(menuToggle){

    menuToggle.addEventListener("click",()=>{

        document
            .querySelector(".sidebar")
            .classList.toggle("active");

    });

}


