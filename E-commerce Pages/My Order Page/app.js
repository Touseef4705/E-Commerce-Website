import { auth, onAuthStateChanged, signOut, collection, query, where, getDocs, db ,  doc ,
    getDoc}
 from "../../Utils/utils.js";

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
       fetchUserOrders(uid)
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

function getUserInfo(uid){
    const docRef = doc(db , "users" , uid);
    getDoc(docRef).then((data)=>{
      // console.log(data.data())
      userDp.src = data.data().user_dp_input;
    })
  }

function fetchUserOrders(uid) {
    const ordersRef = collection(db, "orders");
    const q = query(ordersRef, where("buyerId", "==", uid));
    
    getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const order = doc.data();
            console.log("doc" , doc.data())
            displayOrder(order);
        });
    }).catch((error) => {
        console.log("Error getting orders: ", error);
    });
}

function displayOrder(order) {
    const orderElement = document.createElement('div');
    orderElement.classList.add('p-5', 'bg-gray-100', 'rounded-lg', 'shadow-md');
    orderElement.innerHTML = `
        <h2 class="text-2xl font-semibold mb-2">${order.productTitle}</h2>
        <p class="text-xl text-green-600 font-semibold mb-2">PKR: ${order.productAmount}</p>
        <p class="text-gray-700 mb-4">${order.productDesc}</p>
        <img src="${order.productImage1}" alt="Product Image" class="w-full h-64 object-cover rounded-lg mb-4">
        <p class="text-gray-500">Order Date: ${order.timestamp.toDate().toLocaleDateString()}</p>
         <p class="text-gray-500">Buyer Id: ${order.buyerId}</p>
    `; console.log(order)
    ordersList.appendChild(orderElement);
}
