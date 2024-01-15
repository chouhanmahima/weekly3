document.addEventListener('DOMContentLoaded', function () {
    const Products = [
      { id: 1, name: 'Product-1', price: 100 },
      { id: 2, name: 'Product-2', price: 200 },
      { id: 3, name: 'Product-3', price: 300 },
    ];
  
    const productList = document.getElementById('productList');
    const cartList = document.getElementById('cartList');
    const cartTotal = document.getElementById('cartTotal');
  
    let cart = [];
  
    // Initialize product list
    Products.forEach(product => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `${product.name} - $${product.price} <button onclick="addToCart(${product.id})">Add to Cart</button>`;
      productList.appendChild(listItem);
    });
  
    // Update cart UI
    function updateCart() {
      cartList.innerHTML = '';
      let total = 0;
  
      cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${item.product.name} - Quantity: ${item.quantity} - Total: $${item.total} <button onclick="removeFromCart(${item.product.id})">Remove</button>`;
        cartList.appendChild(listItem);
  
        total += item.total;
      });
  
      cartTotal.textContent = `Total: $${total}`;
    
    }

  
    // Add product to cart
    window.addToCart = function (productId) {
      const product = Products.find(p => p.id === productId);
      const cartItem = cart.find(item => item.product.id === productId);
  
      if (cartItem) {
        cartItem.quantity++;
        cartItem.total = cartItem.quantity * product.price;
      } else {
        cart.push({ product, quantity: 1, total: product.price });
      }
  
      updateCart();
    };
  
    // Remove product from cart
    window.removeFromCart = function (productId) {
      const index = cart.findIndex(item => item.product.id === productId);
  
      if (index !== -1) {
        const cartItem = cart[index];
  
        if (cartItem.quantity === 1) {
          cart.splice(index, 1);
        } else {
          cartItem.quantity--;
          cartItem.total = cartItem.quantity * cartItem.product.price;
        }
  
        updateCart();
      }
    };
  });
  