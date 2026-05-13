// --- regularisation.co.uk | Interactive Triage Form Logic --- //

// Store user selections
let formData = {
    workType: '',
    urgency: ''
};

function nextStep(stepNumber, selection) {
    // Dynamically save the selection based on the data provided
    if (selection === 'extension' || selection === 'internal' || selection === 'loft') {
        formData.workType = selection;
        // Safety check to ensure the hidden element exists before updating
        let hiddenType = document.getElementById('hidden-work-type');
        if (hiddenType) hiddenType.value = selection;
    }

    // Hide all steps
    let steps = document.querySelectorAll('.form-step');
    steps.forEach(step => step.classList.remove('active'));

    // Show the target step
    document.getElementById('step-' + stepNumber).classList.add('active');
}

function showResult(outcome) {
    // Hide all steps
    let steps = document.querySelectorAll('.form-step');
    steps.forEach(step => step.classList.remove('active'));

    let title = document.getElementById('result-title');
    let message = document.getElementById('result-message');
    let form = document.getElementById('lead-capture-form');

    // Customize the message based on their answers
    if (outcome === 'pre1985') {
        title.innerText = "No Application Required";
        message.innerText = "Building work carried out before 11th November 1985 cannot be regularised and is generally exempt from enforcement. If you require a structural survey for peace of mind, leave your details below.";
        form.style.display = "block";
    } else if (outcome === 'urgent') {
        formData.urgency = 'urgent';
        document.getElementById('hidden-urgency').value = 'urgent';
        title.innerText = "Priority Case Assessment";
        message.innerText = "We understand that property sales are highly time-sensitive. Enter your details below for a priority compliance review.";
        form.style.display = "block";
    } else {
        formData.urgency = 'standard';
        document.getElementById('hidden-urgency').value = 'standard';
        title.innerText = "You Are Eligible to Apply";
        message.innerText = "We can advocate on your behalf to navigate the LABC process and secure your certificate. Enter your details to start.";
        form.style.display = "block";
    }

    // Show the result screen
    document.getElementById('result-screen').classList.add('active');
}

// Check for successful form submission on page load
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    
    if (urlParams.get('status') === 'success') {
        // Instead of an ugly alert, we inject a premium success message into the form container
        const formContainer = document.getElementById('interactive-form-container');
        
        if (formContainer) {
            formContainer.innerHTML = `
                <div style="text-align: center; padding: 40px 20px;">
                    <h3 style="color: var(--accent-color); font-size: 2.2rem; font-family: var(--font-heading); margin-bottom: 15px;">Request Received</h3>
                    <p style="color: var(--text-light); font-size: 1.1rem; line-height: 1.6;">Thank you. Your assessment request has been successfully securely submitted. Our Chartered Surveyor will review your details and contact you shortly.</p>
                </div>
            `;
        }
        
        // Clean up the URL so the message doesn't persist if they refresh the page
        window.history.replaceState({}, document.title, window.location.pathname);
        
        // Auto-scroll to the success message so the user actually sees it
        document.getElementById('triage-form').scrollIntoView({ behavior: 'smooth' });
    }
};
// --- FAQ Accordion Logic --- //
document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const currentItem = question.parentElement;
            
            // Optional: Close other open FAQs when one is clicked
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== currentItem) {
                    item.classList.remove('active');
                }
            });

            // Toggle the clicked FAQ
            currentItem.classList.toggle('active');
        });
    });
});