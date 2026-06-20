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
  let cart = [];

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
      renderCartList();
    });
  }

  products.forEach((product) => {
    renderProductsList(product);
  });

  function renderCartList() {
    cartItems.innerHTML = "";
    total = 0;

    if (cart.length > 0) {
      emptyCart.classList.add("hidden");
      cartTotal.classList.remove("hidden");
      cart.forEach((item) => {
        const cartItem = document.createElement("div");
        cartItem.innerHTML = `
        ${item.name} - $${item.price.toFixed(2)}
        `;
        cartItems.appendChild(cartItem);
        total += item.price;
      });
      totalPrice.innerHTML = `$${total.toFixed(2)}`;
    } else {
      cartItems.innerHTML = "<p>Your cart is empty.</p>";
      cartTotal.classList.add("hidden");
    }
  }

  checkoutBtn.addEventListener("click", () => {
    alert(`Checked out successfully!\n\nTotal Items - ${cart.length}\nTotal amount: $${total.toFixed(2)}`);
    cart = [];
    renderCartList();
  });
});
