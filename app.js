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
      // ...
    } else {
      user_logout.style.display = "none"
      myProducts.style.display = "none"
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
      productDesc
       , productImage
       , 
       productAmout ,
       creadtedBy} =product
    const productCards = `
    <div class="max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
    <img class="h-48 object-cover" style=width:300px src="${productImage}" alt="Product Image">
    <div class="p-4">
        <h2 class="text-2xl font-semibold mb-2 text-capitalize">${productTitle}</h2>
        <p class="text-gray-700 mb-4">${productDesc}</p>
        <p class="text-lg font-bold text-gray-900 mb-2">PKR : ${productAmout}</p>
        <p class="text-gray-600 mb-4">Uploaded by: <br> ${creadtedBy}</p>
        <button class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300">Order Now</button>
    </div>
</div>`
            product_card_container.innerHTML += productCards
  });

}

function getUserInfo(uid){
  const docRef = doc(db , "users" , uid);
  getDoc(docRef).then((data)=>{
    // console.log(data.data())
    userDp.src = data.data().user_dp_input;
    // const firstName = data.data().user_first_name;
    // const lastName = data.data().user_last_name;
    // userName.innerText = firstName + " " + lastName
  })
}