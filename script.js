"use strict"

// fetch(https://api.exchangerate.host/latest?base=${currencyOne.value}&symbols=${currencyTwo.value})

const currencyOne = document.querySelector("#currency-one")
const currencyTwo = document.querySelector("#currency-two")
const amountOne = document.querySelector(".amount-one")
const amountTwo = document.querySelector(".amount-two")
const swapBtn = document.querySelector(".swap")
const rateInfo = document.querySelector(".rate-info")

const calculate = async () => {
  const res = await fetch(
    `https://api.exchangerate.host/latest?base=${currencyOne.value}&symbols=${currencyTwo.value}`
  )
  const data = await res.json()
  const currency1 = currencyOne.value
  const currency2 = currencyTwo.value

  const rate = data.rates[currency2]
  rateInfo.textContent = `1 ${currency1} = ${rate.toFixed(4)} ${currency2}`

  amountTwo.value = `${(amountOne.value * rate).toFixed(2)}`
}

currencyOne.addEventListener("change", calculate)
amountOne.addEventListener("input", calculate)
currencyTwo.addEventListener("change", calculate)
amountTwo.addEventListener("input", calculate)

calculate()

const swapCurrencies = () => {
  const temp = currencyOne.value
  currencyOne.value = currencyTwo.value
  currencyTwo.value = temp
  calculate()
}

swapBtn.addEventListener("click", swapCurrencies)
