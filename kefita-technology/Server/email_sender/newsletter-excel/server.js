// kefita-technology/Server/email_sender/newsletter-excel/server.js
const express = require("express");
const bodyParser = require("body-parser");
const XLSX = require("xlsx");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Serve static files from the 'public' directory (adjust the path as needed)
app.use(
  express.static(
    path.join(__dirname, "/Kefita-Technology-Web-/kefita-technology/client/src")
  )
); // Update this path

// Path to the Excel file
const EXCEL_FILE = path.join(__dirname, "subscribers.xlsx"); // Adjusted path to point to the same directory

app.post("/subscribe", async (req, res) => {
  const { email } = req.body;

  // Validate email input
  if (!email) {
    return res.status(400).send("Email is required");
  }

  try {
    // Read existing workbook
    let workbook = XLSX.readFile(EXCEL_FILE);
    let sheet = workbook.Sheets[workbook.SheetNames[0]];

    // Convert sheet to JSON
    let data = XLSX.utils.sheet_to_json(sheet);

    // Check if email already exists
    if (data.some((row) => row.Email === email)) {
      return res.status(400).send("Email already subscribed");
    }

    // Add new email
    data.push({ Email: email });

    // Convert back to sheet
    let newSheet = XLSX.utils.json_to_sheet(data);

    // Replace sheet in workbook and write to file
    workbook.Sheets[workbook.SheetNames[0]] = newSheet;
    XLSX.writeFile(workbook, EXCEL_FILE);

    res.status(201).send("Subscription successful");
  } catch (error) {
    console.error("Error subscribing:", error);
    res.status(500).send("Error subscribing");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
