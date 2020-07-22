document.addEventListener('DOMContentLoaded', function() {

    // Global variables
    const name = document.getElementById('name');
    const jobSelect = document.getElementById('title');


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


    // Callback functions
    jobSelect.addEventListener( 'change', () => {
        showOtherJob();     
    });
    

    // Initialize functions
    focusOnLoad(name);
    showOtherJob();

});
