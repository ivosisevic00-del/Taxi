// ===============================================
// ZDRAVI RAZUM ERP
// app.js
// ===============================================

document.addEventListener("DOMContentLoaded", initApp);

async function initApp() {

    console.log("Pokretanje ERP-a...");

    try {

        await initStorage();

        if (typeof initDashboard === "function")
            initDashboard();

        if (typeof initDrivers === "function")
            initDrivers();

        if (typeof initVehicles === "function")
            initVehicles();

        if (typeof initFinance === "function")
            initFinance();

        initNavigation();

        initSearch();

        initQuickActions();

        initMobileMenu();

        console.log("ERP spreman.");

    }

    catch (err) {

        console.error(err);

    }

}

// ===============================================
// NAVIGACIJA
// ===============================================

function initNavigation() {

    const buttons = document.querySelectorAll(".menu-item");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            buttons.forEach(b => b.classList.remove("active"));

            button.classList.add("active");

            const page = button.dataset.page;

            showPage(page);

        });

    });

    showPage("dashboard");

}

function showPage(page) {

    document.querySelectorAll(".page").forEach(section => {

        section.style.display = "none";

    });

    const current = document.getElementById(page + "Module");

    if (current) {

        current.style.display = "block";

    }

}

// ===============================================
// MOBILE MENU
// ===============================================

function initMobileMenu() {

    const menu = document.getElementById("menuToggle");
    const sidebar = document.querySelector(".sidebar");

    if (!menu || !sidebar) return;

    menu.addEventListener("click", (e) => {

        e.stopPropagation();

        sidebar.classList.toggle("active");

    });

    document.addEventListener("click", (e) => {

        if (window.innerWidth > 768) return;

        if (
            !sidebar.contains(e.target) &&
            !menu.contains(e.target)
        ) {

            sidebar.classList.remove("active");

        }

    });

}

// ===============================================
// QUICK ACTIONS
// ===============================================

function initQuickActions() {

    document
        .getElementById("quickDriver")
        ?.addEventListener("click", () => {

            if (typeof openDriverModal === "function")
                openDriverModal();

        });

    document
        .getElementById("quickVehicle")
        ?.addEventListener("click", () => {

            if (typeof openVehicleModal === "function")
                openVehicleModal();

        });

    document
        .getElementById("quickFinance")
        ?.addEventListener("click", () => {

            if (typeof openFinanceModal === "function")
                openFinanceModal();

        });

}

// ===============================================
// SEARCH
// ===============================================

function initSearch() {

    const input = document.getElementById("searchInput");

    if (!input) return;

    input.addEventListener("input", () => {

        const text = input.value.toLowerCase();

        if (typeof searchDrivers === "function")
            searchDrivers(text);

        if (typeof searchVehicles === "function")
            searchVehicles(text);

    });

}

// ===============================================
// WINDOW RESIZE
// ===============================================

window.addEventListener("resize", () => {

    if (window.innerWidth > 768) {

        document
            .querySelector(".sidebar")
            ?.classList.remove("active");

    }

});

// ===============================================
// MODALI
// ===============================================

function closeAllModals() {

    document.querySelectorAll(".modal").forEach(modal => {

        modal.classList.remove("active");

        modal.style.display = "none";

    });

}



// ===============================================
// ESC
// ===============================================

document.addEventListener("keydown", e => {

    if (e.key !== "Escape") return;

    closeAllModals();

});



// ===============================================
// KLIK IZVAN MODALA
// ===============================================

document.addEventListener("click", e => {

    if (!e.target.classList.contains("modal")) return;

    closeAllModals();

});



// ===============================================
// REFRESH
// ===============================================

async function refreshApp() {

    await refreshData();

}



// ===============================================
// DEBUG
// ===============================================

console.log("✅ app.js učitan");
