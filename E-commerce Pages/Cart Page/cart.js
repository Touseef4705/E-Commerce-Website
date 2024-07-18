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
    }
  });
  
  user_login.addEventListener("click", () => {
    window.location.href = "/User Login And Signup/Login/index.html";
  });
  
  user_logout.addEventListener("click", () => {
    signOut(auth).then(() => {
      alert("Sign-out successful.");
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
      querySnapshot.forEach((doc) => {
        const cartItem = doc.data();
        if (cartItem.buyerId === uid) {
          const cartItemDiv = document.createElement("div");
          cartItemDiv.classList.add("cart-item", "p-4", "bg-gray-100", "rounded-lg", "flex", "items-center", "justify-between");
  
          const itemDetailsDiv = document.createElement("div");
          itemDetailsDiv.classList.add("flex", "items-center");
  
          const itemImage = document.createElement("img");
          itemImage.src = cartItem.productImage1;
          itemImage.classList.add("w-16", "h-16", "rounded-lg", "mr-4");
  
          const itemInfoDiv = document.createElement("div");
  
          const itemTitle = document.createElement("h3");
          itemTitle.classList.add("text-lg", "font-bold");
          itemTitle.innerText = cartItem.productTitle;
  
          const itemAmount = document.createElement("p");
          itemAmount.classList.add("text-gray-600");
          itemAmount.innerText = `PKR: ${cartItem.productAmount}`;
  
          const quantityDiv = document.createElement("div");
          quantityDiv.classList.add("flex", "items-center", "mt-2");
  
          const quantityLabel = document.createElement("label");
          quantityLabel.classList.add("mr-2");
          quantityLabel.innerText = "Quantity:";
  
          const quantityInput = document.createElement("input");
          quantityInput.type = "number";
          quantityInput.min = "1";
          quantityInput.value = cartItem.quantity || "1";
          quantityInput.classList.add("w-16", "p-1", "border", "rounded");
  
          quantityDiv.appendChild(quantityLabel);
          quantityDiv.appendChild(quantityInput);
  
          itemInfoDiv.appendChild(itemTitle);
          itemInfoDiv.appendChild(itemAmount);
          itemInfoDiv.appendChild(quantityDiv);
  
          itemDetailsDiv.appendChild(itemImage);
          itemDetailsDiv.appendChild(itemInfoDiv);
  
          const removeButton = document.createElement("button");
          removeButton.classList.add("bg-red-500", "text-white", "px-4", "py-2", "rounded-lg", "hover:bg-red-700");
          removeButton.innerText = "Remove";
          removeButton.addEventListener("click", () => {
            removeCartItem(doc.id);
          });
  
          const orderButton = document.createElement("button");
          orderButton.classList.add("bg-green-500", "text-white", "px-4", "py-2", "rounded-lg", "hover:bg-green-700", "ml-2");
          orderButton.innerText = "Order";
          orderButton.addEventListener("click", () => {
            placeOrder(cartItem, doc.id, uid);
          });
  
          cartItemDiv.appendChild(itemDetailsDiv);
          cartItemDiv.appendChild(removeButton);
          cartItemDiv.appendChild(orderButton);
  
          cartItemsContainer.appendChild(cartItemDiv);
  
          quantityInput.addEventListener("change", () => {
            updateCartItemQuantity(doc.id, quantityInput.value, cartItem.productAmount);
          });
        }
      });
    }).catch((error) => {
      alert("Error loading cart items:", error);
    });
  }
  
  function updateCartItemQuantity(cartItemId, quantity, price) {
    const cartRef = doc(db, "cart", cartItemId);
    const updatedData = {
      quantity: quantity,
      totalAmount: quantity * price
    };
    updateDoc(cartRef, updatedData).then(() => {
      alert("Cart item quantity updated successfully!");
      location.reload();
    }).catch((error) => {
      alert("Error updating cart item quantity:", error);
    });
  }
  
  function removeCartItem(cartItemId) {
    const cartRef = doc(db, "cart", cartItemId);
    deleteDoc(cartRef).then(() => {
      alert("Cart item removed successfully!");
      location.reload();
    }).catch((error) => {
      alert("Error removing cart item:", error);
    });
  }
  
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
        alert("Order placed successfully!");
        location.reload();
      }).catch((error) => {
        alert("Error removing item from cart:", error);
      });
    }).catch((error) => {
      alert("Error placing order:", error);
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const checkoutButton = document.getElementById("checkoutButton");
    if (checkoutButton) {
      checkoutButton.addEventListener("click", () => {
        processCheckout();
      });
    }
  });
  
  function processCheckout() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const cartRef = collection(db, "cart");
        getDocs(cartRef).then((querySnapshot) => {
          const orderPromises = [];
          querySnapshot.forEach((doc) => {
            const cartItem = doc.data();
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
              orderPromises.push(deleteDoc(doc.ref)); // Remove item from cart after placing order
            }
          });
  
          Promise.all(orderPromises).then(() => {
            alert("Checkout successful! Your order has been placed.");
            location.reload();
          }).catch((error) => {
            alert("Error during checkout:", error);
          });
        }).catch((error) => {
          alert("Error processing checkout:", error);
        });
      } else {
        alert("You need to log in to checkout.");
      }
    });
  }
  