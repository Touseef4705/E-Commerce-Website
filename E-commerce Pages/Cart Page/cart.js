import {
    auth,
    onAuthStateChanged,
    signOut,
    doc,
    getDoc,
    setDoc,
    db,
    getDocs,
    collection,
    updateDoc,
    deleteDoc,
  } from "../../Utils/utils.js";

import {showSuccess} from "../../Utils/success.js"
import {showError} from "../../Utils/error.js"
  
  const user_logout = document.getElementById("user_logout");
  const user_login = document.getElementById("user_login");
  const nav_disable = document.querySelectorAll("nav_disable");
  const userDp = document.getElementById("userDp");
  const myProducts = document.getElementById("myProducts");
  const addToCartButton = document.querySelector(".bg-blue-600.text-white.px-6.py-3.rounded-lg.hover\\:bg-blue-800");
  
  // Mobile Nav Element
  const side_navbar = document.getElementById("side_navbar");
  const side_menu_open = document.getElementById("side_menu_open");
  const side_menu_close = document.getElementById("side_menu_close");
  
  const profilePage = document.getElementById("profilePage");
  const disableProfilePage = document.getElementById("disableProfilePage");
  
  window.sideBarOpen = sideBarOpen;
  window.sideBarClose = sideBarClose;
  
  function sideBarOpen() {
    side_menu_open.style.display = "none";
    side_navbar.style.display = "block";
    side_menu_close.style.display = "block";
  }
  
  function sideBarClose() {
    side_menu_close.style.display = "none";
    side_navbar.style.display = "none";
    side_menu_open.style.display = "block";
  }
  
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      getUserInfo(uid);
      user_logout.style.display = "inline-block";
      user_login.style.display = "none";
      nav_disable.disable = false;
      myProducts.style.display = "inline-block";
      profilePage.style.display = "flex";
      disableProfilePage.style.display = "none";
      loadCartItems(uid);
    } else {
      user_logout.style.display = "none";
      myProducts.style.display = "none";
      profilePage.style.display = "none";
      disableProfilePage.style.display = "inline-block";
      user_login.style.display = "inline-block";
      console.log("User is signed out");
      showError("You need to log in to view your cart.");
    }
  });
  
  user_login.addEventListener("click", () => {
    window.location.href = "/User Login And Signup/Login/index.html";
  });
  
  user_logout.addEventListener("click", () => {
    signOut(auth).then(() => {
      showSuccess("Sign-out successful.");
    }).catch((error) => {
      console.log(error);
    });
  });
  
  function getUserInfo(uid) {
    const docRef = doc(db, "users", uid);
    getDoc(docRef).then((data) => {
        userDp.src = data.data().user_dp_input;
    });
}

function loadCartItems(uid) {
    const cartRef = collection(db, "cart");
    getDocs(cartRef).then((querySnapshot) => {
        const cartItemsContainer = document.getElementById("cartItems");
        let cartHtml = `
        <section class="h-full">
            <div class="container mx-auto py-5 h-full">
                <div class="flex justify-center items-center h-full">
                    <div class="w-10/12">
                        <div class="flex justify-between items-center mb-4">
                            
                        </div>`;

        querySnapshot.forEach((doc) => {
            const cartItem = doc.data();
            if (cartItem.buyerId === uid) {
              cartHtml += `
              <div id="cartItem-${doc.id}" class="bg-white rounded-lg shadow mb-4">
                  <div class="p-4">
                      <div class="flex flex-wrap md:flex-nowrap overflow-auto justify-between items-center">
                          <div class="w-full md:w-1/5 mb-4 md:mb-0">
                              <img src="${cartItem.productImage1}" class="w-full rounded-lg" alt="${cartItem.productTitle}">
                          </div>
                          <div class="w-full md:w-1/4 mb-4 md:mb-0 text-center md:text-left">
                              <p class="font-normal mb-2">${cartItem.productTitle}</p>
                              <p><span class="text-gray-600">Amount:</span> $ ${cartItem.productAmount}</p>
                          </div>
                          <div class="flex justify-center md:justify-start items-center w-full md:w-1/5 mb-4 md:mb-0">
                              <input id="quantity-${doc.id}" min="1" name="quantity" value="${cartItem.quantity || 1}" type="number"
                                  class="form-input border border-gray-200 rounded-md form-input-sm w-16 mx-2 text-center"
                                  onchange="updateCartItemQuantity('${doc.id}', this.value, ${cartItem.productAmount})"/>
                          </div>
                          <div class="w-full md:w-1/5 mb-4 md:mb-0 text-center">
                              <h5 id="totalAmount-${doc.id}" class="mb-0">$ ${cartItem.productAmount * (cartItem.quantity || 1)}</h5>
                          </div>
                          <div class="w-full md:w-1/12 text-center md:text-right">
                              <a href="#!" class="text-red-500" onclick="removeCartItem('${doc.id}')"><i class="fas fa-trash fa-lg"></i></a>
                          </div>
                      </div>
                  </div>
              </div>
          `;
          
            }
        });

      

        cartItemsContainer.innerHTML = cartHtml;
    }).catch((error) => {
        showError("Error loading cart items: " + error);
    });
}

