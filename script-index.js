const weatherWidget = document.getElementById("weather-widget");
const gweiWidget = document.getElementById("gwei-widget");
const ethPriceWidget = document.getElementById("eth-price-widget");

const apiKeyWeather = '6e71e6a8c1604d7ba5e88729da0fef68';
const apiKeyEth = 'FQE5YZ98HQT32YEPHRBNEAHBQXRCYCU665';

let widgetIndex = 0;
const widgets = [weatherWidget, gweiWidget, ethPriceWidget];

function updateWeather() {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=Tokyo&units=metric&appid=${apiKeyWeather}`)
    .then((response) => response.json())
    .then((data) => {
      weatherWidget.textContent = `Weather in Tokyo: ${data.main.temp}°C`;
    });
}

function updateGweiAndEthPrice() {
  fetch(`https://api.etherscan.io/api?module=proxy&action=eth_gasPrice&apikey=${apiKeyEth}`)
    .then((response) => response.json())
    .then((data) => {
      const gwei = parseInt(data.result, 16) / 1e9;
      gweiWidget.textContent = `Current Gwei: ${gwei.toFixed(2)} Gwei`;
    });

  fetch(`https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${apiKeyEth}`)
    .then((response) => response.json())
    .then((data) => {
      const ethPrice = parseFloat(data.result.ethusd);
      ethPriceWidget.textContent = `Ethereum Price: $${ethPrice.toFixed(2)}`;
    });
}

function switchWidget() {
  widgets[widgetIndex].style.display = "none";
  widgetIndex = (widgetIndex + 1) % widgets.length;
  widgets[widgetIndex].style.display = "block";
}

function init() {
  updateWeather();
  updateGweiAndEthPrice();
  widgets[0].style.display = "block"; // Add this line
  setInterval(updateWeather, 60 * 60 * 1000); // Update weather every hour
  setInterval(updateGweiAndEthPrice, 5 * 60 * 1000); // Update Gwei and ETH price every 5 minutes
  setInterval(switchWidget, 10 * 1000); // Switch widgets every 10 seconds
}

init(); // Call the init function

