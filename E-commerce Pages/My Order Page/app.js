import {
  auth,
  onAuthStateChanged,
  signOut,
  doc,
  getDoc,
  getDocs,
  db,
  deleteDoc,
  collection,
} from "../../Utils/utils.js";

import{showSuccess}from "../../Utils/success.js"
import{showError}from "../../Utils/error.js"

const user_logout = document.getElementById("user_logout");
const user_login = document.getElementById("user_login");
const nav_disable = document.querySelectorAll("nav_disable");
const userDp = document.getElementById("userDp");
const myProducts = document.getElementById("myProducts");

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
    loadOrders(uid);
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

function loadOrders(uid) {
  const ordersRef = collection(db, "orders");
  getDocs(ordersRef).then((querySnapshot) => {
    const ordersContainer = document.getElementById("orders");
    querySnapshot.forEach((doc) => {
      const order = doc.data();
      if (order.buyerId === uid) {
        const orderDiv = document.createElement("div");
        orderDiv.classList.add("order-item", "p-4", "bg-gray-900", "rounded-lg", "shadow-lg", "flex", "items-center", "justify-between", "hover:shadow-xl", "transition-shadow", "duration-300", "mb-4", "flex-col", "md:flex-row"); // Changed to allow wrapping on smaller screens

        const itemDetailsDiv = document.createElement("div");
        itemDetailsDiv.classList.add("flex", "items-center", "w-full", "mb-2", "md:mb-0"); // Added width and margin for responsiveness

        const itemImage = document.createElement("img");
        itemImage.src = order.productImage1;
        itemImage.classList.add("w-16", "h-16", "rounded-lg", "mr-4", "object-cover", "border-2", "border-orange-500");

        // Item Info Div remains unchanged
        const itemInfoDiv = document.createElement("div");

        const itemTitle = document.createElement("h3");
        itemTitle.classList.add("text-lg", "font-bold", "text-white", "truncate", "text-base", "md:text-lg"); // Responsive text size
        itemTitle.innerText = order.productTitle;

        const itemAmount = document.createElement("p");
        itemAmount.classList.add("text-orange-400", "font-semibold", "text-lg", "text-base", "md:text-lg"); // Responsive text size
        itemAmount.innerText = `$ ${order.totalAmount}`;

        const quantityDiv = document.createElement("div");
        quantityDiv.classList.add("flex", "items-center", "mt-2");

        const quantityLabel = document.createElement("label");
        quantityLabel.classList.add("mr-2", "text-sm", "text-gray-300");
        quantityLabel.innerText = "Quantity:";

        const quantityValue = document.createElement("span");
        quantityValue.innerText = order.quantity || "1";
        quantityValue.classList.add("w-16", "p-1", "border", "border-orange-500", "rounded", "text-center", "bg-gray-800", "text-white");

        quantityDiv.appendChild(quantityLabel);
        quantityDiv.appendChild(quantityValue);

        itemInfoDiv.appendChild(itemTitle);
        itemInfoDiv.appendChild(itemAmount);
        itemInfoDiv.appendChild(quantityDiv);

        itemDetailsDiv.appendChild(itemImage);
        itemDetailsDiv.appendChild(itemInfoDiv);

        const cancelButton = document.createElement("button");
        cancelButton.classList.add("bg-orange-500", "text-white", "px-4", "py-2", "rounded-lg", "hover:bg-orange-600", "focus:outline-none", "focus:ring-2", "focus:ring-orange-300", "transition-colors", "duration-300", "ml-4");

        const icon = document.createElement("i");
        icon.classList.add("fa-solid", "fa-trash", "mr-2");

        cancelButton.appendChild(icon);
        cancelButton.appendChild(document.createTextNode("Cancel"));

        // Append elements
        orderDiv.appendChild(itemDetailsDiv);
        orderDiv.appendChild(cancelButton);
        cancelButton.addEventListener("click", () => {
          cancelOrder(doc.id);
        });

        ordersContainer.appendChild(orderDiv);

      }
    });
  }).catch((error) => {
    showError("Error loading orders:", error);
  });
}

function cancelOrder(orderId) {
  const orderRef = doc(db, "orders", orderId);
  deleteDoc(orderRef).then(() => {
    showSuccess("Order canceled successfully!");
    location.reload();
  }).catch((error) => {
    showError("Error canceling order:", error);
  });
}
