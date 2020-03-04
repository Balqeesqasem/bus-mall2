/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
var cart = new Cart([]);

// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {
  //TODO: Add an <option> tag inside the form's select for each product
  var selectElement = document.getElementById('items');
  var option;
  for (var i in Product.allProducts) {
    // console.log(Product.allProducts[i])
    option = document.createElement('option');
    option.setAttribute('value', Product.allProducts[i].name);
    option.textContent = Product.allProducts[i].name;
    selectElement.appendChild(option);
  }
}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {
  if(!event.target.quantity.value){
    alert('please fill all the inputs')
    return
  }
  // TODO: Prevent the page from reloading
  event.preventDefault();

  // Do all the things ...
  addSelectedItemToCart(event.target);
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();
  // document.getElementById('quantity').value = ''
}

// TODO: Add the selected item and quantity to the cart
function addSelectedItemToCart(item) {
  // TODO: suss out the item picked from the select list
  var name = item.items.value
  // TODO: get the quantity
  var numbers = item.quantity.value
  // TODO: using those, add one item to the Cart
  cart.addItem(name,numbers)
}

// TODO: Update the cart count in the header nav with the number of items in the Cart
function updateCounter() {
  var old = 0
  if(localStorage.cart){
    old+= JSON.parse(localStorage.cart).length
  }
  document.getElementById('itemCount').textContent = `  ${cart.items.length + old}`
}

// TODO: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
  // TODO: Get the item and quantity from the form
  var item = cart.items[cart.items.length -1 ]
  var name =item.product
  var number = item.quantity 
  // TODO: Add a new element to the cartContents div with that information
  var p = document.createElement('p')
  p.textContent = `you have ${number} from ${name}`
  document.getElementById('cartContents').appendChild(p)
}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
var catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
updateCounter()
