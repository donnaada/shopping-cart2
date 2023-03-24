/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
state.cart = new Cart([]);
// state.cart = localStorage.cart ? new Cart(JSON.parse(localStorage.cart)) : new Cart([]);

// On screen load, we call this method to put all of the product options
// (the things in the state.allProducts array) into the drop down list.
function populateForm() {

  //TODO: Add an <option> tag inside the form's select for each product
  const selectElement = document.getElementById('items');
  for (let i in state.allProducts) {
    let product = state.allProducts[i];
    let productOption = document.createElement('option');
    productOption.value = product.name;
    productOption.textContent = product.name;
    selectElement.appendChild(productOption);
  }
}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {

  // TODO: Prevent the page from reloading
  event.preventDefault();

  // Do all the things ...
  addSelectedItemToCart();
  state.cart.saveToLocalStorage();
  state.cart.updateCounter();
  updateCartPreview();

}

// TODO: Add the selected item and quantity to the cart
function addSelectedItemToCart() {
  // TODO: suss out the item picked from the select list
  let itemPicked = document.getElementById('items').value;

  // TODO: get the quantity
  let qty = document.getElementById('quantity').value;

  // TODO: using those, add one item to the Cart
  state.cart.addItem(itemPicked, qty);
}

// TODO: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
  // TODO: Get the item and quantity from the form
  let item = document.getElementById('items').value;
  let qty = document.getElementById('quantity').value;

  // TODO: Add a new element to the cartContents div with that information
  let divEl = document.getElementById('cartContents');
  let pEl = document.createElement('p');
  divEl.appendChild(pEl);
  pEl.innerHTML=`
    <span>Item: ${item}</span> 
    <span style="margin-left: 5px;">Quantity: ${qty}</span>
  `;
}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
const catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();