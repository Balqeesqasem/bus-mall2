/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
var table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
var cart;

function loadCart() {
  var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

// TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  document.getElementsByTagName('tbody')[0].innerHTML=''
}

// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {

  // TODO: Find the table body
  var tbody = document.getElementsByTagName('tbody')[0]
  var tr;
  var td;
  var p;
  // TODO: Iterate over the items in the cart
  for (let index = 0; index < cart.items.length; index++) {
     // TODO: Create a TR
     tr = document.createElement('tr')
    // TODO: Create a TD for the delete link, quantity,  and the item
    var a = document.createElement('a')
    a.setAttribute('id',`${index}`)
    a.setAttribute('href',`javascript:removeItemFromCart()`)
   var delet= document.createElement('i')
   delet.setAttribute('class','fas fa-trash-alt')
    a.appendChild(delet)   
    td = document.createElement('td').appendChild(a)
    tr.appendChild(td)
    td = document.createElement('td')
    p = document.createElement('p')
    p.textContent = cart.items[index].quantity
    td.appendChild(p)
    tr.appendChild(td)
    td = document.createElement('td')
    p = document.createElement('p')
    p.textContent = cart.items[index].product
    td.appendChild(p)
    tr.appendChild(td)
    tbody.appendChild(tr)
    
    // TODO: Add the TR to the TBODY and each of the TD's to the TR
  }

}


function removeItemFromCart(event) {
// console.log(event.target)
  // TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
  cart.removeItem(event)
  // TODO: Save the cart back to local storage
  localStorage.cart = JSON.stringify(cart.items)
  // TODO: Re-draw the cart table
     renderCart()
}

// This will initialize the page and draw the cart on screen
renderCart();
