document.addEventListener('DOMContentLoaded', function() {

    // Global variables
    const name = document.getElementById('name');
    const email = document.getElementById('mail');
    const jobSelect = document.getElementById('title');
    const designSelect = document.getElementById('design');
    const designOptions = document.querySelectorAll('#design option');
    const activities = document.querySelector('.activities');
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const payment = document.getElementById('payment');
    const creditCard = document.getElementById('credit-card');
    const paypal = document.getElementById('paypal');
    const bitcoin = document.getElementById('bitcoin');
    const ccNum = document.getElementById('cc-num');
    const zip= document.getElementById('zip');
    const cvv = document.getElementById('cvv');
    const form = document.querySelector('form');
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
        zip.maxLength = 5;
        cvv.maxLength = 3;
        ccNum.maxLength = 16;


        // Focused input
        focusedInput.focus();
    }

    /*
    The following create and insert functions were adaped from the top answer on:
    https://stackoverflow.com/questions/46738333/using-javascript-loop-to-create-multiple-html-elements
    */

    // Function to create error messages
    const createError = (tagName, props) => {
        return Object.assign( document.createElement(tagName), (props || {}) );
    }

    // Function to insert error messages
    const insertError = (targetElement, error, position) => {
        targetElement.insertAdjacentElement(position, error);
    }

    //Name
    const nameError = createError('span', {className: 'error-message is-hidden', textContent: 'Please enter your name.'});
    insertError( name, nameError, 'afterend');

    // Email
    const emailError = createError('span', {className: 'error-message is-hidden', textContent: 'Please enter a valid email.'});
    insertError( email, emailError, 'afterend');

    // Activities
    const activitiesError = createError('span', {className: 'error-message is-hidden', textContent: 'Please select at least one activity.'});
    insertError( activities, activitiesError, 'beforeend');

    // CC Number
    const ccNumError = createError('span', {className: 'error-message is-hidden', textContent: 'Please enter a valid credit card.'});
    insertError( ccNum, ccNumError, 'afterend');

    // CC Number
    const zipError = createError('span', {className: 'error-message is-hidden', textContent: 'Please enter zip code.'});
    insertError( zip, zipError, 'afterend');

    // CVV
    const cvvError = createError('span', {className: 'error-message is-hidden', textContent: 'Please enter CVV number.'});
    insertError( cvv, cvvError, 'afterend');




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
                const parentLabel = checkboxes[i].parentNode;
    
                if ( clickedDayAndTime === checkboxDayAndTime && clicked !== checkboxes[i]) {
                    if (clicked.checked) {
                        checkboxes[i].disabled = true;
                        parentLabel.style.color = 'rgba(0,0,0,.35)';
                    } else {
                        checkboxes[i].disabled = false;
                        parentLabel.style.color = 'rgb(0,0,0)';
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
    // Validation Handlers
    /*****************************************************/

    
    const hideInputError = (input, inputError) => {
        input.classList.remove('has-error');
        inputError.classList.add('is-hidden');
        return true;
    }
    
    const showInputError = (input, inputError) => {
        input.classList.add('has-error');
        inputError.classList.remove('is-hidden');
        return false;
    }


    const validateName = () => {
        const nameValue = name.value;
        if (nameValue.length > 0) {
            hideInputError(name, nameError);
        } else {
            showInputError(name, nameError);
        }
    }

    const validateEmail = () => {
        const emailValue = email.value;
        const emailAtIndex = emailValue.indexOf('@');
        const emailDot = emailValue.lastIndexOf('.');
        if (emailAtIndex > 1 && emailDot > emailAtIndex + 1) {
            hideInputError(email, emailError);
        } else {
            showInputError(email, emailError);
        }
    }

    const validateActivities = () => {
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                hideInputError(activities, activitiesError);
                return true;
            }        
        }
        showInputError(activities, activitiesError);   
    }

    const validatePayment = () => {
        const paymentValue = payment.value;

        if (paymentValue === 'credit card') {

            const ccNumValue = ccNum.value;
            const zipValue = zip.value;
            const cvvValue = cvv.value;

            if (ccNumValue.length > 12) {
                hideInputError(ccNum, ccNumError);
            } else {
                showInputError(ccNum, ccNumError);
            }

            if (zipValue.length === 5) {
                hideInputError(zip, zipError);
            } else {
                showInputError(zip, zipError);
            }

            if (cvvValue.length === 3) {
                hideInputError(cvv, cvvError);
            } else {
                showInputError(cvv, cvvError);
            }

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
        validateActivities();
    });

    payment.addEventListener( 'change', () => {
        changePayment();
    });

    form.addEventListener( 'submit', (e) => {
        e.preventDefault();

        validateName();
        validateEmail();
        validateActivities();
        validatePayment();
    });



});
