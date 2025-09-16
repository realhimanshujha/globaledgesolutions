document.addEventListener("DOMContentLoaded", () => {
  // Certificate verification logic
  const formVerify = document.getElementById("verifyForm");
  const resultVerify = document.getElementById("result");

  if (formVerify && resultVerify) {
  formVerify.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = document.getElementById("certificateId").value.trim();
    resultVerify.style.opacity = 0;

    try {
      const response = await fetch(`https://script.google.com/macros/s/AKfycby-MDxEsq3aFdYKZlZHph2lV0Yk_6MnfiRFs7Bv5ck5c2Rze9t8M5ZvbOtFHVShulcAGA/exec?id=${encodeURIComponent(id)}`);
      const data = await response.json();

      if (data.valid) {
        resultVerify.style.color = "green";
        resultVerify.textContent = "Certificate is VALID ✅";
      } else {
        resultVerify.style.color = "red";
        resultVerify.textContent = "Certificate ID is INVALID ❌";
      }
    } catch (error) {
      resultVerify.style.color = "red";
      resultVerify.textContent = "Error verifying certificate. Please try again.";
      console.error("Certificate verification error:", error);
    }

    fadeIn(resultVerify);
    formVerify.reset();
  });
}


  function fadeIn(element) {
    let op = 0;
    element.style.display = "block";
    let timer = setInterval(() => {
      if (op >= 1) clearInterval(timer);
      element.style.opacity = op;
      op += 0.1;
    }, 30);
  }

  // Hamburger menu logic
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      hamburger.classList.toggle("open");
    });
  }

  // Contact form submission with CAPTCHA
  const form = document.getElementById("contactForm");
  const result = document.getElementById("form-result");

  if (form && result) {
// CAPTCHA questions with emojis
const questions = [
  { question: "What is 🔢 3 ➕ 5?", answer: "8" },
  { question: "What is 🔢 4 ➕ 6?", answer: "10" },
  { question: "What is 🔢 7 ➖ 2?", answer: "5" },
  { question: "What is 🔢 2 ➕ 9?", answer: "11" },
  { question: "What is 🔢 5 ➕ 3?", answer: "8" }
];

const selected = questions[Math.floor(Math.random() * questions.length)];
document.getElementById("captchaLabel").textContent = selected.question;


    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      result.style.opacity = 0;

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const subject = form.subject.value.trim();
      const message = form.message.value.trim();
      const captchaAnswer = document.getElementById("captchaAnswer").value.trim();

      if (!name || !email || !subject || !message || !captchaAnswer) {
        result.style.color = "red";
        result.textContent = "Please fill in all fields.";
        result.style.opacity = 1;
        form.classList.add("shake");
        setTimeout(() => form.classList.remove("shake"), 300);
        return;
      }

      if (captchaAnswer !== selected.answer) {
        result.style.color = "red";
        result.textContent = "CAPTCHA answer is incorrect.";
        result.style.opacity = 1;
        form.classList.add("shake");
        setTimeout(() => form.classList.remove("shake"), 300);
        return;
      }

      result.textContent = "Sending...";
      result.style.color = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
      result.style.opacity = 1;

      const formData = { name, email, subject, message };

      try {
        const response = await fetch("https://formspree.io/f/mzzaonly", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });

        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }

        result.style.color = "green";
        result.textContent = "Thank you! Your message has been sent.";
        form.reset();
      } catch (error) {
        result.style.color = "red";
        result.textContent = "Oops! Something went wrong. Please try again.";
        form.classList.add("shake");
        setTimeout(() => form.classList.remove("shake"), 300);
        console.error("Form submission error:", error);
      }
    });
  }

  // Animate elements on scroll
  function animateOnScroll() {
    const elements = document.querySelectorAll(".animate");
    const windowHeight = window.innerHeight;

    elements.forEach((el) => {
      const position = el.getBoundingClientRect().top;
      if (position < windowHeight - 100) {
        el.classList.add("visible");
      }
    });
  }

  window.addEventListener("scroll", animateOnScroll);
  window.addEventListener("load", animateOnScroll);
});

// Auto-select subject if coming from services page
const urlParams = new URLSearchParams(window.location.search);
const serviceParam = urlParams.get('service');
if (serviceParam === 'services') {
  const subjectSelect = document.getElementById("subject");
  if (subjectSelect) {
    subjectSelect.value = "services"; // Assuming "Course Details" is the option for service inquiries
  }
}
