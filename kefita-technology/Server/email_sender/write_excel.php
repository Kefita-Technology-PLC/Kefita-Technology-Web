<?php
require 'vendor/autoload.php'; // Ensure you have the PhpSpreadsheet library installed

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\IOFactory;

function writeExcelEmails($filePath, $emails) {
    $spreadsheet = new Spreadsheet();
    $sheet = $spreadsheet->getActiveSheet();

    // Write the header in the first row
    $sheet->setCellValue('A1', 'Email'); // Set the header

    // Write emails to the first column (Column A), starting from the second row
    foreach ($emails as $index => $email) {
        $sheet->setCellValue('A' . ($index + 2), $email); // Start writing from the second row in column A
    }

    // Save the spreadsheet
    $writer = IOFactory::createWriter($spreadsheet, 'Xlsx');
    $writer->save($filePath);
}