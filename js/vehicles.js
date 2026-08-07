// =======================================
// FleetCore ERP
// vehicles.js
// =======================================

let editingVehicle = -1;

function initVehicles() {

    renderVehicles();

    const newBtn = document.getElementById("newVehicleBtn");
    const saveBtn = document.getElementById("saveVehicle");
    const closeBtn = document.getElementById("closeVehicle");

    if (newBtn) {
        newBtn.addEventListener("click", openVehicleModal);
    }

    if (saveBtn) {
        saveBtn.addEventListener("click", saveVehicle);
    }

    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            closeModal("vehicleModal");
        });
    }

}

// =======================================
// PRIKAZ TABLICE
// =======================================

function renderVehicles() {

    const tbody = document.getElementById("vehiclesBody");

    if (!tbody) return;

    tbody.innerHTML = "";

    DB.vehicles.forEach((vehicle,index)=>{

        tbody.innerHTML += `
        <tr>

            <td>${vehicle.brand}</td>

            <td>${vehicle.model}</td>

            <td>${vehicle.year}</td>

            <td>${vehicle.plate}</td>

            <td>

                <button
                    class="editBtn"
                    onclick="editVehicle(${index})">

                    <i class="fa-solid fa-pen"></i>

                </button>

                <button
                    class="deleteBtn"
                    onclick="deleteVehicle(${index})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        </tr>
        `;

    });

}
// =======================================
// OTVARANJE MODALA
// =======================================

function openVehicleModal() {

    editingVehicle = -1;

    document.getElementById("vehicleBrand").value = "";
    document.getElementById("vehicleModel").value = "";
    document.getElementById("vehicleYear").value = "";
    document.getElementById("vehiclePlate").value = "";

    openModal("vehicleModal");

}

// =======================================
// SPREMANJE
// =======================================

function saveVehicle() {

    const vehicle = {

        brand: document.getElementById("vehicleBrand").value.trim(),

        model: document.getElementById("vehicleModel").value.trim(),

        year: document.getElementById("vehicleYear").value.trim(),

        plate: document.getElementById("vehiclePlate").value.trim()

    };

    if (vehicle.brand === "") {

        alert("Unesi marku vozila.");

        return;

    }

    if (editingVehicle === -1) {

        DB.vehicles.push(vehicle);

        toast("Vozilo dodano.");

    } else {

        DB.vehicles[editingVehicle] = vehicle;

        toast("Vozilo ažurirano.");

    }

    saveStorage();

    renderVehicles();

    updateDashboard();

    closeModal("vehicleModal");

}

// =======================================
// UREĐIVANJE
// =======================================

function editVehicle(index) {

    editingVehicle = index;

    const vehicle = DB.vehicles[index];

    document.getElementById("vehicleBrand").value = vehicle.brand;
    document.getElementById("vehicleModel").value = vehicle.model;
    document.getElementById("vehicleYear").value = vehicle.year;
    document.getElementById("vehiclePlate").value = vehicle.plate;

    openModal("vehicleModal");

}

// =======================================
// BRISANJE
// =======================================

function deleteVehicle(index) {

    if (!confirm("Obrisati vozilo?")) return;

    DB.vehicles.splice(index,1);

    saveStorage();

    renderVehicles();

    updateDashboard();

    toast("Vozilo obrisano.");

}

// =======================================
// PRETRAGA
// =======================================

function searchVehicles(text) {

    const tbody = document.getElementById("vehiclesBody");

    if (!tbody) return;

    tbody.innerHTML = "";

    DB.vehicles
        .filter(vehicle => {

            return (
                vehicle.brand +
                " " +
                vehicle.model +
                " " +
                vehicle.plate
            )
            .toLowerCase()
            .includes(text.toLowerCase());

        })
        .forEach((vehicle,index)=>{

            tbody.innerHTML += `

            <tr>

                <td>${vehicle.brand}</td>

                <td>${vehicle.model}</td>

                <td>${vehicle.year}</td>

                <td>${vehicle.plate}</td>

                <td>

                    <button
                        class="editBtn"
                        onclick="editVehicle(${index})">

                        <i class="fa-solid fa-pen"></i>

                    </button>

                    <button
                        class="deleteBtn"
                        onclick="deleteVehicle(${index})">

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </td>

            </tr>

            `;

        });

}