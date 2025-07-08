document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("wishlist-container");
  const wishlist = JSON.parse(localStorage.getItem("wishlistData")) || {};
  let cart = JSON.parse(localStorage.getItem("cartData")) || {};

  if (!container) return;

  if (Object.keys(wishlist).length === 0) {
    container.innerHTML = `<p class="text-muted">Your wishlist is empty.</p>`;
    return;
  }

  for (const id in wishlist) {
    const item = wishlist[id];

    const card = document.createElement("div");
    card.className = "col-md-4 mb-4";

    card.innerHTML = `
      <div class="card h-100 shadow-sm">
        <a href="#" class="product-trigger" 
           data-title="${item.title}" 
           data-description="No description available." 
           data-image="${item.image}">
          <img src="${item.image}" class="card-img-top" alt="${item.title}">
        </a>
        <div class="card-body">
          <h5 class="card-title">
            <a href="#" class="product-trigger"
               data-title="${item.title}" 
               data-description="No description available." 
               data-image="${item.image}">
               ${item.title}
            </a>
          </h5>
          <p class="card-text">Price: ₹${item.price.toFixed(2)}</p>
          <div class="input-group mb-2">
            <button class="btn btn-outline-danger quantity-left-minus">-</button>
            <input type="text" class="form-control input-number text-center" value="1" min="1" style="max-width: 60px;">
            <button class="btn btn-outline-success quantity-right-plus">+</button>
          </div>
          <button class="btn btn-primary add-to-cart" data-id="${id}">Add to Cart</button>
          <button class="btn btn-danger remove-wishlist mt-2" data-id="${id}">Remove</button>
        </div>
      </div>
    `;

    container.appendChild(card);
  }

  // Quantity +/- handling
  container.addEventListener("click", (e) => {
    const card = e.target.closest(".card-body");
    if (!card) return;

    const input = card.querySelector(".input-number");
    let current = parseInt(input.value) || 1;

    if (e.target.classList.contains("quantity-right-plus")) {
      input.value = current + 1;
    } else if (e.target.classList.contains("quantity-left-minus")) {
      input.value = Math.max(current - 1, 1);
    }
  });

  // Add to cart functionality
  container.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart")) {
      const id = e.target.dataset.id;
      const item = wishlist[id];
      const card = e.target.closest(".card-body");
      const input = card.querySelector(".input-number");
      const quantity = parseInt(input.value);

      if (!quantity || quantity < 1) {
        alert("Please enter valid quantity");
        return;
      }

      const pid = item.title.toLowerCase().replace(/\s+/g, "-");

      if (cart[pid]) {
        cart[pid].quantity += quantity;
      } else {
        cart[pid] = {
          title: item.title,
          price: item.price,
          quantity: quantity,
          image: item.image
        };
      }

      localStorage.setItem("cartData", JSON.stringify(cart));

      // Update total
      const total = Object.values(cart).reduce((sum, i) => sum + i.price * i.quantity, 0);
      localStorage.setItem("cartTotal", total.toFixed(2));

      // Update header cart amount
      const cartAmtEl = document.getElementById("cart-amount");
      if (cartAmtEl) {
        cartAmtEl.textContent = "₹" + total.toFixed(2);
      }

      console.log("✅ Added to cart from wishlist:", cart);
      alert(`Added ${quantity} item(s) of ${item.title} to cart`);
    }
  });

  // Remove from wishlist
  container.addEventListener("click", function (e) {
    if (e.target.classList.contains("remove-wishlist")) {
      const id = e.target.dataset.id;
      delete wishlist[id];
      localStorage.setItem("wishlistData", JSON.stringify(wishlist));
      e.target.closest(".col-md-4").remove();

      if (Object.keys(wishlist).length === 0) {
        container.innerHTML = `<p class="text-muted">Your wishlist is empty.</p>`;
      }
    }
  });
});













// document.addEventListener("DOMContentLoaded", () => {
//   const container = document.getElementById("wishlist-container");
//   const wishlist = JSON.parse(localStorage.getItem("wishlistData")) || {};

//   if (!container) return;

//   if (Object.keys(wishlist).length === 0) {
//     container.innerHTML = `<p class="text-muted">Your wishlist is empty.</p>`;
//     return;
//   }

//   for (const id in wishlist) {
//     const item = wishlist[id];

//     const card = document.createElement("div");
//     card.className = "col-md-4 mb-4";

//    card.innerHTML = `
//   <div class="card h-100 shadow-sm">
//     <a href="#" class="product-trigger" 
//        data-title="${item.title}" 
//        data-description="No description available." 
//        data-image="${item.image}">
//       <img src="${item.image}" class="card-img-top" alt="${item.title}">
//     </a>
//     <div class="card-body">
//       <h5 class="card-title">
//         <a href="#" class="product-trigger"
//            data-title="${item.title}" 
//            data-description="No description available." 
//            data-image="${item.image}">
//            ${item.title}
//         </a>
//       </h5>
//       <p class="card-text">Price: ₹${item.price.toFixed(2)}</p>
//       <button class="btn btn-danger remove-wishlist" data-id="${id}">Remove</button>
//     </div>
//   </div>
// `;

//     container.appendChild(card);
//   }

//   // Remove from wishlist functionality
//   container.addEventListener("click", function (e) {
//     if (e.target.classList.contains("remove-wishlist")) {
//       const id = e.target.dataset.id;
//       delete wishlist[id];
//       localStorage.setItem("wishlistData", JSON.stringify(wishlist));
//       e.target.closest(".col-md-4").remove();

//       if (Object.keys(wishlist).length === 0) {
//         container.innerHTML = `<p class="text-muted">Your wishlist is empty.</p>`;
//       }
//     }
//   });
// });

// const popup = document.getElementById("product-popup");
// const popupTitle = document.getElementById("popup-title");
// const popupDesc = document.getElementById("popup-desc");
// const popupImg = document.getElementById("popup-image");

// document.addEventListener("click", function (e) {
//   const trigger = e.target.closest(".product-trigger");
  
//   if (trigger) {
//     e.preventDefault();

//     const title = trigger.dataset.title;
//     const desc = trigger.dataset.description;
//     const image = trigger.dataset.image;

//     popupTitle.textContent = title;
//     popupDesc.textContent = desc;
//     popupImg.src = image;

//     const rect = trigger.getBoundingClientRect();
//     popup.style.top = (window.scrollY + rect.bottom + 10) + "px";
//     popup.style.left = rect.left + "px";
//     popup.style.display = "block";
//   } else if (!popup.contains(e.target)) {
//     popup.style.display = "none";
//   }
// });