document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const responseMessage = document.getElementById("responseMessage");

  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(form);

    try {
      const response = await fetch("http://localhost:5500/api/contact", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        responseMessage.textContent = "Message Sent Successfully";
        responseMessage.style.color = "green";
        form.reset(); // Optional: clear the form fields
        // Redirect to the contact page
      } else {
        responseMessage.textContent =
          "Failed to send message. Please try again.";
        responseMessage.style.color = "red";
      }
    } catch (error) {
      responseMessage.textContent = "An error occurred. Please try again.";
      responseMessage.style.color = "red";
      console.log(error);
    }
  });
});
