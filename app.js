document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const cartIcon = document.querySelector('.cart-icon');
  const cartTab = document.querySelector('.cart-tab');
  const closeBtn = document.querySelector('.close-btn');
  const addToCartButtons = document.querySelectorAll('.order-card .btn');
  const cartValue = document.querySelector('.cart-value');
  const cartList = document.querySelector('.cart-list');
  const cartTotal = document.querySelector('.cart-total');

  let cartItems = [];

  // Toggle mobile menu
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('mobile-menu-active');
  });

  // Toggle cart tab
  cartIcon.addEventListener('click', (e) => {
    e.preventDefault();
    cartTab.classList.toggle('cart-tab-active');
  });

  // Close cart tab
  closeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    cartTab.classList.remove('cart-tab-active');
  });

  // Add item to cart and update UI
  addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();

      const card = button.closest('.order-card');
      const itemName = card.querySelector('h4').textContent.trim();
      const itemPriceText = card.querySelector('.price').textContent.trim();
      const itemImgSrc = card.querySelector('img').src;

      // Parse price number from string like "$10.00"
      const itemPrice = parseFloat(itemPriceText.replace('$', ''));

      // Add item to cart array
      cartItems.push({ name: itemName, price: itemPrice, img: itemImgSrc });

      // Update cart count
      cartValue.textContent = cartItems.length;

      // Update cart list UI and total
      renderCartItems();
      updateCartTotal();
    });
  });

  // Function to render all cart items inside cart list
  function renderCartItems() {
    cartList.innerHTML = ''; // Clear current list

    cartItems.forEach(item => {
      const itemEl = document.createElement('div');
      itemEl.classList.add('item');
      itemEl.innerHTML = `
        <div class="item-image"><img src="${item.img}" alt="${item.name}"></div>
        <div class="detail">
          <h4>${item.name}</h4>
          <h4 class="item-total">$${item.price.toFixed(2)}</h4>
        </div>
      `;
      cartList.appendChild(itemEl);
    });
  }

  // Function to update total price display
  function updateCartTotal() {
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;
  }
});
