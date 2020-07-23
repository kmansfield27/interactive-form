document.addEventListener('DOMContentLoaded', function() {

    // Global variables
    const name = document.getElementById('name');
    const jobSelect = document.getElementById('title');
    const designSelect = document.getElementById('design');
    const designOptions = document.querySelectorAll('#design option');

    designOptions[0].hidden = true;

    // Set name input to focus by default
    const focusOnLoad = (inputName) => {
        inputName.focus();
    }

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
        const punOptions = [];
        const heartOptions = [];

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


    // Initialize functions
    focusOnLoad(name);
    showOtherJob();


    // Callback functions
    jobSelect.addEventListener( 'change', () => {
        showOtherJob();     
    });

    designSelect.addEventListener( 'change', () => {
        showShirtColor();
    });

});
