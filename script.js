addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCart = document.getElementById("empty-cart");
  const cartTotal = document.getElementById("cart-total");
  const totalPrice = document.getElementById("total-price");
  const checkoutBtn = document.getElementById("checkout-btn");

  let total;

  const products = [
    { id: 1, name: "Product 1", price: 9.99 },
    { id: 2, name: "Product 2", price: 19.99 },
    { id: 3, name: "Product 3", price: 29.99 },
  ];
  let cart = JSON.parse(localStorage.getItem("cartItems")) || [];

  function renderProductsList(product) {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
    <span> ${product.name} - $${product.price.toFixed(2)} </span>
    `;
    const button = document.createElement("button");
    button.textContent = "Add to Cart";
    productDiv.appendChild(button);
    productList.appendChild(productDiv);

    button.addEventListener("click", () => {
      cart.push(product);
      saveCart()
      renderCartList();
    });
  }

  products.forEach((product) => {
    renderProductsList(product);
  });
  renderCartList();

  function renderCartList() {
    cartItems.innerHTML = "";
    total = 0;

    if (cart.length > 0) {
      emptyCart.classList.add("hidden");
      cartTotal.classList.remove("hidden");
      cart.forEach((item, index) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cartProduct");
        cartItem.innerHTML = `
        ${item.name} - $${item.price.toFixed(2)}
        `;
        const cartItemDeleteBtn = document.createElement("button");
        cartItemDeleteBtn.textContent = "Delete Item";
        cartItem.appendChild(cartItemDeleteBtn);
        cartItems.appendChild(cartItem);
        total += item.price;

        cartItemDeleteBtn.addEventListener("click", () => {
          cart.splice(index, 1)
          saveCart()
          renderCartList()
        })
      });
      totalPrice.textContent = `$${total.toFixed(2)}`;
    } else {
      cartItems.innerHTML = "<p>Your cart is empty.</p>";
      cartTotal.classList.add("hidden");
    }
  }

  checkoutBtn.addEventListener("click", () => {
    alert(
      `Checked out successfully!\n\nTotal Items - ${cart.length}\nTotal amount: $${total.toFixed(2)}`,
    );
    cart.length = 0;
    saveCart()
    renderCartList();
  });

  function saveCart() {
    localStorage.setItem("cartItems", JSON.stringify(cart))
  }
});
