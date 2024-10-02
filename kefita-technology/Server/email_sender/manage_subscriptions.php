<?php
require_once 'read_excel.php';
require_once 'send_email.php';

$excelFile = 'newsletter-excel/subscribers.xlsx';
$emails = readExcelEmails($excelFile);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['send_welcome'])) {
        $subject = "Welcome to the Kefita Technology P.L.C. Newsletter!";
        $message = "
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; }
                    .content { line-height: 1.6; }
                </style>
            </head>
            <body>
                <h1>Welcome to the Kefita Technology P.L.C. Newsletter!</h1>
                <p>Dear [Subscriber's Name],</p>
                <p>Thank you for subscribing to the Kefita Technology P.L.C. newsletter!</p>
                <p>We’re thrilled to welcome you to our community. You can look forward to receiving the latest updates, industry insights, and exclusive content right in your inbox. Our goal is to keep you informed about the exciting developments and innovations at Kefita Technology P.L.C.</p>
                <p>If you have any questions or feedback, please don’t hesitate to reach out. We’re here to assist and would love to hear from you.</p>
                <p>Thank you once again for subscribing. Stay tuned for our upcoming editions!</p>
                <p>Best regards,<br>
                Tarkiwa Tesfa<br>
                [Your Position]<br>
                Kefita Technology P.L.C.<br>
                [Your Contact Information]<br>
                [Company Website]</p>
            </body>
            </html>
        ";

        $successMessage = "Welcome emails sent successfully!";
        
        foreach ($emails as $email) {
            $personalizedMessage = str_replace("[Subscriber's Name]", $email, $message);
            $result = sendEmail($email, $subject, $personalizedMessage);
            echo "Sending to $email: " . ($result ? "Success" : "Failed") . "<br>";
        }
    } elseif (isset($_POST['send_newsletter'])) {
        $subject = $_POST['subject'];
        $message = $_POST['message'];
        
        // Add unsubscribe link to the newsletter message
        $unsubscribeLink = "http://localhost:8000/unsubscribe.php?email=[Subscriber_Email]";
        $message .= "<br><br><a href='$unsubscribeLink'>Unsubscribe</a>";

        $successMessage = "Newsletter sent successfully!";
        
        foreach ($emails as $email) {
            $personalizedMessage = str_replace("[Subscriber_Email]", $email, $message);
            $result = sendEmail($email, $subject, $personalizedMessage);
            echo "Sending to $email: " . ($result ? "Success" : "Failed") . "<br>";
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manage Subscriptions</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 20px; }
        h1, h2 { color: #333; }
        form { margin-bottom: 20px; }
        label { display: block; margin-bottom: 5px; }
        input[type="text"], textarea { width: 100%; padding: 8px; margin-bottom: 10px; }
        button { background-color: #4CAF50; color: white; padding: 10px 15px; border: none; cursor: pointer; }
        button:hover { background-color: #45a049; }
        .success { color: green; font-weight: bold; }
    </style>
</head>
<body>
    <h1>Manage Subscriptions for Kefita Technology P.L.C.</h1>
    <h2>Admin Page</h2>
    
    <?php if (isset($successMessage)): ?>
        <p class="success"><?php echo $successMessage; ?></p>
    <?php endif; ?>

    <h2>Send Welcome Email</h2>
    <form method="POST">
        <button type="submit" name="send_welcome">Send Welcome Emails</button>
    </form>

    <h2>Send Newsletter</h2>
    <form method="POST">
        <label for="subject">Subject:</label>
        <input type="text" id="subject" name="subject" required>
        <label for="message">Message:</label>
        <textarea id="message" name="message" rows="5" required></textarea>
        <button type="submit" name="send_newsletter">Send Newsletter</button>
    </form>
</body>
</html>