/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
const table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);

function loadCart() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  state.cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

// TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  let cartTable = document.getElementById('cart');
  let tbodyEl = cartTable.querySelector('tbody');
  tbodyEl.innerHTML = '';
}

// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {

  // TODO: Find the table body
  let tbodyEl = document.querySelector('#cart tbody');

  // TODO: Iterate over the items in the cart
  for (let item of state.cart.items){

    // TODO: Create a TR
    let trEl = document.createElement('tr');

    // TODO: Create a TD for the delete link, quantity,  and the item
    let tdLinkEl = document.createElement('td');
    let tdQtyEl = document.createElement('td');
    let tdItemEl = document.createElement('td');

    let delLinkEl = document.createElement('a');
    delLinkEl.href ='#';
    delLinkEl.setAttribute('data-cartitem',item.product)
    delLinkEl.textContent = 'Delete';
    tdLinkEl.appendChild(delLinkEl);

    tdQtyEl.textContent = item.quantity;
    console.log(item.quantity);

    tdItemEl.textContent = item.product;

    // TODO: Add the TR to the TBODY and each of the TD's to the TR
    tbodyEl.appendChild(trEl);
    trEl.appendChild(tdItemEl);
    trEl.appendChild(tdQtyEl);
    trEl.appendChild(delLinkEl);

  }
}

function removeItemFromCart(event) {

  // TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
  // console.log(event.target.getAttribute('data-cartitem'));
  let target = event.target.getAttribute('data-cartitem');
  state.cart.removeItem(target);
  // TODO: Save the cart back to local storage
  state.cart.saveToLocalStorage();
  // TODO: Re-draw the cart table
  renderCart();

}

// This will initialize the page and draw the cart on screen
renderCart();