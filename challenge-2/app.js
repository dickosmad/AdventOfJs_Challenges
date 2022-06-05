const menuItems = [
  {
    name: "French Fries with Ketchup",
    price: 2.23,
    image: "plate__french-fries.png",
    alt: "French Fries",
    count: 0,
  },
  {
    name: "Salmon and Vegetables",
    price: 5.12,
    image: "plate__salmon-vegetables.png",
    alt: "Salmon and Vegetables",
    count: 0,
  },
  {
    name: "Spaghetti Meat Sauce",
    price: 7.82,
    image: "plate__spaghetti-meat-sauce.png",
    alt: "Spaghetti with Meat Sauce",
    count: 0,
  },
  {
    name: "Bacon, Eggs, and Toast",
    price: 5.99,
    image: "plate__bacon-eggs.png",
    alt: "Bacon, Eggs, and Toast",
    count: 0,
  },
  {
    name: "Chicken Salad with Parmesan",
    price: 6.98,
    image: "plate__chicken-salad.png",
    alt: "Chicken Salad with Parmesan",
    count: 0,
  },
  {
    name: "Fish Sticks and Fries",
    price: 6.34,
    image: "plate__fish-sticks-fries.png",
    alt: "Fish Sticks and Fries",
    count: 0,
  },
];

const cartElement = document.querySelector(".cart");
const menuElement = document.querySelector("#menu-items");
let inCart = false;

function renderMenu() {
  menuItems.forEach((menuItem) => {
    const { name, price, image, alt } = menuItem;
    let inCart = cartItems.some((cartItem) => cartItem.name === name);
    console.log("line 54 incart", inCart);
    menuElement.innerHTML += `
      <li>
        <div class="plate">
          <img
            src="./images/${image}"
            alt="${alt}"
            class="plate"
          />
        </div>
        <div class="content">
          <p class="menu-item">${name}</p>
          <p class="price">$${price}</p>
          ${
            inCart
              ? `<button class="in-cart">
                <img src="./images/check.svg" alt="Check" />
                In Cart
              </button>`
              : `<button class="add" onclick="addToCart('${name}')">
                Add to Cart
              </button>`
          }
          
        </div>
      </li>
    `;
  });
}
let cartItems = [];
// Function to update the count of cart item
// it takes action which can be plus or minus
// If action is plus we increment the count of item
// If action is minus we decrement the count of item
function updateCartItemCount(action, name) {
  cartItems = cartItems.map((item) => {
    let count = item.count;

    if (item.name === name) {
      if (action === "plus") {
        count++;
      } else if (action === "minus") {
        count--;
      }
    }

    return {
      ...item,
      count,
    };
  });

  updateCart();
}

function addToCart(name) {
  if (cartItems.some((item) => item.name === name)) {
    // If Item is already there in cart we just update the count

    updateCartItemCount("plus", name);
  } else {
    // If item is not there in cart then we add it in cart and set initial count to 1
    const item = menuItems.find((item) => item.name === name);

    cartItems.push({
      ...item,
      count: 1,
    });
  }
  updateCart();
  renderMenu();
}

// Update the cart as we add items or remove items
// This will render the cart again according to latest array data
function updateCart() {
  renderCartItems();
  renderSubtotal();
}

function renderSubtotal() {
  let subtotal = cartItems.reduce(
    (total, cartItem) => cartItem.price * cartItem.count + total,
    0
  );
  let tax = 0.2 * subtotal;

  const totals = document.createElement("div");
  totals.classList.add("totals");
  totals.innerHTML = `
          <div class="line-item">
            <div class="label">Subtotal:</div>
            <div class="amount price subtotal">$${subtotal.toFixed(2)}</div>
          </div>
          <div class="line-item">
            <div class="label">Tax:</div>
            <div class="amount price tax">$${tax.toFixed(1)}</div>
          </div>
          <div class="line-item total">
            <div class="label">Total:</div>
            <div class="amount price total">$${(subtotal + tax).toFixed(
              2
            )} </div>
          </div>
       
  `;
  cartElement.appendChild(totals);
}

function renderCartItems() {
  cartElement.innerHTML = "";
  if (cartItems.length === 0) {
    // If there are no items in cart then we need to show empty cart message
    const emptyDivElement = document.createElement("div");
    emptyDivElement.classList.add("empty");
    const cartEmptyElement = document.createElement("h2");
    cartEmptyElement.textContent = "Your cart is empty.";

    const img = document.createElement("img");
    img.src =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9YRQ5z-WxYWQP6_s-Fc-ly_pS7-mFI_6cfQ&usqp=CAU";
    img.alt = "cart-empty";
    emptyDivElement.appendChild(img);
    emptyDivElement.appendChild(cartEmptyElement);

    cartElement.appendChild(emptyDivElement);
  } else {
    // If there are items in cart we need to render them
    const cartSummaryElement = document.createElement("ul");
    cartSummaryElement.classList.add("cart-summary");
    cartItems.forEach((cartItem) => {
      const { name, price, image, alt, count } = cartItem;
      let cartItemLi = `
      <li>
        <div class="plate">
          <img
            src="./images/${image}"
            alt="${alt}"
            class="plate"
          />
          <div class="quantity">${count}</div>
        </div>
        <div class="content">
          <p class="menu-item">${name}</p>
          <p class="price">${price}</p>
        </div>
        <div class="quantity__wrapper">
          <button class="decrease" onclick="updateCartItemCount('minus', '${name}')">
            <img src="./images/chevron.svg" />
          </button>
          <div class="quantity">${count}</div>
          <button class="increase" onclick="updateCartItemCount('plus', '${name}')">
            <img src="./images/chevron.svg" />
          </button>
        </div>
        <div class="subtotal">
          $${(price * count).toFixed(2)}
        </div>
      </li>
    `;
      if (count === 0) {
        cartItemLi = "";
      } else {
        cartSummaryElement.innerHTML += cartItemLi;
      }
    });
    cartElement.appendChild(cartSummaryElement);
  }
}

renderMenu();
renderCartItems();
