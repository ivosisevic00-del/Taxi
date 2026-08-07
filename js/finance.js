// =======================================
// FleetCore ERP
// finance.js
// =======================================

let editingFinance = -1;

function initFinance() {

    renderFinance();

    const saveBtn = document.getElementById("saveFinance");

    if(saveBtn){

        saveBtn.addEventListener("click",saveFinance);

    }

}

// =======================================
// TABLICA
// =======================================

function renderFinance(){

    const tbody=document.getElementById("financeBody");

    if(!tbody) return;

    tbody.innerHTML="";

    DB.finance.forEach((item,index)=>{

        tbody.innerHTML+=`

        <tr>

            <td>${item.driver}</td>

            <td>${item.platform}</td>

            <td>${Number(item.income).toFixed(2)} €</td>

            <td>${Number(item.expense).toFixed(2)} €</td>

            <td>${(item.income-item.expense).toFixed(2)} €</td>

            <td>

                <button
                    class="editBtn"
                    onclick="editFinance(${index})">

                    <i class="fa-solid fa-pen"></i>

                </button>

                <button
                    class="deleteBtn"
                    onclick="deleteFinance(${index})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        </tr>

        `;

    });

    updateDashboard();

}

// =======================================
// NOVI ZAPIS
// =======================================

function openFinanceModal() {

    editingFinance = -1;

    document.getElementById("financeDriver").value = "";
    document.getElementById("financePlatform").value = "Uber";
    document.getElementById("financeIncome").value = "";
    document.getElementById("financeExpense").value = "";

    openModal("financeModal");

}

// =======================================
// SPREMANJE
// =======================================

function saveFinance() {

    const finance = {

        driver: document.getElementById("financeDriver").value,

        platform: document.getElementById("financePlatform").value,

        income: Number(
            document.getElementById("financeIncome").value
        ),

        expense: Number(
            document.getElementById("financeExpense").value
        )

    };

    if (finance.driver === "") {

        alert("Odaberi vozača.");

        return;

    }

    if (editingFinance === -1) {

        DB.finance.push(finance);

        toast("Financijski zapis dodan.");

        addActivity(
            "Dodan financijski zapis za " + finance.driver
        );

    } else {

        DB.finance[editingFinance] = finance;

        toast("Financijski zapis ažuriran.");

        addActivity(
            "Ažuriran financijski zapis za " + finance.driver
        );

    }

    saveStorage();

    renderFinance();

    updateDashboard();

    closeModal("financeModal");

}

// =======================================
// UREĐIVANJE
// =======================================

function editFinance(index){

    editingFinance = index;

    const f = DB.finance[index];

    document.getElementById("financeDriver").value = f.driver;

    document.getElementById("financePlatform").value = f.platform;

    document.getElementById("financeIncome").value = f.income;

    document.getElementById("financeExpense").value = f.expense;

    openModal("financeModal");

}

// =======================================
// BRISANJE
// =======================================

function deleteFinance(index){

    if(!confirm("Obrisati zapis?")) return;

    addActivity(
        "Obrisan financijski zapis."
    );

    DB.finance.splice(index,1);

    saveStorage();

    renderFinance();

    updateDashboard();

    toast("Financijski zapis obrisan.");

}

