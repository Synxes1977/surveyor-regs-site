// Store user selections
let formData = {
    workType: '',
    urgency: ''
};

function nextStep(stepNumber, selection) {
    // Save data based on the step we are leaving
    if (stepNumber === 3) {
        formData.workType = selection;
        document.getElementById('hidden-work-type').value = selection;
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
        message.innerText = "Building work carried out before 11th November 1985 cannot be regularised and is generally exempt from enforcement. If you still need a structural survey for peace of mind, leave your details below.";
        form.style.display = "block";
    } else if (outcome === 'urgent') {
        formData.urgency = 'urgent';
        document.getElementById('hidden-urgency').value = 'urgent';
        title.innerText = "We Can Fast-Track Your Case";
        message.innerText = "We understand that house sales fall through because of compliance issues. Enter your details below for a priority review.";
        form.style.display = "block";
    } else {
        formData.urgency = 'standard';
        document.getElementById('hidden-urgency').value = 'standard';
        title.innerText = "You Are Eligible to Apply";
        message.innerText = "We can help you navigate the LABC process and secure your certificate. Enter your details below to get started.";
        form.style.display = "block";
    }

    // Show the result screen
    document.getElementById('result-screen').classList.add('active');

}

// Check for successful form submission on page load
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('status') === 'success') {
        alert("Thank you! Your assessment request has been received. We will be in touch shortly.");
        // Clean up the URL so it doesn't keep alerting on refresh
        window.history.replaceState({}, document.title, window.location.pathname);
    }
};
