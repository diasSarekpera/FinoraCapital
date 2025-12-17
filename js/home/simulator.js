// ===============================
// LOAN SIMULATOR — SMART VERSION
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
    return value.toLocaleString("fr-FR") + " F";
}

// ===============================
// Auto rate by duration
// ===============================
function getAutoRate(duration) {
    if (duration <= 6) return 5;
    if (duration <= 12) return 7;
    if (duration <= 24) return 9;
    if (duration <= 36) return 11;
    return 14;
}

// ===============================
// Validation
// ===============================
function validateForm() {
    const amount = Number(amountInput.value);
    const duration = Number(durationInput.value);

    const isValid =
        amount >= 50000 &&
        duration >= 3 &&
        duration <= 60;

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
    rateValue.textContent = autoRate + " %";

    validateForm();
}

// Initial state
updateDisplays();
validateForm();

// Live updates
amountInput.addEventListener("input", updateDisplays);
durationInput.addEventListener("input", updateDisplays);

// ===============================
// Calculation
// ===============================
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

    // Animation
    resultBox.style.display = "flex";
    requestAnimationFrame(() => {
        resultBox.classList.add("show");
    });
});

// ===============================
// Reset
// ===============================
resetBtn.addEventListener("click", () => {
    resultBox.classList.remove("show");
    setTimeout(() => {
        resultBox.style.display = "none";
    }, 300);
});
