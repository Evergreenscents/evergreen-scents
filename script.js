// Evergreen Scents Website JavaScript
// Handles collapsible shop categories, basket, checkout, gallery, and testimonials

// ============ Collapsible Sections (Shop) ============
document.querySelectorAll(".collapsible").forEach(button => {
  button.addEventListener("click", () => {
    const content = button.nextElementSibling;
    const isVisible = content.style.display === "block";

    // Close other sections before opening this one
    document.querySelectorAll(".collapsible-content").forEach(el => el.style.display = "none");

    if (!isVisible) {
      content.style.display = "block";
    }
  });
});

// ============ 18+ Section Confirmation ============
document.querySelectorAll(".collapsible.adult").forEach(button => {
  button.addEventListener("click", () => {
    const confirmed = confirm(
      "⚠️ Warning: This section contains 18+ products.\n\nPlease confirm that you are over 18 years old to continue."
    );
    if (confirmed) {
      const content = button.nextElementSibling;
      content.style.display = content.style.display === "block" ? "none" : "block";
    }
  });
});

// ============ Basket System ============
let basket = JSON.parse(localStorage.getItem("basket")) || [];

function updateBasketDisplay() {
  const basketItems = document.getElementById("basketItems");
  const basketTotal = document.getElementById("basketTotal");
  if (!basketItems || !basketTotal) return;

  basketItems.innerHTML = "";
  let total = 0;

  basket.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("basket-item");
    div.innerHTML = `
      <span>${item.name} - £${item.price.toFixed(2)}</span>
      <button onclick="removeFromBasket(${index})" class="remove-btn">x</button>
    `;
    basketItems.appendChild(div);
    total += item.price;
  });

  // Flat-rate postage £5.00 per order (only if there are items)
  const postage = total > 0 ? 5.00 : 0;
  basketTotal.textContent = `Total: £${total.toFixed(2)} + £${postage.toFixed(2)} postage = £${(total + postage).toFixed(2)}`;

  localStorage.setItem("basket", JSON.stringify(basket));
}

function addToBasket(name, price) {
  basket.push({ name, price });
  updateBasketDisplay();
  alert(`${name} added to basket.`);
}

function removeFromBasket(index) {
  basket.splice(index, 1);
  updateBasketDisplay();
}

// ============ Basket Modal ============
function openBasket() {
  document.getElementById("basketModal").style.display = "block";
  updateBasketDisplay();
}

function closeBasket() {
  document.getElementById("basketModal").style.display = "none";
}

// ============ Testimonials ============
const testimonialForm = document.getElementById("testimonialForm");
const testimonialsList = document.getElementById("testimonialsList");

if (testimonialForm) {
  testimonialForm.addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("testimonialName").value.trim();
    const message = document.getElementById("testimonialMessage").value.trim();

    if (!name || !message) {
      alert("Please enter both name and message.");
      return;
    }

    const testimonialDiv = document.createElement("div");
    testimonialDiv.classList.add("testimonial");
    testimonialDiv.innerHTML = `<strong>${name}</strong><p>${message}</p>`;

    testimonialsList.appendChild(testimonialDiv);
    testimonialForm.reset();
  });
}

// ============ Gallery Placeholder ============
document.addEventListener("DOMContentLoaded", () => {
  const galleryContainer = document.querySelector(".gallery-grid");
  if (galleryContainer && galleryContainer.children.length === 0) {
    for (let i = 1; i <= 9; i++) {
      const img = document.createElement("img");
      img.src = `gallery_placeholder_${i}.jpg`;
      img.alt = `Gallery image ${i}`;
      galleryContainer.appendChild(img);
    }
  }
});

// ============ Smooth Scroll for Menu Links ============
document.querySelectorAll('.sidebar nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
});

// ============ Auto Update Basket on Load ============
document.addEventListener("DOMContentLoaded", updateBasketDisplay);
