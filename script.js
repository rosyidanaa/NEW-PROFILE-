const whatsappNumber = "6285117808629";

// Membuat pesan WhatsApp otomatis untuk tombol umum dan setiap menu.
document.querySelectorAll("[data-whatsapp], [data-order]").forEach((link) => {
  const product = link.dataset.order;

  const message = product
    ? `Halo, saya ingin bertanya dan memesan ${product}. Mohon info harga dan ketersediaannya.`
    : link.dataset.whatsapp;

  link.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});

// Navigasi hamburger pada layar kecil.
const menuToggle = document.getElementById("menu-toggle");
const siteNav = document.getElementById("site-nav");

function closeMenu() {
  if (!menuToggle || !siteNav) return;

  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Buka menu navigasi");
  siteNav.classList.remove("is-open");
}

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Buka menu navigasi" : "Tutup menu navigasi"
    );

    siteNav.classList.toggle("is-open", !isOpen);
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

// Filter kategori menu.
const filterButtons = document.querySelectorAll(".filter-btn");
const menuCards = document.querySelectorAll(".menu-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    menuCards.forEach((card) => {
      const categories = card.dataset.category.split(/\s+/);
      card.hidden = selectedFilter !== "all" && !categories.includes(selectedFilter);
    });
  });
});

// Animasi elemen saat masuk ke area layar.
document.documentElement.classList.add("js");

const revealItems = document.querySelectorAll(".reveal");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if ("IntersectionObserver" in window && !reduceMotion) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

// Tahun pada footer.
const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}