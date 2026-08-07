// ================================
// FleetCore ERP
// drivers.js
// ================================

let editingDriver = -1;

function initDrivers() {

    renderDrivers();

    const newBtn = document.getElementById("newDriverBtn");
    const saveBtn = document.getElementById("saveDriver");
    const closeBtn = document.getElementById("closeDriver");
    const search = document.getElementById("searchInput");

    if (newBtn) {
        newBtn.addEventListener("click", openDriverModal);
    }

    if (saveBtn) {
        saveBtn.addEventListener("click", saveDriver);
    }

    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            closeModal("driverModal");
        });
    }

    if (search) {
        search.addEventListener("input", (e) => {
            searchDrivers(e.target.value);
        });
    }

}

function renderDrivers() {

    const tbody = document.getElementById("driversBody");

    if (!tbody) return;

    tbody.innerHTML = "";

    DB.drivers.forEach((driver, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${driver.name}</td>
            <td>${driver.surname}</td>
            <td>${driver.phone}</td>

            <td>
                <span class="status ${driver.status === "Aktivan" ? "active" : "inactive"}">
                    ${driver.status}
                </span>
            </td>

            <td>

                <button class="editBtn" onclick="editDriver(${index})">
                    <i class="fa-solid fa-pen"></i>
                </button>

                <button class="deleteBtn" onclick="deleteDriver(${index})">
                    <i class="fa-solid fa-trash"></i>
                </button>

            </td>
        `;

        tbody.appendChild(row);

    });

}

function openDriverModal() {

    editingDriver = -1;

    document.getElementById("driverName").value = "";
    document.getElementById("driverSurname").value = "";
    document.getElementById("driverPhone").value = "";
    document.getElementById("driverStatus").value = "Aktivan";

    openModal("driverModal");

}

async function saveDriver() {

    const driver = {

        name: document.getElementById("driverName").value.trim(),

        surname: document.getElementById("driverSurname").value.trim(),

        phone: document.getElementById("driverPhone").value.trim(),

        status: document.getElementById("driverStatus").value

    };

    if (!driver.name) {

        alert("Unesi ime.");

        return;

    }

    if (editingDriver === -1) {

        const { error } = await supabase

            .from("drivers")

            .insert(driver);

        if (error) {

            console.error(error);

            alert(error.message);

            return;

        }

        toast("Vozač dodan");

    }

    else {

        const id = DB.drivers[editingDriver].id;

        const { error } = await supabase

            .from("drivers")

            .update(driver)

            .eq("id", id);

        if (error) {

            console.error(error);

            alert(error.message);

            return;

        }

        toast("Vozač ažuriran");

    }

    await loadDrivers();

    renderDrivers();

    updateDashboard();

    closeModal("driverModal");

}
 

function editDriver(index) {

    editingDriver = index;

    const driver = DB.drivers[index];

    document.getElementById("driverName").value = driver.name;
    document.getElementById("driverSurname").value = driver.surname;
    document.getElementById("driverPhone").value = driver.phone;
    document.getElementById("driverStatus").value = driver.status;

    openModal("driverModal");

}

async function deleteDriver(index) {

    if (!confirm("Obrisati vozača?")) return;

    const id = DB.drivers[index].id;

    const { error } = await supabase

        .from("drivers")

        .delete()

        .eq("id", id);

    if (error) {

        console.error(error);

        alert(error.message);

        return;

    }

    await loadDrivers();

    renderDrivers();

    updateDashboard();

    toast("Vozač obrisan");

}

function searchDrivers(text) {

    const tbody = document.getElementById("driversBody");

    if (!tbody) return;

    tbody.innerHTML = "";

    DB.drivers
        .filter(driver => {

            const value = (
                driver.name +
                " " +
                driver.surname +
                " " +
                driver.phone
            ).toLowerCase();

            return value.includes(text.toLowerCase());

        })
        .forEach((driver, index) => {

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${driver.name}</td>
                <td>${driver.surname}</td>
                <td>${driver.phone}</td>

                <td>
                    <span class="status ${driver.status === "Aktivan" ? "active" : "inactive"}">
                        ${driver.status}
                    </span>
                </td>

                <td>

                    <button class="editBtn" onclick="editDriver(${index})">
                        <i class="fa-solid fa-pen"></i>
                    </button>

                    <button class="deleteBtn" onclick="deleteDriver(${index})">
                        <i class="fa-solid fa-trash"></i>
                    </button>

                </td>
            `;

            tbody.appendChild(row);

        });

}