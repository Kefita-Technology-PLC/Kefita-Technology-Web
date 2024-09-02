const transporter = require("../configration/configraion");

const sendContactForm = (req, res) => {
  console.log(req)
  const { name, email, subject, message } = req.body;

  // Debugging logs
  console.log("Request Body:", req.body);
  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Subject:", subject);
  console.log("Message:", message);

  const mailOptions = {
    from: email,
    to: "haylemeskelhaylemariam@gmail.com", // Replace with your target email
    subject: subject || "No Subject", // Default subject if none provided
    text: message, // Plain text version
    html: `
      <h1>Contact Form Submission</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p> 
    `, // HTML version for better formatting
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).send("Failed to send email.");
    }
    console.log("Email sent:", info.response);
    res.status(200).send("Message sent successfully!");
  });
};

module.exports = sendContactForm;
