const billRegEx = /^\d+(\.\d+)?$/;
const personRegEx = /^[1-9]\d*$/;
const billInput = document.getElementById("bill");
const personInput = document.getElementById("person");
const resetBtn = document.getElementById("reset-btn");
let totalBill;
let totalPerson;
let tipPercentage;
const isBillCorrect = (val) => billRegEx.test(val);


billInput.addEventListener("input", () => {
  const waringBill = document.getElementById("warningBill");
  if (!isBillCorrect(billInput.value)) {
	waringBill.classList.remove("hidden");
	billInput.parentElement.classList.add("border-red-500");
	
	totalBill = 0;
  } else {
	waringBill.classList.add("hidden");
	billInput.parentElement.classList.remove("border-red-500");
	totalBill = Number.parseFloat(billInput.value);
	resetBtn.disabled = !revealButton();
  }
  
  if (billInput.value === "") {
	totalBill = 0;
	setTimeout(() => {
	  billInput.parentElement.classList.remove("border-red-500");
	  waringBill.classList.add("hidden");
	}, 1500);
  }
});

personInput.addEventListener("input", () => {
  const warningPerson = document.getElementById("warningPerson");
  const num = Number.parseInt(personInput.value);
  if (num === 0 || !(personRegEx.test(personInput.value))) {
	totalPerson = 0;
	warningPerson.classList.remove("hidden");
	personInput.parentElement.classList.add("border-red-500");
	if (num === 0) {
	  warningPerson.innerText = "Can't be zero";
	} else {
	  warningPerson.innerText = "Please enter number";
	}
  } else {
	warningPerson.classList.add("hidden");
	personInput.parentElement.classList.remove("border-red-500");
	totalPerson = num;
	resetBtn.disabled = !revealButton();
	calculate();
  }
  
  if (personInput.value === "") {
	totalPerson = 0;
	setTimeout(() => {
	  personInput.parentElement.classList.remove("border-red-500");
	  warningPerson.classList.add("hidden");
	}, 1500);
  }
});

const optionList = Array.from(document.getElementsByName("tip-amount"));


optionList.forEach(ele => ele.addEventListener("click", () => {
  tipPercentage = +ele.value;
  resetBtn.disabled = !revealButton();
  calculate();
}));


const customTip = document.getElementById("custom-tip");

customTip.addEventListener("input", () => {
  if (!billRegEx.test(customTip.value)) {
	customTip.classList.add("focus:border-red-500");
  } else {
	customTip.classList.remove("focus:border-red-500");
	if (+customTip.value > 100) {
	  tipPercentage = 0;
	} else {
	  tipPercentage = Number.parseFloat(customTip.value);
	}
	calculate();
	resetBtn.disabled = !revealButton();
	calculate();
  }
  if (tipPercentage) optionList.forEach(ele => ele.checked = false);
});


resetBtn.addEventListener("click", () => {
  const tipPerPerson = document.getElementById("tipPerPerson");
  const totalTip = document.getElementById("totalAmount");
  tipPerPerson.innerText = "0.00";
  totalTip.innerText = "0.00";
  billInput.value = "";
  customTip.value = "";
  personInput.value = "";
  totalBill = 0;
  totalPerson = 0;
  tipPercentage = 0;
  resetBtn.disabled = true;
  optionList.forEach(ele => ele.checked = false);
});

function revealButton() {
  return Boolean(totalBill) && Boolean(totalPerson) && Boolean(tipPercentage);
}

function calculate() {
  if (!resetBtn.disabled) {
	const tipPerPerson = document.getElementById("tipPerPerson");
	const totalTip = document.getElementById("totalAmount");
	
	let totalTipAmount = totalBill * (tipPercentage / 100);
	let tipPerPersonAmount = totalTipAmount / totalPerson;
	
	tipPerPerson.innerText = "" + tipPerPersonAmount.toFixed(2);
	totalTip.innerText = "" + totalTipAmount.toFixed(2);
  }
}

