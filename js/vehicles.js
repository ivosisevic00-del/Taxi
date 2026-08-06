let editingVehicle = -1;

function initVehicles() {

    renderVehicles();

    document
        .getElementById("newVehicleBtn")
        ?.addEventListener("click", openVehicleModal);

    document
        .getElementById("saveVehicle")
        ?.addEventListener("click", saveVehicle);

    document
        .getElementById("closeVehicle")
        ?.addEventListener("click", () => closeModal("vehicleModal"));

}

function renderVehicles() {

    const tbody = document.getElementById("vehiclesBody");

    if (!tbody) return;

    tbody.innerHTML = "";

    DB.vehicles.forEach((vehicle, index) => {

        tbody.innerHTML += `

        <tr>

            <td>${vehicle.brand}</td>

            <td>${vehicle.model}</td>

            <td>${vehicle.year}</td>

            <td>${vehicle.plate}</td>

            <td>

                <button class="editBtn"
                    onclick="editVehicle(${index})">

                    <i class="fa-solid fa-pen"></i>

                </button>

                <button class="deleteBtn"
                    onclick="deleteVehicle(${index})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        </tr>

        `;

    });

}

function openVehicleModal() {

    editingVehicle = -1;

    vehicleBrand.value = "";
    vehicleModel.value = "";
    vehicleYear.value = "";
    vehiclePlate.value = "";

    openModal("vehicleModal");

}

function saveVehicle() {

    const vehicle = {

        brand: vehicleBrand.value,

        model: vehicleModel.value,

        year: vehicleYear.value,

        plate: vehiclePlate.value

    };

    if (vehicle.brand.trim() === "") {

        alert("Unesi marku.");

        return;

    }

    if (editingVehicle === -1) {

        DB.vehicles.push(vehicle);

        toast("Dodano vozilo");

    } else {

        DB.vehicles[editingVehicle] = vehicle;

        toast("Ažurirano vozilo");

    }

    saveStorage();

    renderVehicles();

    updateDashboard();

    closeModal("vehicleModal");

}

function editVehicle(index) {

    editingVehicle = index;

    const v = DB.vehicles[index];

    vehicleBrand.value = v.brand;
    vehicleModel.value = v.model;
    vehicleYear.value = v.year;
    vehiclePlate.value = v.plate;

    openModal("vehicleModal");

}

function deleteVehicle(index) {

    if (!confirm("Obrisati vozilo?"))
        return;

    DB.vehicles.splice(index, 1);

    saveStorage();

    renderVehicles();

    updateDashboard();

    toast("Vozilo obrisano");

}