window.updateCartItemQuantity = updateCartItemQuantity
function updateCartItemQuantity(cartItemId, quantity, price) {
    const cartRef = doc(db, "cart", cartItemId);
    const updatedData = {
        quantity: quantity,
        totalAmount: quantity * price
    };

    updateDoc(cartRef, updatedData).then(() => {
        const totalAmountElement = document.querySelector(`#totalAmount-${cartItemId}`);
        totalAmountElement.textContent = `$ ${quantity * price}`;
    }).catch((error) => {
        showError("Error updating cart item quantity:", error);
    });
}

window.removeCartItem = removeCartItem
function removeCartItem(cartItemId) {
    const cartRef = doc(db, "cart", cartItemId);
    deleteDoc(cartRef).then(() => {
        showSuccess("Cart item removed successfully!");
        const cartItemElement = document.getElementById(`cartItem-${cartItemId}`);
        if (cartItemElement) {
            cartItemElement.remove();
        }
    }).catch((error) => {
        showError("Error removing cart item:", error);
    });
}

window.placeOrder = placeOrder
function placeOrder(cartItem, cartItemId, uid) {
    const orderData = {
        productId: cartItem.productId,
        buyerId: uid,
        productTitle: cartItem.productTitle,
        productAmount: cartItem.productAmount,
        productDesc: cartItem.productDesc,
        productImage1: cartItem.productImage1,
        quantity: cartItem.quantity || 1,
        totalAmount: cartItem.totalAmount || cartItem.productAmount,
        timestamp: new Date()
    };
    const orderRef = doc(db, "orders", `${cartItem.productId}_${uid}`);
    setDoc(orderRef, orderData).then(() => {
        deleteDoc(doc(db, "cart", cartItemId)).then(() => {
            showSuccess("Order placed successfully!");
            location.reload();
        }).catch((error) => {
            showError("Error removing item from cart:", error);
        });
    }).catch((error) => {
        showError("Error placing order:", error);
    });
}

document.addEventListener('DOMContentLoaded', () => {
  const checkoutButton = document.getElementById("checkoutButton");
  if (checkoutButton) {
      checkoutButton.addEventListener("click", () => {
          processCheckout();
      });
  } else {
      console.error("Sorry, checkout button not found.");
  }
});

function processCheckout() {
  onAuthStateChanged(auth, (user) => {
      if (user) {
          const uid = user.uid;
          const cartRef = collection(db, "cart");
          getDocs(cartRef).then((querySnapshot) => {
              const orderPromises = [];
              querySnapshot.forEach((docSnapshot) => {
                  const cartItem = docSnapshot.data();
                  if (cartItem.buyerId === uid) {
                      const orderData = {
                          productId: cartItem.productId,
                          buyerId: uid,
                          productTitle: cartItem.productTitle,
                          productAmount: cartItem.productAmount,
                          productDesc: cartItem.productDesc,
                          productImage1: cartItem.productImage1,
                          quantity: cartItem.quantity || 1,
                          totalAmount: cartItem.totalAmount || cartItem.productAmount,
                          timestamp: new Date()
                      };
                      const orderRef = doc(db, "orders", `${cartItem.productId}_${uid}`);
                      orderPromises.push(setDoc(orderRef, orderData));
                      orderPromises.push(deleteDoc(doc(db, "cart", docSnapshot.id))); // Corrected document reference
                  }
              });

              Promise.all(orderPromises).then(() => {
                  showSuccess("Checkout successful! Your order has been placed.");
                  location.reload();
              }).catch((error) => {
                  showError("Error during checkout: " + error.message);
                  console.error(error);
              });
          }).catch((error) => {
              showError("Error processing checkout: " + error.message);
              console.error(error);
          });
      } else {
          showError("You need to log in to checkout.");
      }
  });
}
