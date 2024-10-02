<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Include the read and write functions
require_once 'read_excel.php'; // Adjust the path if necessary
require_once 'write_excel.php'; // Adjust the path if necessary

$message = ""; // Initialize message variable

if (isset($_GET['email'])) {
    $emailToUnsubscribe = $_GET['email'];

    // Unsubscribe the email
    $result = unsubscribeEmail('newsletter-excel/subscribers.xlsx', $emailToUnsubscribe); // Path to subscribers.xlsx

    if ($result) {
        $message = "You have been successfully unsubscribed from our newsletter.";
    } else {
        $message = "The email address you provided was not found in our subscription list.";
    }
} else {
    $message = "No email address was provided.";
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Unsubscribe Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: auto;
            background: white;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333;
        }
        p {
            font-size: 16px;
            color: #555;
        }
        .success {
            color: green;
            font-weight: bold;
        }
        .error {
            color: red;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Unsubscribe Confirmation</h1>
        <p class="<?php echo isset($result) && $result ? 'success' : 'error'; ?>">
            <?php echo $message; ?>
        </p>
        <p>Thank you for your time. If you have any feedback, feel free to reach out to us.</p>
    </div>
</body>
</html>