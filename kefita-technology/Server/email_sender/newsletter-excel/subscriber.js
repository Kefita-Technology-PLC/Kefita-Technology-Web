document
  .getElementById("subscribeForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const messageEl = document.getElementById("message");

    try {
      const response = await fetch("http://localhost:3000/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const result = await response.text();
        messageEl.textContent = result; // Display success message
        document.getElementById("email").value = ""; // Clear the input
      } else {
        const errorText = await response.text();
        messageEl.textContent = `Error: ${errorText}`; // Display error message
      }
    } catch (error) {
      messageEl.textContent = "An error occurred. Please try again."; // Handle network errors
    }
  });
