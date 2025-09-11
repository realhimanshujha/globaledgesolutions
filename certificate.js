// certificate.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("verifyForm");
  const result = document.getElementById("result");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = document.getElementById("certificateId").value.trim();

    result.style.opacity = 0; // start hidden

    try {
      const response = await fetch(`https://script.google.com/macros/s/AKfycby-MDxEsq3aFdYKZlZHph2lV0Yk_6MnfiRFs7Bv5ck5c2Rze9t8M5ZvbOtFHVShulcAGA/exec?id=${encodeURIComponent(id)}`);
      const data = await response.json();

      if (data.valid) {
        result.style.color = "green";
        result.textContent = "Certificate is VALID ✅";
      } else {
        result.style.color = "red";
        result.textContent = "Certificate ID is INVALID ❌";
      }
    } catch (error) {
      result.style.color = "red";
      result.textContent = "Error checking certificate.";
    }

    fadeIn(result);
    form.reset();
  });

  function fadeIn(element) {
    let op = 0;
    element.style.display = "block";
    let timer = setInterval(() => {
      if (op >= 1) clearInterval(timer);
      element.style.opacity = op;
      op += 0.1;
    }, 30);
  }
});
  