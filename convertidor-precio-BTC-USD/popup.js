document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('convert').addEventListener('click', function() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    if (amount === "" || isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
      .then(response => response.json())
      .then(data => {
        const rate = data.bitcoin.usd;
        let result;

        if (fromCurrency === 'BTC' && toCurrency === 'USD') {
          result = (amount * rate).toFixed(2);
        } else if (fromCurrency === 'USD' && toCurrency === 'BTC') {
          result = (amount / rate).toFixed(8);
        } else {
          result = amount; // Misma moneda, no se necesita conversión
        }

        document.getElementById('result').value = result;
      })
      .catch(error => {
        console.error('Error fetching exchange rate:', error);
        alert('Error fetching exchange rate. Please try again later.');
      });
  });
});
