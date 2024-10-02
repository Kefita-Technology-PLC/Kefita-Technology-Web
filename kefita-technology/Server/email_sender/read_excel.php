<?php
require 'vendor/autoload.php'; // Ensure you have the PhpSpreadsheet library installed

use PhpOffice\PhpSpreadsheet\IOFactory;

function readExcelEmails($filePath) {
    $spreadsheet = IOFactory::load($filePath);
    $worksheet = $spreadsheet->getActiveSheet();
    $emails = [];

    $highestRow = $worksheet->getHighestRow();

    // Read emails from column A, starting from the second row
    for ($row = 2; $row <= $highestRow; $row++) { // Start from row 2 to skip the header
        $cellValue = $worksheet->getCell('A' . $row)->getValue(); // Read from column A
        if (filter_var($cellValue, FILTER_VALIDATE_EMAIL)) {
            $emails[] = $cellValue;
        }
    }

    return $emails;
}

function unsubscribeEmail($filePath, $emailToRemove) {
    // Read current emails
    $emails = readExcelEmails($filePath);

    // Check if the email exists in the list
    if (in_array($emailToRemove, $emails)) {
        // Remove the email from the list
        $emails = array_diff($emails, [$emailToRemove]);

        // Write the updated list back to the Excel file, starting from the second row
        writeExcelEmails($filePath, $emails); // This will overwrite the existing data
        return true; // Unsubscription successful
    }
    return false; // Email not found
}