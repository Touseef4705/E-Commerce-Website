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

function loadOrders(uid) {
  const ordersRef = collection(db, "orders");
  getDocs(ordersRef).then((querySnapshot) => {
    const ordersContainer = document.getElementById("orders");
    querySnapshot.forEach((doc) => {
      const order = doc.data();
      if (order.buyerId === uid) {
        const orderDiv = document.createElement("div");
        orderDiv.classList.add("order-item", "p-4", "bg-gray-100", "rounded-lg", "flex", "items-center", "justify-between");

        const itemDetailsDiv = document.createElement("div");
        itemDetailsDiv.classList.add("flex", "items-center");

        const itemImage = document.createElement("img");
        itemImage.src = order.productImage1;
        itemImage.classList.add("w-16", "h-16", "rounded-lg", "mr-4");

        const itemInfoDiv = document.createElement("div");

        const itemTitle = document.createElement("h3");
        itemTitle.classList.add("text-lg", "font-bold");
        itemTitle.innerText = order.productTitle;

        const itemAmount = document.createElement("p");
        itemAmount.classList.add("text-gray-600");
        itemAmount.innerText = `PKR: ${order.productAmount}`;

        const quantityDiv = document.createElement("div");
        quantityDiv.classList.add("flex", "items-center", "mt-2");

        const quantityLabel = document.createElement("label");
        quantityLabel.classList.add("mr-2");
        quantityLabel.innerText = "Quantity:";

        const quantityValue = document.createElement("span");
        quantityValue.innerText = order.quantity || "1";
        quantityValue.classList.add("w-16", "p-1", "border", "rounded");

        quantityDiv.appendChild(quantityLabel);
        quantityDiv.appendChild(quantityValue);

        itemInfoDiv.appendChild(itemTitle);
        itemInfoDiv.appendChild(itemAmount);
        itemInfoDiv.appendChild(quantityDiv);

        itemDetailsDiv.appendChild(itemImage);
        itemDetailsDiv.appendChild(itemInfoDiv);

        const cancelButton = document.createElement("button");
        cancelButton.classList.add("bg-red-500", "text-white", "px-4", "py-2", "rounded-lg", "hover:bg-red-700");
        cancelButton.innerText = "Cancel Order";
        cancelButton.addEventListener("click", () => {
          cancelOrder(doc.id);
        });

        orderDiv.appendChild(itemDetailsDiv);
        orderDiv.appendChild(cancelButton);

        ordersContainer.appendChild(orderDiv);
      }
    });
  }).catch((error) => {
    alert("Error loading orders:", error);
  });
}

function cancelOrder(orderId) {
  const orderRef = doc(db, "orders", orderId);
  deleteDoc(orderRef).then(() => {
    alert("Order canceled successfully!");
    location.reload();
  }).catch((error) => {
    alert("Error canceling order:", error);
  });
}
