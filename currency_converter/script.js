const API_KEY = "5f9f09d3b518bdaab049c35e"; 
const dropdowns = document.querySelectorAll("select");
const msg = document.querySelector(".msg");
const btn = document.querySelector(".btn");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");


for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;

    // Default selection
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  // Update flag on dropdown change
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

// Update country flag
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  const imgsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = imgsrc;
};

// Convert currency
const convertCurrency = () => {
  const amount = document.querySelector(".amt-input").value;
  const fromcurrency = fromCurr.value;
  const tocurrency = toCurr.value;

  if (amount.length !== 0) {
    const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromcurrency}`;

    fetch(API_URL)
      .then((resp) => resp.json())
      .then((data) => {
        let toExchangeRate = data.conversion_rates[tocurrency];

        const convertedAmount = amount * toExchangeRate;
        msg.innerHTML = `${amount} ${fromcurrency} = ${convertedAmount.toFixed(
          2
        )} ${tocurrency}`;
      })
      .catch((error) => {
        console.error("Error fetching exchange rates:", error);
        msg.innerHTML = "Error fetching exchange rates. Try again later.";
      });
  } else {
    alert("Please fill in the amount");
  }
};

// Event listeners
btn.addEventListener("click", (e) => {
  e.preventDefault();
  convertCurrency();
});
window.addEventListener("load", convertCurrency);

