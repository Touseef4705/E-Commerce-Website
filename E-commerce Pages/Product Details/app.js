import { auth , 
    onAuthStateChanged ,
    signOut ,
    doc ,
    getDoc ,
    db ,
} from "../../Utils/utils.js";


const user_logout = document.getElementById("user_logout");
const user_login = document.getElementById("user_login");
const nav_disable = document.querySelectorAll("nav_disable");
const userDp = document.getElementById("userDp");

// Mobile Nav Element 
const side_navbar = document.getElementById("side_navbar");
const side_menu_open = document.getElementById("side_menu_open");
const side_menu_close = document.getElementById("side_menu_close");

const profilePage = document.getElementById("profilePage");
const disableProfilePage = document.getElementById("disableProfilePage");

window.sideBarOpen = sideBarOpen
window.sideBarClose = sideBarClose

function sideBarOpen(){
  side_menu_open.style.display = "none"
  side_navbar.style.display = "block"
  side_menu_close.style.display = "block"
}
function sideBarClose(){
  side_menu_close.style.display = "none"
  side_navbar.style.display = "none"
  side_menu_open.style.display = "block"
}


onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
      // console.log(uid)
      user_logout.style.display = "inline-block"
      user_login.style.display = "none"
      nav_disable.disable = false
      getUserInfo(uid)
      myProducts.style.display = "inline-block"
      profilePage.style.display = "flex"
      disableProfilePage.style.display = "none"
      // ...
    } else {
      user_logout.style.display = "none"
      myProducts.style.display = "none"
      profilePage.style.display = "none"
      disableProfilePage.style.display = "inline-block"
      user_login.style.display = "inline-block"
      console.log("User is signed out")
      //  window.location.href = "/User Login And Signup/Login/index.html";
      // User is signed out
      // ...
    }
})

user_login.addEventListener("click" , ()=>{
  window.location.href = "/User Login And Signup/Login/index.html"
})
user_logout.addEventListener("click" , () => {
  signOut(auth).then(() => {
    console.log("Sign-out successful.")
    // Sign-out successful.
  }).catch((error) => {
    console.log(error)
    // An error happened.
  });
})
  
function getUserInfo(uid){
    const docRef = doc(db , "users" , uid);
    getDoc(docRef).then((data)=>{
      // console.log(data.data())
      userDp.src = data.data().user_dp_input;
    })
}




document.addEventListener('DOMContentLoaded', () => {
    // Function to get URL parameter by name
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Get the product ID from URL
    const productId = getQueryParam('productId');

    if (productId) {
        // Fetch the product details using the product ID
        const docRef = doc(db, "Products", productId);
        getDoc(docRef).then((data) => {
            const product = data.data();
            document.getElementById('productTitle').innerText = product.productTitle;
            document.getElementById('productAmount').innerText = `PKR: ${product.productAmount}`;
            document.getElementById('productDesc').innerText = product.productDesc;
            document.getElementById('productImage1').src = product.productImage1;
            document.getElementById('productImage2').src = product.productImage2;
            document.getElementById('productImage3').src = product.productImage3;
        }).catch((error) => {
            console.error("Error fetching product details:", error);
        });
    } else {
        console.error("No product ID found in the URL.");
    }

    // Carousel functionality
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
});