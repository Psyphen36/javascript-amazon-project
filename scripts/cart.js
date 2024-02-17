export const cart = [{
  productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity: 2,
}, {
  productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity: 1,
}];


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
        quantity: 1
      });
    }
    
    let cartQuantity = 0;
    cart.forEach(item => {
      cartQuantity += (item.quantity);
    });
    
    document.querySelector('.js-cart-quantity').textContent = cartQuantity;
    
    // ! create a message popUp("Added") when click on add to cart but right now it didn't work
    // setTimeout(() => {
      //   const addMessageElement = document.querySelectorAll('.js-added-message').forEach((message) => {
        
        //     console.log(message.dataset.showMessage.classList.add('js-message'))
        
        //   // message.classList.add('js-message');
        //   // });
        
        // }, 1000);
        
      });
    });
  }