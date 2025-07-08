document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ cart.js logic loaded!");

  let cart = JSON.parse(localStorage.getItem("cartData")) || {};

  function updateCartDisplay() {
    let total = 0;
  for (const id in cart) {
    total += cart[id].price * cart[id].quantity;
  }

  const cartAmtEl = document.getElementById("cart-amount");
  if (!cartAmtEl) {
    console.warn("⏳ Retrying: #cart-amount not found yet, will retry in 500ms");
    setTimeout(updateCartDisplay, 500);
    return;
  }

  cartAmtEl.textContent = "₹" + total.toFixed(2);
  console.log("✅ cart-amount updated to:", cartAmtEl.textContent);

  localStorage.setItem("cartData", JSON.stringify(cart));
  localStorage.setItem("cartTotal", total.toFixed(2));
}

  document.querySelectorAll(".product-item").forEach(item => {
    const h3 = item.querySelector("h3");
    const priceEl = item.querySelector(".price");
    const img = item.querySelector("img");
    const qi = item.querySelector(".input-number");
    const plus = item.querySelector(".quantity-right-plus");
    const minus = item.querySelector(".quantity-left-minus");
    const btn = item.querySelector(".add-to-cart");

    if (!h3 || !priceEl || !qi || !btn) return;

    const title = h3.innerText.trim();
    const price = parseFloat(priceEl.innerText.replace(/[^\d.]/g, '')) || 0;
    const image = img?.src || "";
    const pid = title.toLowerCase().replace(/\s+/g, '-');

    qi.value = parseInt(qi.value) || 0;

    plus?.addEventListener("click", e => {
      e.preventDefault();
      qi.value = parseInt(qi.value) + 1;
      console.log("➕", title, qi.value);
    });

    minus?.addEventListener("click", e => {
      e.preventDefault();
      qi.value = Math.max(parseInt(qi.value) - 1, 0);
      console.log("➖", title, qi.value);
    });

    btn.addEventListener("click", e => {
      e.preventDefault(); // (if you're still using <a>, prevent reload)
      const q = parseInt(qi.value);
      if (isNaN(q) || q < 1) {
        alert("Please select quantity!");
        return;
      }

      if (cart[pid]) {
        cart[pid].quantity += q;
      } else {
        cart[pid] = { title, price, quantity: q, image };
      }

      console.log("🛍️ Cart after adding:", cart);
      updateCartDisplay();
    });
  });

  updateCartDisplay(); // On load
});






















// document.addEventListener("DOMContentLoaded", () => {
//   console.log("✅ cart.js loaded!");
  
//   // -------- CART LOGIC --------
//    console.log("✅ cart.js loaded!");
//   let cart = JSON.parse(localStorage.getItem("cartData"))||{};

//   function updateCartDisplay(){
//     console.log("🛒 updateCartDisplay started, cart:", cart);
//     let total = 0;
//     for(const id in cart) total += cart[id].price * cart[id].quantity;
//     const cartAmtEl = document.getElementById("cart-amount");
//     if(cartAmtEl) cartAmtEl.textContent = "₹" + total.toFixed(2);
//     localStorage.setItem("cartData", JSON.stringify(cart));
//     console.log("🛒 updateCartDisplay ended");
//   }

//   document.querySelectorAll('.product-item').forEach(item => {
//     const h3 = item.querySelector('h3'),
//           p = item.querySelector('.price'),
//           img = item.querySelector('img'),
//           qi = item.querySelector('.input-number'),
//           plus = item.querySelector('.quantity-right-plus'),
//           minus = item.querySelector('.quantity-left-minus'),
//           btn = item.querySelector('.add-to-cart');

//     if(!h3||!p||!qi||!btn) return;
//     const title = h3.innerText.trim(),
//           price = parseFloat(p.innerText.replace(/[^\d.]/g,''))||0,
//           image = img?.src||"",
//           pid = title.toLowerCase().replace(/\s+/g,'-');

//     qi.value = parseInt(qi.value)||0;

//     plus?.addEventListener('click',e=>{
//       e.preventDefault(); qi.value = parseInt(qi.value)+1;
//       console.log("➕", title, qi.value);
//     });

//     minus?.addEventListener('click',e=>{
//       e.preventDefault(); qi.value = Math.max(parseInt(qi.value)-1,0);
//       console.log("➖", title, qi.value);
//     });

//     btn.addEventListener('click', e=>{
//       e.preventDefault();
//       const q = parseInt(qi.value);
//       console.log("🧪 Add to Cart clicked:", title, q, pid);

//       if(isNaN(q)||q<1){ alert("Select qty!"); return; }

//       if(cart[pid]) cart[pid].quantity += q;
//       else cart[pid] = {title,price,quantity:q,image};

//       console.log("🛍️ Cart after adding:", cart);
//       updateCartDisplay();
//     });
//   });

//   updateCartDisplay();
// });