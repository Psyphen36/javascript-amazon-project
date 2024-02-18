import { cart, removeCart, checkoutItem, updateDeliveryOption } from "../scripts/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions } from "./deliverOptions.js";

let cartSummaryHTML = '';
cart.forEach(cartItem => {
  const productId = cartItem.productId;
  
  let matchingProduct;
  
  products.forEach(product => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  
  let cartQuantity = 0;
  cart.forEach(item => {
    cartQuantity += (item.quantity);
  });
  

  const deliveryOptionId = cartItem.deliveryOptionId;
  
  let deliveryOption;
  deliveryOptions.forEach(options => {
    if (options.id === deliveryOptionId) {
      deliveryOption = options;
    }
  });
  console.log('Consoling deliveryOption.deliveryDays:',deliveryOption.deliveryDays);
  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
  const dateString = deliveryDate.format('dddd, MMMM, D');
  
    cartSummaryHTML += `<div class="cart-item-container js-cart-container js-cart-container-${matchingProduct.id}">
    <div class="delivery-date">
    Delivery date: ${dateString}
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchingProduct.image}">

      <div class="cart-item-details">
        <div class="product-name">
        ${matchingProduct.name}
        </div>
        <div class="product-price">
          $${formatCurrency(matchingProduct.priceCents)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary">
            Update
          </span>
          <span class="delete-quantity-link link-primary js-delete-quantity"
          data-product-id="${matchingProduct.id}">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose delivery option:
        </div>
        ${deliveryOptionsHTML(cartItem, matchingProduct)}
      </div>
    </div>
  </div>`;
  checkoutItem(cartQuantity);
});


function deliveryOptionsHTML(cartItem, matchingProduct) {
  let html = '';
  deliveryOptions.forEach(options => {
    // const deliveryOptionsId = cartItem.id;
    const today = dayjs();
    const deliveryDate = today.add(options.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM, D');
    
    const priceString = options.priceCents === 0 ? 'Free': `$${formatCurrency(options.priceCents)}`;
    const isChecked = options.id === cartItem.deliveryOptionId
    
    // if (options.id === deliveryOptionsId) {
      // }
      
      html += `
      <div class="delivery-option js-delivery-option"
      data-Product-id="${matchingProduct.id}"
      data-delivery-option-id="${options.id}">
      <input type="radio"
      ${isChecked ? 'checked':''}
      class="delivery-option-input"
      name="delivery-option-${matchingProduct.id}">
      <div>
      <div class="delivery-option-date">
      ${dateString}
      </div>
      <div class="delivery-option-price">
      ${priceString}
      </div>
      </div>
      </div>`
    });
    return html;
  }
  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
  
  document.querySelectorAll('.js-delete-quantity').forEach(delButton => {
    delButton.addEventListener('click', () => {
      const productId = delButton.dataset.productId;
    console.log('delete');
    // console.log(productId);
    removeCart(productId);
    
    const cartElement = document.querySelector(`.js-cart-container-${productId}`)
    
    cartElement.remove();
  })
});

document.querySelectorAll('.js-delivery-option').forEach(element => {
  element.addEventListener('click', () => {
    const {productId, deliveryOptionId} = element.dataset;
    console.log('Consoling productId and deliveryOptionId', productId, deliveryOptionId);
    updateDeliveryOption(productId, deliveryOptionId);
  })
})