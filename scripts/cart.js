export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {  
  cart = [{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
    deliveryOptionId: '1'
  }, {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
    deliveryOptionId: '2'
  }];
};

function saveCartData() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

let cartQuantityElement = document.querySelector('.js-cart-quantity');
export function addCart() {
  document.querySelectorAll('.js-addCart').forEach((buttons) => {
    buttons.addEventListener('click', () => {
    const productId = buttons.dataset.productId;
    let matchingItem;
    // console.log(cartsSelectQuantity);
    cart.forEach(item => {
      if (productId === item.productId) {
        matchingItem = item;
      }
    });
    
    if (matchingItem) {
      matchingItem.quantity++;
    } else{
      cart.push({
        productId: productId,
        quantity: 1,
        deliveryOptionId: '1'
      });
    }
    
    let cartQuantity = 0;
    cart.forEach(item => {
      cartQuantity += (item.quantity);
    });
    

    cartQuantityElement.textContent = cartQuantity;

    saveCartData();

    // ! create a message popUp("Added") when click on add to cart but right now it didn't work
    // setTimeout(() => {
    //     const addMessageElement = document.querySelectorAll('.js-added-message').forEach((message) => {
        
    //         console.log(message.dataset.showMessage.classList.add('js-message'))
        
    //       // message.classList.add('js-message');
    //       // });
        
    //     }, 1000);
        
      });
    });
  }

export function removeCart(productId) {
  const newCart = [];

  cart.forEach(cartItem => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart
  console.log(cart);
  saveCartData();
}

export function checkoutItem(cartQuantity) {
  const checkoutItem = document.querySelector('.js-checkout-item')
  checkoutItem.textContent = cartQuantity + ' items';
}

export function updateDeliveryOption(productId, deliveryOptionId) {

  let matchingItem;

  cart.forEach(item => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  });
  matchingItem.deliveryOptionId = deliveryOptionId;

  saveCartData();
}