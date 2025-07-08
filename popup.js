 document.addEventListener("DOMContentLoaded", function () {
  const popup = document.getElementById("product-popup");
  const popupTitle = document.getElementById("popup-title");
  const popupDesc = document.getElementById("popup-desc");
  const popupImg = document.getElementById("popup-image");

  document.querySelectorAll('.product-trigger').forEach(trigger => {
    trigger.addEventListener('click', function (e) {
      e.preventDefault();

      // If user clicks on <img>, e.target will be the image
      const target = e.currentTarget;

      const title = target.dataset.title;
      const desc = target.dataset.description;
      const image = target.dataset.image;

      popupTitle.textContent = title;
      popupDesc.textContent = desc;
      popupImg.src = image;

      const rect = target.getBoundingClientRect();
      popup.style.top = (window.scrollY + rect.bottom + 10) + "px";
      popup.style.left = rect.left + "px";
      popup.style.display = "block";
    });
  });

  document.addEventListener("click", function (e) {
    if (!popup.contains(e.target) && !e.target.closest(".product-trigger")) {
      popup.style.display = "none";
    }
  });
});

  document.getElementById("categorySelect").addEventListener("change", function () {
    const selectedPage = this.value;
    if (selectedPage) {
      window.location.href = selectedPage;
    }
  });