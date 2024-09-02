document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const responseMessage = document.getElementById("responseMessage");
  const loadRoller = document.getElementById("lds-roller");
  const submit = document.getElementById("submit");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    loadRoller.style.display = "block";
    submit.value = "Sending the message";

    // Create FormData from form
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("http://localhost:5500/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.text();

      if (response.ok) {
        responseMessage.textContent = "Message Sent Successfully";
        responseMessage.style.color = "green";
        form.reset(); // Reset form fields
      } else {
        responseMessage.textContent =
          "Failed to send message. Please try again.";
        responseMessage.style.color = "red";
      }

      console.log("Response:", result);
    } catch (error) {
      responseMessage.textContent = "An error occurred. Please try again.";
      responseMessage.style.color = "red";
      console.error("Error:", error);
    } finally {
      loadRoller.style.display = "none";
      submit.value = "Sent"; // Reset button text after completion
    }
  });

  // Update submit button text if form fields change
  form.addEventListener("input", () => {
    submit.value = "Send Message";
  });
});
