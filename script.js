// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn?.addEventListener("click", () => {
  mobileMenu.classList.toggle("show");
  const isOpen = mobileMenu.classList.contains("show");
  mobileMenu.setAttribute("aria-hidden", String(!isOpen));
});

// Close mobile menu on click
mobileMenu?.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => {
    mobileMenu.classList.remove("show");
    mobileMenu.setAttribute("aria-hidden", "true");
  });
});

// Year
document.getElementById("year").textContent = new Date().getFullYear();

// Filter gallery
const chips = document.querySelectorAll(".chip");
const cards = document.querySelectorAll(".card");

chips.forEach(chip => {
  chip.addEventListener("click", () => {
    chips.forEach(c => c.classList.remove("active"));
    chip.classList.add("active");

    const filter = chip.dataset.filter;
    cards.forEach(card => {
      const tags = (card.dataset.tags || "").split(" ");
      const show = filter === "all" || tags.includes(filter);
      card.style.display = show ? "block" : "none";
    });
  });
});

// Lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");

cards.forEach(card => {
  card.addEventListener("click", () => {
    const img = card.querySelector("img");
    if (!img) return;
    lightboxImg.src = img.src;
    lightbox.style.display = "flex";
    lightbox.setAttribute("aria-hidden", "false");
  });
});

function closeLightbox(){
  lightbox.style.display = "none";
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImg.src = "";
}
lightboxClose?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

// Copy message template
const copyBtn = document.getElementById("copyBtn");
const copyNote = document.getElementById("copyNote");

copyBtn?.addEventListener("click", async () => {
  const template =
`Hi Ali,
I need AI images for: [brand/product]
Style/mood: [minimal/cinematic/etc]
Quantity: [number]
Use case: [ads / website / social]
Deadline: [date]
References: [links/files]
Budget range: [optional]`;

  try{
    await navigator.clipboard.writeText(template);
    copyNote.textContent = "Copied. Paste it into email/DM and fill the blanks.";
  }catch{
    copyNote.textContent = "Couldn’t auto-copy on this browser. Please copy manually.";
  }
});
