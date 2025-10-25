// Typing Effect
const typingText = ["innovative web apps.", "data-driven solutions.", "interactive dashboards."];
let i = 0;
let textIndex = 0;
const typingElement = document.getElementById("typing-effect");

function type() {
  if (textIndex < typingText[i].length) {
    typingElement.textContent += typingText[i].charAt(textIndex);
    textIndex++;
    setTimeout(type, 100);
  } else {
    setTimeout(erase, 1500);
  }
}

function erase() {
  if (textIndex > 0) {
    typingElement.textContent = typingText[i].substring(0, textIndex - 1);
    textIndex--;
    setTimeout(erase, 50);
  } else {
    i = (i + 1) % typingText.length;
    setTimeout(type, 500);
  }
}
document.addEventListener("DOMContentLoaded", type);

// GSAP Scroll Animations
gsap.registerPlugin(ScrollTrigger);
gsap.utils.toArray(".section-container").forEach((section) => {
  gsap.from(section, {
    opacity: 0,
    y: 80,
    duration: 1,
    scrollTrigger: {
      trigger: section,
      start: "top 85%",
    },
  });
});

// GitHub API Integration
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const modalLink = document.getElementById("modalLink");
const closeModalBtn = document.getElementById("closeModal");

document.querySelectorAll(".github-btn").forEach((btn) => {
  btn.addEventListener("click", async (e) => {
    e.preventDefault();
    const repoName = btn.getAttribute("data-repo");
    modal.style.display = "flex";
    modalTitle.textContent = "Loading Repository Info...";
    modalBody.textContent = "Please wait...";
    modalLink.style.display = "none";

    try {
        const response = await fetch(`https://api.github.com/repos/pravalikagodugu/${repoName}`);
        if (!response.ok) throw new Error("Repository not found");
        const repo = await response.json();
      
      modalTitle.textContent = repo.name;
      modalBody.innerHTML = `
        <p>${repo.description || "No description available."}</p>
        <p><strong>⭐ Stars:</strong> ${repo.stargazers_count}</p>
        <p><strong>🍴 Forks:</strong> ${repo.forks_count}</p>
        <p><strong>🕒 Updated:</strong> ${new Date(repo.updated_at).toLocaleDateString()}</p>
      `;
      modalLink.href = repo.html_url;
      modalLink.style.display = "inline-block";
    } catch (error) {
      modalTitle.textContent = "Error";
      modalBody.textContent = "Could not fetch GitHub repository info.";
    }
  });
});

closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.onclick = (e) => {
  if (e.target === modal) modal.style.display = "none";
};

// Contact Form Feedback
const form = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const response = await fetch(form.action, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });
    if (response.ok) {
      formStatus.textContent = "✅ Message sent successfully!";
      form.reset();
    } else {
      formStatus.textContent = "❌ Failed to send. Try again!";
    }
  });
}