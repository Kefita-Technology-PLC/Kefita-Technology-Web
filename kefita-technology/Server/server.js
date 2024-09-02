const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sendContactForm = require("./src/controllers/controller");

const app = express();
const PORT = process.env.PORT || 5500;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/api/contact", sendContactForm);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
