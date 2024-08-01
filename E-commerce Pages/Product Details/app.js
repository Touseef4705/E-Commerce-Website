import {
  auth,
  onAuthStateChanged,
  signOut,
  doc,
  getDoc,
  setDoc,
  db
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

document.addEventListener('DOMContentLoaded', () => {
  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  function fetchProductDetails(productId) {
    const docRef = doc(db, "Products", productId);
    getDoc(docRef).then((data) => {
      const product = data.data();
      document.getElementById('productTitle').innerText = product.productTitle;
      document.getElementById('productAmount').innerText = `$ ${product.productAmount}`;
      document.getElementById('productDesc').innerText = product.productDesc;
      document.getElementById('productImage1').src = product.productImage1;
      document.getElementById('productImage2').src = product.productImage2;
      document.getElementById('productImage3').src = product.productImage3;

      // Attach event listener to the "Add to Cart" button
      addToCartButton.addEventListener("click", () => {
        addToCart(productId, product);
      });
    }).catch((error) => {
      alert("Error fetching product details:", error);
    });
  }

  const productId = getQueryParam('productId');

  if (productId) {
    fetchProductDetails(productId);
  } else {
    alert("No product ID found in the URL.");
  }

  let slideIndex = 0;
  const slides = document.querySelectorAll('.carousel-images img');

  document.getElementById('next').addEventListener('click', () => {
    changeSlide(1);
  });

  document.getElementById('prev').addEventListener('click', () => {
    changeSlide(-1);
  });

  function changeSlide(n) {
    slides[slideIndex].classList.add('hidden');
    slideIndex = (slideIndex + n + slides.length) % slides.length;
    slides[slideIndex].classList.remove('hidden');
  }

  function setupImageModal() {
    const carousel = document.getElementById('carousel');
    const images = carousel.querySelectorAll('img');

    const modal = document.createElement('div');
    modal.classList.add('modal');

    const modalContent = document.createElement('img');
    modalContent.classList.add('modal_content');
    modal.appendChild(modalContent);

    document.body.appendChild(modal);

    images.forEach(image => {
      image.addEventListener('click', () => {
        modalContent.src = image.src;
        modal.style.display = 'block';
        modalContent.style.display = 'block';
      });
    });

    modal.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  setupImageModal();
});

function addToCart(productId, product) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      const cartData = {
        productId: productId,
        buyerId: uid,
        productTitle: product.productTitle,
        productAmount: product.productAmount,
        productDesc: product.productDesc,
        productImage1: product.productImage1,
        timestamp: new Date()
      };
      const cartRef = doc(db, "cart", `${productId}_${uid}`);
      setDoc(cartRef, cartData).then(() => {
        alert("Product added to cart successfully!");
        // Optionally redirect the user to the cart page
        // window.location.href = "/cart.html";
      }).catch((error) => {
        alert("Error adding product to cart:", error);
      });
    } else {
      alert("You need to log in to add products to the cart.");
    }
  });
}
