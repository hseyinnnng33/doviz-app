const currencyEl_one = document.querySelector("#currency-one")
const currencyEl_two = document.querySelector("#currency-two")
const amount_one = document.querySelector("#amount-one");
const amount_two = document.querySelector("#amount-two");
const rateEl = document.querySelector("#rate")
const swap = document.querySelector("#swap")
const bayrak = document.querySelector(".deger");
const bayrak_2 = document.querySelector(".deger_bayrak");
const bayrak_3 = document.querySelector(".deger_bayrak-1");

async function calculate(){
    const currency_one = currencyEl_one.value;
    const currency_two = currencyEl_two.value;

    try{
        const fetchDeger = await fetch("https://open.exchangerate-api.com/v6/latest");
        const data = await fetchDeger.json();
        const veriler = data.rates[currency_two] / data.rates[currency_one];

        rateEl.innerHTML = `1 ${currency_one} = ${veriler.toFixed(2)} ${currency_two}`;
        amount_two.value = (amount_one.value * (veriler).toFixed(2))
        console.log(data)
    }
    catch(err){
        console.log(err)
    }
}

currencyEl_one.addEventListener("change", function(){
    calculate()
    bayrakUlke()
});
amount_one.addEventListener("change", calculate);
currencyEl_two.addEventListener("change", function(){
    calculate()
    bayrakUlke()
});
amount_two.addEventListener("change", calculate);

swap.addEventListener("click", function(){
    const temp = currencyEl_one.value;
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp;
    calculate()
})

calculate()

async function bayrakUlke(){
    const currency_one = currencyEl_one.value;
    const currency_two = currencyEl_two.value;

    const data = await fetch(`https://restcountries.com/v3.1/currency/${currency_one}`);
    const veri = await data.json();
    
    if(veri.length > 0){
        const currentData = veri[0].currencies;
        const sembol = currentData[currency_one].symbol
        bayrak_2.innerHTML = sembol;
    }

    const data_one = await fetch(`https://restcountries.com/v3.1/currency/${currency_two}`);
    const veri_two = await data_one.json();

    if(veri_two.length > 0){
        const currentData = veri_two[0].currencies;
        const sembol = currentData[currency_two].symbol
        bayrak_3.innerHTML = sembol;
    }
}

bayrakUlke()