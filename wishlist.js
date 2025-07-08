document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".btn-wishlist").forEach(button => {
    button.addEventListener("click", (e) => {
      e.preventDefault();

      // Prevent multiple rapid clicks
      button.disabled = true;

      const item = button.closest(".product-item");

      const title = item.querySelector("h3")?.innerText.trim();
      const priceText = item.querySelector(".price")?.innerText.replace(/[^\d.]/g, '');
      const price = parseFloat(priceText) || 0;
      const image = item.querySelector("img")?.getAttribute("src");
      const id = title ? title.toLowerCase().replace(/\s+/g, "-") : `item-${Date.now()}`;

      if (!title || !price || !image) {
        alert("Unable to add item to wishlist. Missing info.");
        button.disabled = false;
        return;
      }

      let wishlist = JSON.parse(localStorage.getItem("wishlistData")) || {};

      if (!wishlist[id]) {
        wishlist[id] = { title, price, image };
        localStorage.setItem("wishlistData", JSON.stringify(wishlist));
        alert(`${title} added to your wishlist.`);
      } else {
        alert(`${title} is already in your wishlist.`);
      }

      // Re-enable button after short delay
      setTimeout(() => { button.disabled = false }, 1000);
    });
  });
});
