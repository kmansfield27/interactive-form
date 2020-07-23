document.addEventListener('DOMContentLoaded', function() {

    // Global variables
    const name = document.getElementById('name');
    const jobSelect = document.getElementById('title');
    const designSelect = document.getElementById('design');
    const designOptions = document.querySelectorAll('#design option');
    const activities = document.querySelector('.activities');
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    // Hide Select Theme option from showing when design select is clicked
    designOptions[0].hidden = true;

    
    /*****************************************************/
    // Startup Functions
    /*****************************************************/

    // Set name input to focus by default
    const focusOnLoad = (inputName) => {
        inputName.focus();
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
        
        if ( clicked.tagName === 'INPUT') {
            const clickedDayAndTime = clicked.getAttribute('data-day-and-time');
            const clickedCost = clicked.getAttribute('data-cost');
    
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
        }
    }

    


    /*****************************************************/
    // Initialize functions
    /*****************************************************/
    focusOnLoad(name);
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

});
