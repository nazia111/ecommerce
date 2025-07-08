document.addEventListener("DOMContentLoaded", () => {
  let cart = JSON.parse(localStorage.getItem("cartData")) || {};

  function updateCartDisplay() {
    let total = 0;
    for (const id in cart) {
      total += cart[id].price * cart[id].quantity;
    }

    const cartAmtEl = document.getElementById("cart-amount");
    if (cartAmtEl) cartAmtEl.textContent = "₹" + total.toFixed(2);

    localStorage.setItem("cartTotal", total.toFixed(2));
    localStorage.setItem("cartData", JSON.stringify(cart));
  }

  document.querySelectorAll('.product-item').forEach((item) => {
    const title = item.querySelector('h3')?.innerText.trim();
    const price = parseFloat(item.querySelector('.price')?.textContent.replace('₹', '').trim()) || 0;
    const image = item.querySelector("img")?.src || "";
    const qtyInput = item.querySelector('.input-number');
    const plusBtn = item.querySelector('.quantity-right-plus');
    const minusBtn = item.querySelector('.quantity-left-minus');
    const addToCartBtn = item.querySelector('.add-to-cart');

    const productId = title?.toLowerCase().replace(/\s+/g, "-") || `product-${Date.now()}`;

    qtyInput.value = parseInt(qtyInput.value) || 1;

    // Just update input value, do not update cart here
    plusBtn.addEventListener('click', function (e) {
      e.preventDefault();
      let currentQty = parseInt(qtyInput.value) || 0;
      qtyInput.value = currentQty + 1;
    });

    minusBtn.addEventListener('click', function (e) {
      e.preventDefault();
      let currentQty = parseInt(qtyInput.value) || 0;
      qtyInput.value = Math.max(currentQty - 1, 1);
    });

    addToCartBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      const quantity = parseInt(qtyInput.value) || 1;

      if (!title || !price) {
        alert("Missing product info.");
        return;
      }

      if (cart[productId]) {
        cart[productId].quantity += quantity;
      } else {
        cart[productId] = { title, price, quantity, image };
      }

      updateCartDisplay();
      alert(`${title} added to cart.`);
    });
  });

  updateCartDisplay(); // refresh on load
});
