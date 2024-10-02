<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

function sendEmail($to, $subject, $message) {
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';  // SMTP server
        $mail->SMTPAuth   = true;
        $mail->Username   = 'tibebudag07@gmail.com'; // 
        $mail->Password   = 'omfd wnwu xxgy vhsb';   // Your Gmail password or App-specific password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // Recipients
        $mail->setFrom('tibebudag07@gmail.com', 'Kefita Technology P.L.C');
        $mail->addAddress($to);

        // Add unsubscribe link to the message
        $unsubscribeLink = "http://localhost:8000/unsubscribe.php?email=" . urlencode($to);
        $message .= "<br><br><a href='$unsubscribeLink'>Unsubscribe</a>";

        // Content
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = $message;

        $mail->send();
        error_log("Message sent successfully to $to");
        return true;
    } catch (Exception $e) {
        error_log("Message could not be sent. Mailer Error: {$mail->ErrorInfo}");
        return false;
    }
}