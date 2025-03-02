const API_KEY = "5f9f09d3b518bdaab049c35e"; 
const dropdowns = document.querySelectorAll("select");
const btn = document.querySelector(".btn");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const message = document.querySelector(".msg");
for(select of dropdowns){
    for(currCode in countryList){
        console.log(countryList[currCode]);
        const newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        // console.log(newOption.value);
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "USD"
        }else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "INR"
        }
        select.appendChild(newOption);
    }
    select.addEventListener("change",(evt) =>{
        updateFlag(evt.target);
        // console.log(evt.target);
    })
}

// Update country flag
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    const imgsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = imgsrc;
  };


const convertCurrency = ()=>{
    const amount = document.querySelector(".amt-input").value;
    let fromcurrency = fromCurr.value;
    let tocurrency = toCurr.value;

    if (amount.length !== 0) {
        const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromcurrency}`;

        fetch(API_URL)
            .then((resp)=> resp.json())
            .then((data)=>{
                let toExchangeRate = data.conversion_rates[tocurrency];
                const convertedAmount = toExchangeRate * amount;//to exchage rate me from currency ke base pr kitni to curreny rhegi vo aayega like 1 inr (from currency) 0.01178 USD (tocurrency ke barabar rhegi) thats why we multiplyed that
                console.log(convertedAmount);
                
                message.innerHTML = `${amount} ${fromcurrency} = ${convertedAmount.toFixed(2)} ${tocurrency}`

            })
                .catch((error) => {
                    console.error("Error fetching exchange rates:", error);
                    msg.innerHTML = "Error fetching exchange rates. Try again later.";
                  });
                }
                else{
                    alert("please enter valid amount")
                }
    
}

btn.addEventListener('click',(e)=>{
    e.preventDefault();
    convertCurrency();
})

