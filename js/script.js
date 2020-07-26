document.addEventListener('DOMContentLoaded', function() {


    /*****************************************************/
    // Global Variables
    /*****************************************************/

    const name = document.getElementById('name');
    const email = document.getElementById('mail');
    const jobSelect = document.getElementById('title');
    const jobOther = document.getElementById('title-other-container');
    const designSelect = document.getElementById('design');
    const designOptions = document.querySelectorAll('#design option');
    const color = document.getElementById('color');
    let colorOptions = document.querySelectorAll('#color option');
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


    // Create and bind error messages
    const nameError = create('span', {className: 'error-message is-hidden', textContent: 'Please enter your name.'});
    const emailError = create('span', {className: 'error-message is-hidden', textContent: 'Please enter a valid email.'});
    const activitiesError = create('span', {className: 'error-message is-hidden', textContent: 'Please select at least one activity.'});
    const ccNumError = create('span', {className: 'error-message is-hidden', textContent: 'Please enter a valid credit card.'});
    const zipError = create('span', {className: 'error-message is-hidden', textContent: 'Please enter zip code.'});
    const cvvError = create('span', {className: 'error-message is-hidden', textContent: 'Please enter CVV number.'});


    
    /*****************************************************/
    // Startup Function
    /*****************************************************/


    // Default property values, settings, and element insertion needed when initializing
    const init = () => {
        
        // Set credit card info as the default payment option. Hide content areas for other options.
        const paymentOptions = payment.options;
        paymentOptions[0].disabled = true;
        paymentOptions[1].selected = true;
        paypal.style.display = 'none';
        bitcoin.style.display = 'none';

        // Hide the 'Your Job Role' input by default
        jobOther.style.display = 'none';

        // Create and set default t-shirt color value
        const colorPlaceholder = create('option', {textContent: 'Please select a T-shirt theme'});
        insert( color, colorPlaceholder, 'afterbegin');
        colorOptions = document.querySelectorAll('#color option');
        colorOptions[0].selected = true;

        // Set the max lengths of the payment fields
        zip.maxLength = 5;
        cvv.maxLength = 3;
        ccNum.maxLength = 16;

        // Hide Select Theme option from showing when design select is clicked
        designOptions[0].hidden = true;
        activities.appendChild(totalCostText);
        totalCostText.style.display = 'none';

        // Set name as the default focused input
        name.focus();

        // Insert default error messages into DOM
        insert( name, nameError, 'afterend');   
        insert( email, emailError, 'afterend');
        insert( activities, activitiesError, 'beforeend');
        insert( ccNum, ccNumError, 'afterend');
        insert( zip, zipError, 'afterend');
        insert( cvv, cvvError, 'afterend');
    }


    /*****************************************************/
    // Initialize startup function
    /*****************************************************/


    init();



    /*****************************************************/
    // Callbacks
    /*****************************************************/


    /* Function to create error messages. Arguments are the created tag name and an object for its property key/values
    I modified code from: https://stackoverflow.com/questions/46738333/using-javascript-loop-to-create-multiple-html-elements */
    function create(tagName, props) {
        return Object.assign( document.createElement(tagName), (props || {}) );
    }


    /* Function to insert error messages. It takes the target element, error message to insert, and position.
    I modified code from: https://stackoverflow.com/questions/46738333/using-javascript-loop-to-create-multiple-html-elements */
    function insert(targetElement, insertedElement, position) {
        targetElement.insertAdjacentElement(position, insertedElement);
    }


    /* Callback for the Job Role select.
    It shows the 'Your Job Role' input when Job Role === other. */
    const showOtherJob = () => {
        if (jobSelect.value === 'other') {
            jobOther.style.display = 'block';
        } else {
            jobOther.style.display = 'none';
        }
    }
    

   /* Callback for the shirt design select input.
   It controls what options display in the shirt color select based on value of the design select*/
   const showShirtColor = () => {

        // Define colors for each shirt type
        const punShirtColors = ['cornflowerblue', 'darkslategrey', 'gold'];
        const heartShirtColors = ['tomato', 'steelblue', 'dimgrey'];

        // Create new arrays
        const punOptions = [];
        const heartOptions = [];

        // Loop over the select options
        for (let i = 0; i < colorOptions.length; i++) {

            // Set all options to hidden.
            colorOptions[i].hidden = true;

            // Bindings for value of shirts and tests to see if values are included in pun or heart shirt arrays
            const colorOptionValue = colorOptions[i].value;
            const isPunShirtColor = punShirtColors.includes(colorOptionValue);
            const isHeartShirtColor = heartShirtColors.includes(colorOptionValue);

            // Push the shirts to the appropriate new array
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


    /* Callback for the activity checkboxes - It disables/enables checkboxes based on scheduling conflicts.
    It also calculates the $ total for the selected activities. */
    const clickActivity = () => {
        
        // Get target of the click and its day/time and cost data
        const clicked = event.target;
        const clickedDayAndTime = clicked.getAttribute('data-day-and-time');
        const clickedCost = clicked.getAttribute('data-cost');
        
        // If it's an input clicked (handler will be placed on the .activities div)
        if ( clicked.tagName === 'INPUT') {
    
            for (let i = 0; i < checkboxes.length; i++) {

                // Get day and time and label
                const checkboxDayAndTime = checkboxes[i].getAttribute('data-day-and-time');
                const parentLabel = checkboxes[i].parentNode;
                
                // Disable/enable checkboxes
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

            // Calculate the running total
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


    /* Callback for the payment method select input. 
    It hides/shows content based on the select value */
    const changePayment = () => {

        let paymentDivs = [creditCard, paypal, bitcoin];

        paymentDivs.forEach (paymentDiv => {
            paymentDiv.style.display = 'none';
        });
        
        if (event.target.value === 'credit card') {
            paymentDivs[0].style.display = 'block';
        } else if (event.target.value === 'paypal') {
            paymentDivs[1].style.display = 'block';
        } else if (event.target.value === 'bitcoin') {
            paymentDivs[2].style.display = 'block';
        }
    }



    /*****************************************************/
    // Validation Callbacks
    /*****************************************************/


    // Function to pass into the validation handlers. It hides input message and removes error class.
    // Arguments are the target input and input errors
    const hideInputError = (input, inputError) => {
        input.classList.remove('has-error');
        inputError.classList.add('is-hidden');
        return true;
    }
    

    // Function to pass into the validation handlers. It shows input message and adds error class.
    // Arguments are the target input and input errors
    const showInputError = (input, inputError) => {
        input.classList.add('has-error');
        inputError.classList.remove('is-hidden');
        return false;
    }


    // Check name to see if it isn't empty
    const validateName = () => {
        const nameValue = name.value;
        if (nameValue.length > 0) {
            hideInputError(name, nameError);
            return true;
        } else {
            showInputError(name, nameError);
            return false;
        }
    }


    // Check email to see if @ and . aren't first and last 
    const validateEmail = () => {
        const emailValue = email.value;
        const emailAtIndex = emailValue.indexOf('@');
        const emailDot = emailValue.lastIndexOf('.');
        if (emailAtIndex > 1 && emailDot > emailAtIndex + 1) {
            hideInputError(email, emailError);
            return true;
        } else {
            showInputError(email, emailError);
            return false;
        }
    }


    // Check to see at least one checkbox is checked
    const validateActivities = () => {
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                hideInputError(activities, activitiesError);
                return true;
            }        
        }
        showInputError(activities, activitiesError);
        return false;
    }


    // If paying with credit card, check that CC #, Zip, and CCV meet valid lengths
    const validatePayment = () => {
        const paymentValue = payment.value;

        if (paymentValue === 'credit card') {

            const ccNumValue = ccNum.value;
            const zipValue = zip.value;
            const cvvValue = cvv.value;
            let ccPassed;
            let zipPassed;
            let cvvPassed;

            // 16 char max for ccNumb. 13-16 char === valid
            if (ccNumValue.length > 12) {
                hideInputError(ccNum, ccNumError);
                ccPassed = true;
            } else {
                showInputError(ccNum, ccNumError);
            }

            if (zipValue.length === 5) {
                hideInputError(zip, zipError);
                zipPassed = true;
            } else {
                showInputError(zip, zipError);
            }

            if (cvvValue.length === 3) {
                hideInputError(cvv, cvvError);
                cvvPassed = true;
            } else {
                showInputError(cvv, cvvError);
            }

            if (ccPassed && zipPassed && cvvPassed) {
                return true;
            } else {
                return false;
            }
        }
    }


    /*****************************************************/
    // Event Handlers 
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

        // If any of the validation callbacks return false, prevent default
        if ( !validateName() ) {
            e.preventDefault();
        }

        if ( !validateEmail() ) {
            e.preventDefault();
        }

        if ( !validateActivities() ) {
            e.preventDefault();
        }

        if ( !validatePayment()) {
            e.preventDefault();
        }
    });
});
