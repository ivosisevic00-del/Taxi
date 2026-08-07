// ===============================================
// ZDRAVI RAZUM ERP
// ui.js
// ===============================================


// ===============================================
// MODALI
// ===============================================

function openModal(id) {

    const modal = document.getElementById(id);

    if (!modal) return;

    modal.classList.add("active");

    modal.style.display = "flex";

}


function closeModal(id) {

    const modal = document.getElementById(id);

    if (!modal) return;

    modal.classList.remove("active");

    modal.style.display = "none";

}



// ===============================================
// TOAST
// ===============================================

let toastTimer = null;

function toast(text) {

    const element = document.getElementById("toast");

    if (!element) {

        console.log(text);

        return;

    }

    clearTimeout(toastTimer);

    element.textContent = text;

    element.classList.add("show");

    toastTimer = setTimeout(() => {

        element.classList.remove("show");

    }, 3000);

}



// ===============================================
// GUMBI ZA ZATVARANJE MODALA
// ===============================================

document.addEventListener("DOMContentLoaded", () => {

    const buttons = {

        closeDriver: "driverModal",

        closeVehicle: "vehicleModal",

        closeFinance: "financeModal"

    };

    Object.keys(buttons).forEach(id => {

        const button = document.getElementById(id);

        if (!button) return;

        button.addEventListener("click", () => {

            closeModal(buttons[id]);

        });

    });

});



// ===============================================
// ESC ZATVARA MODALE
// ===============================================

document.addEventListener("keydown", e => {

    if (e.key !== "Escape") return;

    document.querySelectorAll(".modal").forEach(modal => {

        modal.classList.remove("active");

        modal.style.display = "none";

    });

});



// ===============================================
// KLIK IZVAN MODALA
// ===============================================

document.addEventListener("click", e => {

    if (!e.target.classList.contains("modal")) return;

    e.target.classList.remove("active");

    e.target.style.display = "none";

});

