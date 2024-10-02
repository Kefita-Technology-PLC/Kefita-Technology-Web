<?php
require 'vendor/autoload.php'; // Ensure you have the PhpSpreadsheet library installed
use PhpOffice\PhpSpreadsheet\IOFactory;

require_once 'read_excel.php'; // Include the read function
require_once 'write_excel.php'; // Include the write function

function subscribeEmail($filePath, $emailToAdd) {
    // Read current emails
    $emails = readExcelEmails($filePath);

    // Check if the email already exists
    if (in_array($emailToAdd, $emails)) {
        return false; // Email already subscribed
    }

    // Add the new email to the list
    $emails[] = $emailToAdd;

    // Write the updated list back to the Excel file, starting from the second row
    writeExcelEmails($filePath, $emails); // This will overwrite the existing data
    return true; // Subscription successful
}