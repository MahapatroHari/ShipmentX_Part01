document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.pricing-content');
    const planDropdown = document.getElementById('plan-dropdown');

    // Function to handle tab switching
    function switchTab(plan) {
        // Remove active class from all buttons and content
        tabButtons.forEach(button => button.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Add active class to the clicked button and corresponding content
        document.querySelector(`.tab-button[data-plan="${plan}"]`).classList.add('active');
        document.getElementById(plan).classList.add('active');
    }

    

    // Initialize with default plan
    switchTab('premium');

    // Event listeners for tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const plan = button.getAttribute('data-plan');
            switchTab(plan);
        });
    });

    // Event listener for dropdown
    planDropdown.addEventListener('change', (event) => {
        switchTab(event.target.value);
    });
});
