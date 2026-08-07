// ===============================================
// ZDRAVI RAZUM ERP
// DRIVERS
// ===============================================

let editingDriver = null;

// ===============================================
// INIT
// ===============================================

function initDrivers() {

    renderDrivers();

    document
        .getElementById("newDriverBtn")
        ?.addEventListener("click", openDriverModal);

    document
        .getElementById("saveDriver")
        ?.addEventListener("click", saveDriver);

    document
        .getElementById("closeDriver")
        ?.addEventListener("click", () => {

            closeModal("driverModal");

        });

}

// ===============================================
// TABLICA
// ===============================================

function renderDrivers() {

    const tbody = document.getElementById("driversBody");

    if (!tbody) return;

    tbody.innerHTML = "";

    DB.drivers.forEach(driver => {

        const tr = document.createElement("tr");

        tr.innerHTML = `

        <td>${driver.name ?? ""}</td>

        <td>${driver.surname ?? ""}</td>

        <td>${driver.phone ?? ""}</td>

        <td>

            <span class="status ${driver.status === "Aktivan" ? "active" : "inactive"}">

                ${driver.status}

            </span>

        </td>

        <td>

            <button
                class="editBtn"
                data-id="${driver.id}">

                <i class="fa-solid fa-pen"></i>

            </button>

            <button
                class="deleteBtn"
                data-id="${driver.id}">

                <i class="fa-solid fa-trash"></i>

            </button>

        </td>

        `;

        tbody.appendChild(tr);

    });

    tbody.querySelectorAll(".editBtn").forEach(btn => {

        btn.addEventListener("click", () => {

            editDriver(btn.dataset.id);

        });

    });

    tbody.querySelectorAll(".deleteBtn").forEach(btn => {

        btn.addEventListener("click", () => {

            deleteDriver(btn.dataset.id);

        });

    });

}

// ===============================================
// OTVORI MODAL
// ===============================================

function openDriverModal() {

    editingDriver = null;

    document.getElementById("driverForm")?.reset();

    document
        .getElementById("driverModal")
        ?.classList.add("active");

}

// ===============================================
// UREDI VOZAČA
// ===============================================

function editDriver(id) {

    const driver = DB.drivers.find(d => String(d.id) === String(id));

    if (!driver) return;

    editingDriver = driver.id;

    document.getElementById("name").value =
        driver.name || "";

    document.getElementById("surname").value =
        driver.surname || "";

    document.getElementById("phone").value =
        driver.phone || "";

    document.getElementById("status").value =
        driver.status || "Aktivan";

    document
        .getElementById("driverModal")
        ?.classList.add("active");

}

// ===============================================
// SPREMI
// ===============================================

async function saveDriver() {

    const payload = {

        name:
            document.getElementById("name").value.trim(),

        surname:
            document.getElementById("surname").value.trim(),

        phone:
            document.getElementById("phone").value.trim(),

        status:
            document.getElementById("status").value

    };

    if (!payload.name) {

        alert("Unesite ime vozača.");

        return;

    }

    let error;

    if (editingDriver) {

        ({ error } = await db

            .from("drivers")

            .update(payload)

            .eq("id", editingDriver));

    }

    else {

        ({ error } = await db

            .from("drivers")

            .insert(payload));

    }

    if (error) {

        console.error(error);

        alert(error.message);

        return;

    }

    document
        .getElementById("driverModal")
        ?.classList.remove("active");

    editingDriver = null;

    await refreshApp();

}

// ===============================================
// OBRIŠI VOZAČA
// ===============================================

async function deleteDriver(id) {

    if (!confirm("Obrisati vozača?")) return;

    const { error } = await db
        .from("drivers")
        .delete()
        .eq("id", id);

    if (error) {

        console.error(error);

        alert(error.message);

        return;

    }

    await refreshApp();

}



// ===============================================
// PRETRAGA
// ===============================================

function searchDrivers(text) {

    const rows = document.querySelectorAll("#driversBody tr");

    rows.forEach(row => {

        row.style.display =
            row.innerText.toLowerCase().includes(text)
                ? ""
                : "none";

    });

}



// ===============================================
// ZATVARANJE MODALA
// ===============================================

function closeModal(id) {

    const modal = document.getElementById(id);

    if (!modal) return;

    modal.classList.remove("active");

}



// ===============================================
// OTVARANJE MODALA
// ===============================================

function openModal(id) {

    const modal = document.getElementById(id);

    if (!modal) return;

    modal.classList.add("active");

}



// ===============================================
// PROFIL VOZAČA
// ===============================================

function openDriverProfile(id) {

    const driver = DB.drivers.find(d => String(d.id) === String(id));

    if (!driver) return;

    console.log(driver);

    // Ovdje ćemo kasnije otvoriti puni profil vozača

}



// ===============================================
// REFRESH
// ===============================================

async function reloadDrivers() {

    await loadDrivers();

    renderDrivers();

}



console.log("✅ drivers.js učitan");