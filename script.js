let cart = [];


/* Add product to cart */

function addToCart(name, price) {

    let existingProduct = cart.find(
        product => product.name === name
    );

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }

    updateCart();

    alert(name + " added to cart!");
}


/* Update cart */

function updateCart() {

    let cartItems = document.getElementById("cartItems");

    let cartCount = 0;
    let total = 0;

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p>Your cart is empty.</p>";

    }

    cart.forEach((product, index) => {

        let itemTotal =
            product.price * product.quantity;

        total += itemTotal;
        cartCount += product.quantity;

        cartItems.innerHTML += `

            <div class="cart-item">

                <div>
                    <strong>${product.name}</strong>
                    <br>
                    ₹${product.price}
                </div>

                <div class="quantity">

                    <button onclick="decreaseQuantity(${index})">
                        -
                    </button>

                    ${product.quantity}

                    <button onclick="increaseQuantity(${index})">
                        +
                    </button>

                </div>

                <div>
                    ₹${itemTotal}
                </div>

                <button
                    class="remove-btn"
                    onclick="removeFromCart(${index})">
                    Remove
                </button>

            </div>

        `;
    });

    document.getElementById("cartCount").innerText =
        cartCount;

    document.getElementById("cartTotal").innerText =
        total.toLocaleString("en-IN");
}


/* Increase quantity */

function increaseQuantity(index) {

    cart[index].quantity++;

    updateCart();
}


/* Decrease quantity */

function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }

    updateCart();
}


/* Remove product */

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();
}


/* Search products */

function searchProducts() {

    let search =
        document
        .getElementById("searchBox")
        .value
        .toLowerCase();

    let products =
        document.querySelectorAll(".product");

    products.forEach(product => {

        let name =
            product
            .dataset
            .name
            .toLowerCase();

        if (name.includes(search)) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });
}


/* Filter category */

function filterCategory(category) {

    let products =
        document.querySelectorAll(".product");

    products.forEach(product => {

        if (
            category === "all" ||
            product.dataset.category === category
        ) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });
}


/* Show cart */

function showCart() {

    document
        .getElementById("cart")
        .scrollIntoView({
            behavior: "smooth"
        });
}


/* Checkout */

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }

    alert(
        "Order placed successfully! Thank you for shopping with SmartShop."
    );

    cart = [];

    updateCart();
}


/* Initial cart */

updateCart();