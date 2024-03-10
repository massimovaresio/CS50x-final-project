// THIS PART OF CODE PERFORMS THE CURRENCY EXCHANGE BY CONNECTING TO EXCHANGE RATE API SERVICE

// Function to perform currency exchange
async function performCurrencyExchange(fromCurrency, toCurrency, amount) {
    const apiKey = '708b25ffccc1f604ae73615d97938159'; // My actual API key
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


// THIS PART OF THE CODE UPDATES THE OPTIONS IN THE "TO CURRENCY" DROPDOWN BASED ON THE SELECTION IN THE "FROM CURRENCY" DROPDOWN

// Get references to the "From Currency" and "To Currency" dropdowns
const fromCurrencyDropdown = document.getElementById('fromCurrency');
const toCurrencyDropdown = document.getElementById('toCurrency');

// Add event listener to the "From Currency" dropdown
fromCurrencyDropdown.addEventListener('change', updateToCurrencyOptions);

// Function to update the options in the "To Currency" dropdown based on the selection in the "From Currency" dropdown
function updateToCurrencyOptions() {
    const selectedFromCurrency = fromCurrencyDropdown.value;

    // Clear existing options in the "To Currency" dropdown
    toCurrencyDropdown.innerHTML = '';

    // Loop through all options in the "From Currency" dropdown
    for (let option of fromCurrencyDropdown.options) {
        // Skip the selected option in the "From Currency" dropdown
        if (option.value !== selectedFromCurrency) {
            // Create a new option for the "To Currency" dropdown and add it if it's not the selected option in the "From Currency" dropdown
            const newOption = document.createElement('option');
            newOption.value = option.value;
            newOption.textContent = option.textContent;
            toCurrencyDropdown.appendChild(newOption);
        }
    }
}

// Call the function initially to populate the "To Currency" dropdown based on the default selection in the "From Currency" dropdown
updateToCurrencyOptions();


// THIS PART OF THE CODE MAKES THE RESET BUTTON WORK

// Get a reference to the form
const exchangeForm = document.getElementById('exchangeForm');

// Get a reference to the reset button
const resetButton = document.querySelector('button[type="reset"]');

// Add an event listener to the reset button
resetButton.addEventListener('click', function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Clear the "converted amount" field
    document.getElementById('converted_amount').innerText = '';

    // Reset the form fields
    exchangeForm.reset();
});


// Please consider that OpenAI's ChatGPT was used to resolve some bugs, but the heart of the operation was developed independently and with the use of some online tutorials and documentation.
