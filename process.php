<?php
// Only process POST requests
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and capture the form data
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $workType = strip_tags(trim($_POST["work_type"]));
    $urgency = strip_tags(trim($_POST["urgency"]));

    // Where do you want these leads sent?
    $recipient = "Mrjamessinclair@icloud.com"; 

    // The subject line you will see in your inbox
    $subject = "URGENT Lead: Regularisation Enquiry from $name";

    // The body of the email
    $email_content = "You have a new regularisation enquiry.\n\n";
    $email_content .= "Name: $name\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Work Type: $workType\n";
    $email_content .= "Urgency: $urgency\n";

    // Email Headers
    $email_headers = "From: Website Lead <noreply@yourdomain.com>\r\n";
    $email_headers .= "Reply-To: $email";

    // Send the email and handle the success/failure
    if (mail($recipient, $subject, $email_content, $email_headers)) {
        // Send them back to the homepage with a success message in the URL
        header("Location: index.html?status=success");
        exit;
    } else {
        echo "Oops! Something went wrong on the server and we couldn't send your message.";
    }
} else {
    echo "There was a problem with your submission, please try again.";
}
?>