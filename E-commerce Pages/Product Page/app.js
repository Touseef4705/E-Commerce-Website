import { auth , 
    onAuthStateChanged ,
    signOut ,
    doc ,
    getDoc ,
    getDocs ,
    deleteDoc ,
    db , 
    addDoc ,
    collection ,
    ref ,
    uploadBytes ,
    getDownloadURL,
    storage ,
    query ,
    where 
} from "../../Utils/utils.js";


// Mobile Nav Element 
const side_navbar = document.getElementById("navbar-cta");
const side_menu_open = document.getElementById("side_menu_open");
const side_menu_close = document.getElementById("side_menu_close");


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


const user_logout = document.getElementById("user_logout");
const user_login = document.getElementById("user_login");
const nav_disable = document.querySelectorAll("nav_disable");
const userDp = document.getElementById("userDp");
const productSaveBtn = document.getElementById("productSaveBtn");
const product_card_container = document.getElementById("product_card_container");
const total_product_no = document.getElementById("total_product_no");


const productCardArr = [];


onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        // console.log(uid)
        getUserInfo(uid)
        user_logout.style.display = "inline-block"
        user_login.style.display = "none"
        // console.log("Current User" ,auth.currentUser.email)
        nav_disable.disable = false
        getAllProducts(uid)
        // ...
    } else {
        user_logout.style.display = "none"
        user_login.style.display = "inline-block"
        alert("User is signed out")
        window.location.href = "/"
        //  window.location.href = "/User Login And Signup/Login/index.html";
        // User is signed out
        // ...
    }
})
  
// const productImag = document.getElementById("productImag")
// console.log(productImag.file)
const product_add_container = document.getElementById("product_add_container");

product_add_container.addEventListener("submit", (e) => {
    e.preventDefault();
    productSaveBtn.disabled = true;
    productSaveBtn.innerText = "Saving...";

    const productInfo = {
        productImage1: e.target[0].files[0],
        productImage2: e.target[1].files[0],
        productImage3: e.target[2].files[0],
        productTitle: e.target[3].value,
        productDesc: e.target[4].value,
        productAmount: e.target[5].value,
        createdBy: auth.currentUser.email,
        createdByUid: auth.currentUser.uid
    };

    const uploadImages = async () => {
        const imageRefs = [
            ref(storage, `Product Images/${productInfo.productImage1.name}`),
            ref(storage, `Product Images/${productInfo.productImage2.name}`),
            ref(storage, `Product Images/${productInfo.productImage3.name}`)
        ];

        const uploadTasks = [
            uploadBytes(imageRefs[0], productInfo.productImage1),
            uploadBytes(imageRefs[1], productInfo.productImage2),
            uploadBytes(imageRefs[2], productInfo.productImage3)
        ];

        try {
            await Promise.all(uploadTasks);
            const downloadURLs = await Promise.all(imageRefs.map(getDownloadURL));
            
            const productData = {
                ...productInfo,
                productImage1: downloadURLs[0],
                productImage2: downloadURLs[1],
                productImage3: downloadURLs[2]
            };

            const productDbRef = collection(db, "Products");
            await addDoc(productDbRef, productData);

            console.log("Document added successfully");
            uploadProductDone();
            window.location.href = "/";
        } catch (err) {
            productSaveBtn.disabled = false;
            productSaveBtn.innerText = "Save";
            console.error("Error uploading images or adding document: ", err);
        }
    };

    uploadImages();
});


async function getAllProducts(uid){
    console.log(uid)
    const q = query(collection(db , "Products"), where("createdByUid", "==", uid));
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot)

    querySnapshot.forEach((data) => {
      console.log( "Product Data" , data);
      const product = data.data();
      const {
            productTitle , 
            productDesc ,
            productImage1 , 
            productAmount ,
            createdBy 
        } =product
      const productCards = `
      <div class="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <img class="h-48 object-cover" style="width:100%" src="${productImage1}" alt="Product Image">
            <div class="p-4">
                <h2 class="text-2xl font-semibold mb-2 text-capitalize">${productTitle}</h2>
                <p class="text-gray-700 mb-4">${productDesc}</p>
                <p class="text-lg font-bold text-gray-900 mb-2">PKR : ${productAmount}</p>
                <p class="text-gray-600 mb-4">Uploaded by: <br> ${createdBy}</p>
                <div class="flex flex-wrap gap-5 justify-center">
                   <button class="px-6 py-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300">Edit</button>
                   <button class="px-6 py-2 bg-red-600 text-white py-2 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300" onclick="dltProduct(this)">Delete</button>
                </div>
            </div>
        </div>`
        product_card_container.innerHTML += productCards
        productCardArr.push(productCards)
    });
    total_product_no.innerText = productCardArr.length
}

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
  
function uploadProductDone(){
    alert("Your Product Uploaded")
}

function getUserInfo(uid){
    const docRef = doc(db , "users" , uid);
    getDoc(docRef).then((data)=>{
    //   console.log(data.data())
      userDp.src = data.data().user_dp_input;
      // const firstName = data.data().user_first_name;
      // const lastName = data.data().user_last_name;
      // userName.innerText = firstName + " " + lastName
    })
}

async function dltProduct(element) {
    // console.log(element)
    try {
        // Find the product card element
        const productCard = element.closest('.max-w-sm');
        
        // // Extract the product title (assuming the product title is unique, otherwise use a unique identifier like product ID)
        const productTitle = productCard.querySelector('h2').innerText;

        // Create a query to find the product document based on the title
        const q = query(collection(db, "Products"), where("productTitle", "==", productTitle));
        const querySnapshot = await getDocs(q);

        // Delete the document(s) found
        querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
            console.log(`Product titled "${productTitle}" has been deleted.`);

            // Remove the product card from the DOM
            productCard.remove();
            total_product_no.innerText = productCardArr.length
        });
    } catch (e) {
        console.log(e);
    }
}

window.dltProduct = dltProduct;


window.dltProduct = dltProduct;


// Modal
const productModal = document.getElementById('productModal');

window.openModalBtn = openModalBtn
function openModalBtn(){
    productModal.classList.remove('hidden');
}

window.closeModalBtn = closeModalBtn
function closeModalBtn(){
    productModal.classList.add('hidden');
}
