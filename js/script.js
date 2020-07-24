document.addEventListener('DOMContentLoaded', function() {

    // Global variables
    const name = document.getElementById('name');
    const jobSelect = document.getElementById('title');
    const designSelect = document.getElementById('design');
    const designOptions = document.querySelectorAll('#design option');
    const activities = document.querySelector('.activities');
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const payment = document.getElementById('payment');
    const creditCard = document.getElementById('credit-card');
    const paypal = document.getElementById('paypal');
    const bitcoin = document.getElementById('bitcoin');
    let totalCost = 0;
    const totalCostText = document.createElement('p');


    // Hide Select Theme option from showing when design select is clicked
    designOptions[0].hidden = true;
    activities.appendChild(totalCostText);
    totalCostText.style.display = 'none';
    
    /*****************************************************/
    // Startup Functions
    /*****************************************************/

    // Set name input to focus by default
    const inputDefaults = (focusedInput, defaultPayment) => {
        
        // Payment method info
        const paymentOptions = defaultPayment.options;
        paymentOptions[0].disabled = true;
        paymentOptions[1].selected = true;
        paypal.style.display = 'none';
        bitcoin.style.display = 'none';

        // Min and max of payment fields
        const zip = document.getElementById('zip');
        const cvv = document.getElementById('cvv');
        const ccNum = document.getElementById('cc-num');
        zip.maxLength = 5;
        cvv.maxLength = 3;
        ccNum.maxLength = 16;


        // Focused input
        focusedInput.focus();
    }



    /*****************************************************/
    // Handlers
    /*****************************************************/

    // Show other job field
    const showOtherJob = () => {
        const jobOther = document.getElementById('title-other-container');
        if (jobSelect.value === 'other') {
            jobOther.style.display = 'block';
        } else {
            jobOther.style.display = 'none';
        }
    }
    

   // Handler for Design select
   const showShirtColor = () => {
        const colorOptions = document.getElementById('color').options;
        const punShirtColors = ['cornflowerblue', 'darkslategrey', 'gold'];
        const heartShirtColors = ['tomato', 'steelblue', 'dimgrey'];

        // Create new arrays
        const punOptions = [];
        const heartOptions = [];

        /* Loop over shirt options. Set all options to hidden.
           Push pun and heart shirts into the new arrays.*/
        for (let i = 0; i < colorOptions.length; i++) {
            colorOptions[i].hidden = true;
            const colorOptionValue = colorOptions[i].value;
            const isPunShirtColor = punShirtColors.includes(colorOptionValue);
            const isHeartShirtColor = heartShirtColors.includes(colorOptionValue);

            if (isPunShirtColor) {
                punOptions.push(colorOptions[i]);
            } else if (isHeartShirtColor) {
                heartOptions.push(colorOptions[i]);
            }
        }

        // Show elements in the appropriate new array based on the change value of select
        if (event.target.value === 'js puns') {
            for ( let i = 0; i < punOptions.length; i++ ) {
                punOptions[i].hidden = false;
            }
            punOptions[0].selected = true;
        } else if (event.target.value === 'heart js') {
            for ( let i = 0; i < heartOptions.length; i++ ) {
                heartOptions[i].hidden = false;
            }
            heartOptions[0].selected = true;
        }
    }


    // Activity checkbox handler
    const clickActivity = () => {
        
        const clicked = event.target;
        const clickedDayAndTime = clicked.getAttribute('data-day-and-time');
        const clickedCost = clicked.getAttribute('data-cost');
        
        if ( clicked.tagName === 'INPUT') {
    
            for (let i = 0; i < checkboxes.length; i++) {
                const checkboxDayAndTime = checkboxes[i].getAttribute('data-day-and-time');
    
                if ( clickedDayAndTime === checkboxDayAndTime && clicked !== checkboxes[i]) {
                    if (clicked.checked) {
                        checkboxes[i].disabled = true;
                    } else {
                        checkboxes[i].disabled = false;
                    }
                }
            }

            // Calculate running total
            if (clicked.checked === true) {
                totalCost += parseInt(clickedCost);
            } else {
                totalCost -= parseInt(clickedCost);
            }

            // Print total cost if > $0
            if (totalCost === 0) {
                totalCostText.style.display = 'none';
            } else {
                totalCostText.style.display = 'block';
                totalCostText.textContent = `Total: $${totalCost}`;
            }
        }
    }


    // Payment method handler
    const changePayment = () => {

        let paymentDivs = [creditCard, paypal, bitcoin];

        // Hide all payment information divs
        paymentDivs.forEach (paymentDiv => {
            paymentDiv.style.display = 'none';
        });
        
        // Show the appropriate payment info div to match the select value
        if (event.target.value === 'credit card') {
            paymentDivs[0].style.display = 'block';
        } else if (event.target.value === 'paypal') {
            paymentDivs[1].style.display = 'block';
        } else if (event.target.value === 'bitcoin') {
            paymentDivs[2].style.display = 'block';
        }
    }
    


    /*****************************************************/
    // Initialize functions
    /*****************************************************/
    inputDefaults(name, payment);
    showOtherJob();



    /*****************************************************/
    // Callback functions
    /*****************************************************/

    jobSelect.addEventListener( 'change', () => {
        showOtherJob();     
    });

    designSelect.addEventListener( 'change', () => {
        showShirtColor();
    });

    activities.addEventListener( 'change', () => {
        clickActivity();
    });

    payment.addEventListener( 'change', () => {
        changePayment();
    });

});
