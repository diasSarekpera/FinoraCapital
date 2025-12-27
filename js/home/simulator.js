// ===============================
// LOAN SIMULATOR — EURO VERSION
// ===============================

// Inputs
const amountInput = document.getElementById("amount");
const durationInput = document.getElementById("duration");
const rateInput = document.getElementById("rate");

// Displays
const amountValue = document.getElementById("amountValue");
const durationValue = document.getElementById("durationValue");
const rateValue = document.getElementById("rateValue");

// Buttons & Result
const resultContainer = document.getElementById("result-box-container");
const calculateBtn = document.getElementById("calculateBtn");
const resetBtn = document.getElementById("resetBtn");
const resultBox = document.getElementById("resultBox");

// Result values
const monthlyEl = document.getElementById("monthly");
const totalEl = document.getElementById("total");
const costEl = document.getElementById("cost");

// ===============================
// Utils
// ===============================
function formatMoney(value) {
    return value.toLocaleString("fr-FR") + " €";
}

// ===============================
// Auto rate by duration (UE logic)
// ===============================
function getAutoRate(duration) {
    if (duration <= 24) return 5.5;
    if (duration <= 36) return 7;
    if (duration <= 60) return 9;
    return 11.5;
}

// ===============================
// Validation
// ===============================
function validateForm() {
    const amount = Number(amountInput.value);
    const duration = Number(durationInput.value);

    const isValid =
        amount >= 1000 &&
        amount <= 150000 &&
        duration >= 12 &&
        duration <= 84;

    calculateBtn.disabled = !isValid;
}

// ===============================
// Update displays
// ===============================
function updateDisplays() {
    const amount = Number(amountInput.value);
    const duration = Number(durationInput.value);

    const autoRate = getAutoRate(duration);
    rateInput.value = autoRate;

    amountValue.textContent = formatMoney(amount);
    durationValue.textContent = duration + " mois";
    rateValue.textContent = autoRate + " % / an";

    validateForm();
}

// Init
updateDisplays();
validateForm();

// Live update
amountInput.addEventListener("input", updateDisplays);
durationInput.addEventListener("input", updateDisplays);

calculateBtn.addEventListener("click", () => {
    const amount = Number(amountInput.value);
    const duration = Number(durationInput.value);
    const annualRate = Number(rateInput.value);

    const monthlyRate = annualRate / 12 / 100;

    let monthlyPayment;

    if (monthlyRate === 0) {
        monthlyPayment = amount / duration;
    } else {
        monthlyPayment =
            amount *
            (monthlyRate /
                (1 - Math.pow(1 + monthlyRate, -duration)));
    }

    const totalPayment = monthlyPayment * duration;
    const creditCost = totalPayment - amount;

    monthlyEl.textContent = formatMoney(Math.round(monthlyPayment));
    totalEl.textContent = formatMoney(Math.round(totalPayment));
    costEl.textContent = formatMoney(Math.round(creditCost));

    // Affichage pro
    resultContainer.classList.add("show");
    resultBox.classList.add("show");

    // Scroll doux vers le résultat
    resultContainer.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});


// ===============================
// Reset
// ===============================
resetBtn.addEventListener("click", () => {
    resultBox.classList.remove("show");
    resultContainer.classList.remove("show");
});
