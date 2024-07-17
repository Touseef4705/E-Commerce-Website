import { auth , 
  onAuthStateChanged ,
  signOut ,
  doc ,
  getDoc ,
  db ,
  getDocs ,
  collection
} from "./Utils/utils.js";


const user_logout = document.getElementById("user_logout");
const user_login = document.getElementById("user_login");
const nav_disable = document.querySelectorAll("nav_disable");
const userDp = document.getElementById("userDp");
const product_card_container = document.getElementById("product_card_container");
const myProducts = document.getElementById("myProducts");

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
      getUserInfo(uid)
      user_logout.style.display = "inline-block"
      user_login.style.display = "none"
      nav_disable.disable = false
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

getAllProducts()

async function getAllProducts(){
  const querySnapshot = await getDocs(collection(db, "Products"));
  querySnapshot.forEach((data) => {
    // console.log( "Product Data" ,data.data());
    const product = data.data();
    const {
      productTitle , 
      productDesc, 
      productImage1, 
      productAmount ,
      createdBy} = product
      const productCards = `
      <div id="${data.id}" onclick="productDetails(this)" class="max-w-sm bg-white rounded-lg shadow-md overflow-hidden" data-id="${data.id}">
          <img class="h-48 object-cover" style="width:100%;" src="${productImage1}" alt="Product Image">
          <div class="p-4">
              <h2 class="text-2xl font-semibold mb-2 text-capitalize">${productTitle}</h2>
              <p class="text-gray-700 mb-4">${productDesc}</p>
              <p class="text-lg font-bold text-gray-900 mb-2">PKR : ${productAmount}</p>
              <div class="flex justify-between">
                  <p class="text-gray-600 mb-4">Uploaded by: <br> ${createdBy}</p>
                  <p class="text-gray-600 mb-4">199+ sold</p>
              </div>
          </div>
      </div>`;
      product_card_container.innerHTML += productCards;      
  });

}

window.productDetails = productDetails

function productDetails(event) {
  const productId = event.getAttribute('data-id');
  console.log('Product ID:', productId); // Debugging log
  if (productId) {
      window.location.href = `/E-commerce Pages/Product Details/index.html?productId=${productId}`;
  } else {
      console.error("Product ID is missing.");
  }
}




function getUserInfo(uid){
  const docRef = doc(db , "users" , uid);
  getDoc(docRef).then((data)=>{
    // console.log(data.data())
    userDp.src = data.data().user_dp_input;
  })
}

// Carousel
// document.getElementById('product-details').innerHTML = productDetails;
