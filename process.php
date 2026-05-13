<?php
// --- regularisation.co.uk | Form Processor --- //

// Only process POST requests
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Sanitize and capture the form data
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    
    // Default to 'Not specified' if the hidden fields didn't pass through
    $workType = isset($_POST["work_type"]) && !empty($_POST["work_type"]) ? strip_tags(trim($_POST["work_type"])) : 'Not specified';
    $urgency = isset($_POST["urgency"]) && !empty($_POST["urgency"]) ? strip_tags(trim($_POST["urgency"])) : 'Not specified';

    // Basic Validation: Ensure Name and Email aren't empty after sanitizing
    if (empty($name) || empty($email)) {
        echo "Please complete all required fields and try again.";
        exit;
    }

    // Recipient: Where you want the leads sent
    $recipient = "Mrjamessinclair@icloud.com"; 

    // Subject line for your inbox
    $subject = "URGENT Lead: Regularisation Enquiry from $name";

    // Build a clean, professional email body
    $email_content = "You have received a new regularisation enquiry via the website.\n\n";
    $email_content .= "--- Client Details ---\n";
    $email_content .= "Name: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "--- Case Details ---\n";
    $email_content .= "Work Type: " . ucfirst($workType) . "\n";
    $email_content .= "Urgency: " . ucfirst($urgency) . "\n\n";
    $email_content .= "----------------------\n";

    // Email Headers - CRITICAL: Using the actual domain name to prevent spam blocking
    $email_headers = "From: Website Lead <noreply@regularisation.co.uk>\r\n";
    $email_headers .= "Reply-To: $email\r\n";

    // Send the email and handle the redirect
    if (mail($recipient, $subject, $email_content, $email_headers)) {
        // Redirect back to the homepage to trigger the JS success message
        header("Location: index.html?status=success");
        exit;
    } else {
        echo "Oops! Something went wrong on the server and we couldn't send your message.";
    }
} else {
    // If someone accesses the file directly without a POST request
    header("Location: index.html");
    exit;
}
?>