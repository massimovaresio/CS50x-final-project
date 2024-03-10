# EU Currency converter - CS50x final project
#### Video Demo:  <URL HERE>
#### Description:
This project aims to provide a simple and intuitive currency exchange service. Users can easily convert between different currencies based on the latest exchange rates.
I created this project as a final exercise in the online Harvard University [CS50x Introduction to Computer Science](https://cs50.harvard.edu/x/2024/) course.

**The exchange tool**

I have made an algorithm to calculate currency exchange rates between the currencies currently in use on the European continent.
The implementation of the calculation is quite simple and to acquire the current exchange rates I use the API of the online service Exchange Rate API found [here](https://exchangeratesapi.io/). The project is built in such a way as to support the exchange of more currencies than those listed, but here I have limited myself to European currencies to simplify the visualization; anyone who consults this project is free to expand it as they prefer in compliance with the Creative Commons license *CC BY-NC-SA 4.0 DEED*.
Here is the main part of the code for the currency exchange tool:
```
// Function to perform currency exchange
async function performCurrencyExchange(fromCurrency, toCurrency, amount) {
    const apiKey = 'API-KEY';
    const apiUrl = `https://api.exchangeratesapi.io/v1/latest?access_key=${apiKey}&base=${fromCurrency}&symbols=${toCurrency}`;

    try {
        // Make API request
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Check if API request was successful
        if (response.ok) {
            // Get exchange rate
            const exchangeRate = data.rates[toCurrency];

            // Perform currency conversion
            const convertedAmount = amount * exchangeRate;

            // Display converted amount in the console
            console.log(`${amount} ${fromCurrency} equals ${convertedAmount.toFixed(2)} ${toCurrency}`);
            // Display converted amount in the "converted_amount" field
            document.getElementById('converted_amount').innerText = `${convertedAmount.toFixed(2)} ${toCurrency}`;
        } else {
            // Handle API error
            console.error('Error:', data.error.type);
        }
    } catch (error) {
        // Handle fetch error
        console.error('Fetch Error:', error);
    }
}

// Get a reference to the amount input field
const amountInput = document.getElementById('amount');

// Function to show the red border
function showErrorBorder() {
    amountInput.classList.add('error');
}

// Function to remove the red border
function hideErrorBorder() {
    amountInput.classList.remove('error');
}

// Event listener for form submission
document.getElementById('exchangeForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get input values
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    const amount = parseFloat(document.getElementById('amount').value);

    // Check if amount is empty
    if (isNaN(amount)) {
        alert('Please enter a valid amount. Please note that comma "," is not accepted, use dot "." instead.'); // Display standard JavaScript alert
        showErrorBorder(); // Show red border
        return; // Stop further execution
    } else {
        hideErrorBorder(); // Remove red border if amount is not empty
    }

    // Perform currency exchange
    performCurrencyExchange(fromCurrency, toCurrency, amount);
});

// Add event listener to the amount input field
amountInput.addEventListener('input', function(event) {
    // Remove red border when user starts typing
    hideErrorBorder();
});
```

The rest of the code also includes checks to verify the validity of the contents entered by the user into the form. You can consult the code in the repository files.

**Front-end**

The front-end part includes four pages accessible from the page menu. The front-end was developed using HTML, CSS and [Bootstrap](https://getbootstrap.com/) library. Bootstrap is a library of free tools for creating sites and applications for the Web. It contains design templates based on HTML and CSS, both for typography and for the various interface components, such as forms, buttons and navigation, as well as some optional JavaScript extensions. There are other open source libraries but I used Bootstrap because I consider it very intuitive.

**Back-end and APIs**

The back-end part was developed with Javascript language.
In reality, talking about back-end in this case is quite inaccurate as there is no real back-end server, but all requests are made on the client side using Javascript code. The controls for the operation of the form on the exchange page have also been entirely implemented with Javascript.
Exchange rates were instead retrieved using https API calls to the Exchange Rate API service. This is a good service that offers free options; for this project, however, I had to temporarily subscribe to a subscription plan because without that only calls with the http protocol were allowed, and since many browsers currently only support https, errors were often encountered. Some bugs in the Javascript code have been fixed with the help of OpenAI's [ChatGPT](https://chat.openai.com/).
